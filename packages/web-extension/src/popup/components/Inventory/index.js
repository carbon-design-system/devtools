import React, { useEffect, useState } from 'react';
import { settings } from 'carbon-components';
import {
  sendTabMessage,
  getMessage,
  gaNavigationEvent,
  gaDomEvent,
  gaException,
} from '@carbon/devtools-utilities';
import {
  Accordion,
  AccordionItem,
  AccordionSkeleton,
  ClickableTile,
  Link,
  Search,
} from 'carbon-components-react';
import { moderate02 } from '@carbon/motion';
import packageJSON from '../../../../package.json';

const { prefix } = settings;

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventorySource, setInventorySource] = useState(undefined);
  const [filteredInventory, setFilteredInventory] = useState({});
  const [uniqueCount, setUniqueCount] = useState(0);
  const [filteredUnique, setFilteredUnique] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);

  let startPerfCheck = performance.now(); // check performance;
  let diffInTotal = totalCount - filteredTotal;
  let diffInUnique = uniqueCount - filteredUnique;
  let diffMetaClass = `${prefix}--inventory__meta-item--active`;

  getMessage((msg) => {
    const msgKeys = Object.keys(msg);
    if (msgKeys.indexOf('inventoryData') > -1) {
      msg.inventoryData.original = JSON.parse(
        JSON.stringify(msg.inventoryData.all)
      );
      setInventorySource(msg.inventoryData.all);
      setFilteredInventory(msg.inventoryData.all);
      setUniqueCount(msg.inventoryData.uniqueCount);
      setFilteredUnique(msg.inventoryData.uniqueCount);
      setTotalCount(msg.inventoryData.totalCount);
      setFilteredTotal(msg.inventoryData.totalCount);
      perfCheck(startPerfCheck);
    }
  });

  useEffect(() => {
    // send data on open so it's ready
    sendTabMessage(-1, { requestInventory: true });
  }, []);

  useEffect(() => {
    document
      .querySelectorAll(`.${prefix}--accordion__heading`)
      .forEach((comp) => {
        comp.addEventListener('mouseenter', componentMouseOver);
        comp.addEventListener('mouseleave', componentMouseOut);
        comp.addEventListener('focus', componentMouseOver);
        comp.addEventListener('blur', componentMouseOut);
      });
  });

  let waitForTypingToStop;

  function searchComponentList(val = '', e) {
    clearTimeout(waitForTypingToStop);

    waitForTypingToStop = setTimeout(() => {
      const searchValue = val.trim().toLowerCase();
      const compKeys = Object.keys(inventorySource);
      const searchIn = [
        'name',
        'classes',
        'id',
        'tag',
        'uniqueID',
        'innerText',
        'autoid',
        'href',
        'src',
      ];
      let filteredTotalCount = 0;
      let filteredList = {};
      let compKey;

      if (searchValue) {
        for (let i = 0; i < compKeys.length; i++) {
          compKey = compKeys[i];

          filteredList[compKey] = inventorySource[compKey].filter((data) => {
            let findings = false;

            for (let i = 0; i < searchIn.length; i++) {
              let itemValue = data[searchIn[i]];

              if (itemValue) {
                if (
                  typeof itemValue === 'string' &&
                  itemValue.toLowerCase().indexOf(searchValue) > -1
                ) {
                  findings = true;
                } else if (Array.isArray(itemValue)) {
                  for (let i = 0; i < itemValue.length; i++) {
                    if (itemValue[i].toLowerCase().indexOf(searchValue) > -1) {
                      findings = true;
                    }
                  }
                }
              }
            }

            if (findings) {
              filteredTotalCount++;
            }

            return findings;
          });

          if (!filteredList[compKey].length) {
            delete filteredList[compKey]; // if no results delete object
          }
        }
      } else {
        // if no value display all results
        filteredList = inventorySource;
        filteredTotalCount = totalCount;
      }

      setFilteredInventory(filteredList);
      setFilteredUnique(Object.keys(filteredList).length);
      setFilteredTotal(filteredTotalCount);
      setSearchTerm(val.trim());

      gaNavigationEvent('search', e.type, diffInUnique && 1);
    }, moderate02);
  }

  return !inventorySource ? (
    loadingInventory()
  ) : (
    <>
      <div
        className={`${prefix}--row ${prefix}--inventory__meta ${
          uniqueCount === 0 && prefix + `--inventory__meta--none`
        }`}
      >
        <div
          className={`${prefix}--col-sm-1 ${prefix}--inventory__meta-item ${
            diffInTotal && diffMetaClass
          }`}
        >
          <h3 className={`${prefix}--inventory__meta__title`}>Total</h3>
          <p className={`${prefix}--inventory__meta__value`}>
            {filteredTotal}
            <sub> / {totalCount}</sub>
          </p>
        </div>
        <div
          className={`${prefix}--col-sm-1 ${prefix}--inventory__meta-item ${
            diffInUnique && diffMetaClass
          }`}
        >
          <h3 className={`${prefix}--inventory__meta__title`}>{`Unique`}</h3>
          <p className={`${prefix}--inventory__meta__value`}>
            {filteredUnique}
            <sub> / {uniqueCount}</sub>
          </p>
        </div>
      </div>
      {uniqueCount > 0 ? (
        <Search
          onChange={(e) => searchComponentList(e.target.value, e)}
          className={`${prefix}--inventory__search`}
          placeholder="Search components"
          size="sm"
        />
      ) : null}
      {filteredUnique
        ? inventoryList(filteredInventory, uniqueCount)
        : emptyInventory(searchTerm)}
    </>
  );
}

function inventoryList(filteredInventory, uniqueCount) {
  const allKeys = Object.keys(filteredInventory).sort();

  return uniqueCount > 0 ? (
    <Accordion align="start" className={`${prefix}--inventory`}>
      {allKeys.map((key, i) => (
        <AccordionItem
          onHeadingClick={(val) =>
            gaNavigationEvent('toggle', 'inventory-item', val.isOpen)
          }
          data-identifier={filteredInventory[key].map(
            ({ uniqueID }) => uniqueID
          )}
          title={
            <>
              {key}
              <span className={`${prefix}--inventory__item-count`}>
                {filteredInventory[key].length} found
              </span>
            </>
          }
          className={`${prefix}--inventory__item`}
          key={key + i}
        >
          {filteredInventory[key].map(
            ({ uniqueID, innerText, tag, id, classes }) => (
              <ClickableTile
                href="#"
                className={`${prefix}--inventory__sub-item`}
                kind="secondary"
                size="small"
                key={uniqueID}
                data-identifier={uniqueID}
                handleClick={componentClick}
                onMouseEnter={componentMouseOver}
                onMouseLeave={componentMouseOut}
                onFocus={(e) => {
                  componentClick(e);
                  componentMouseOver(e);
                }}
                onBlur={(e) => {
                  componentMouseOut(e);
                }}
              >
                {!innerText ? null : (
                  <p className={`${prefix}--inventory__sub-item__text`}>
                    <span>{innerText}</span>
                  </p>
                )}
                <p className={`${prefix}--inventory__sub-item__name`}>
                  {buildName(tag, id, classes)}
                </p>
                <p className={`${prefix}--inventory__sub-item__unique-id`}>
                  {uniqueID}
                </p>
              </ClickableTile>
            )
          )}
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    emptyInventory()
  );
}

function buildName(tag, id, classes) {
  let name = [];

  if (tag) {
    name.push(
      <span className={`${prefix}--inventory__sub-item__name__tag`}>{tag}</span>
    );
  }

  if (id) {
    name.push(
      <span className={`${prefix}--inventory__sub-item__name__id`}>{id}</span>
    );
  }

  if (classes) {
    name.push(
      classes.map((classname, i) => (
        <span
          className={`${prefix}--inventory__sub-item__name__class`}
          key={classname + i}
        >
          {classname}
        </span>
      ))
    );
  }

  return name;
}

function componentClick(e) {
  // only a single item
  e.preventDefault();
  const id = e.currentTarget.dataset.identifier.split(',');
  sendTabMessage(-1, { inventoryComponentClicked: id }); // single string
  gaNavigationEvent('click', 'inventory-sub-item');
}

function componentMouseOver(e) {
  let ids = getIdsData(e.currentTarget);

  if (ids.length > 0) {
    sendTabMessage(-1, { inventoryComponentMouseOver: ids });
  }
}

function componentMouseOut(e) {
  let ids = getIdsData(e.currentTarget);

  if (ids.length > 0) {
    sendTabMessage(-1, { inventoryComponentMouseOut: ids });
  }
}

function getIdsData(target) {
  const dataset =
    target.dataset.identifier || target.parentNode.dataset.identifier;
  let idList = [];

  if (dataset) {
    idList = dataset.split(',');
  }

  return idList;
}

function emptyInventory(search) {
  const searchEmpty = `Hmmm, we couldn't find any components related to "${search}".`;
  const inventoryEmpty = (
    <>
      {`We could not find any components that matched our records. If you believe
          this to be in error please `}
      <Link
        href={packageJSON.bugs.url}
        target="_blank"
        onClick={() => gaNavigationEvent('click', 'submit-an-issue')}
      >
        submit an issue
      </Link>
      .
    </>
  );

  return (
    <p className={`${prefix}--inventory__empty`}>
      {search ? searchEmpty : inventoryEmpty}
    </p>
  );
}

function loadingInventory() {
  return <AccordionSkeleton align="start" open={false} count={3} />;
}

function perfCheck(startTime) {
  const time = performance.now() - startTime;
  const timeToCheck = 1000;

  gaDomEvent('inventory', 'audit', Math.round(time));

  if (time > timeToCheck) {
    gaException(`Slow inventory audit: ${time}ms`, 0);
  }
}

export { Inventory };
