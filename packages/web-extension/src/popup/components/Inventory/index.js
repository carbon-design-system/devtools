import React, { useEffect, useState } from 'react';
import { settings } from 'carbon-components';
import {
  sendTabMessage,
  getMessage,
  gaNavigationEvent,
  gaDomEvent,
  gaExcpetion,
} from '@carbon/devtools-utilities';
import {
  Accordion,
  AccordionItem,
  AccordionSkeleton,
  ClickableTile,
  Link,
} from 'carbon-components-react';
import { bugs } from '../../../../package.json';

const { prefix } = settings;

function Inventory() {
  const [inventoryData, setInventoryData] = useState({});
  let startPerfCheck = performance.now(); // check performance;

  getMessage((msg) => {
    const msgKeys = Object.keys(msg);
    if (msgKeys.indexOf('inventoryData') > -1) {
      setInventoryData(msg.inventoryData);
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

  return Object.keys(inventoryData).length
    ? inventoryList(inventoryData)
    : loadingInventory();
}

function inventoryList({ all, uniqueCount, totalCount }) {
  const allKeys = Object.keys(all).sort();

  return (
    <>
      <div className={`${prefix}--row`}>
        {uniqueCount === 0 ? null : (
          <div
            className={`${prefix}--col-sm-2 ${prefix}--inventory__info`}></div>
        )}
        <div className={`${prefix}--col-sm-1 ${prefix}--inventory__info`}>
          <h3 className={`${prefix}--inventory__info-title`}>Total</h3>
          <p className={`${prefix}--inventory__info-value`}>{totalCount}</p>
        </div>
        <div className={`${prefix}--col-sm-1 ${prefix}--inventory__info`}>
          <h3 className={`${prefix}--inventory__info-title`}>{`Groups`}</h3>
          <p className={`${prefix}--inventory__info-value`}>{uniqueCount}</p>
        </div>
      </div>
      {uniqueCount > 0 ? (
        <Accordion align="start" className={`${prefix}--inventory`}>
          {allKeys.map((key, i) => (
            <AccordionItem
              onHeadingClick={(val) =>
                gaNavigationEvent('toggle', 'inventory-item', val.isOpen)
              }
              data-identifier={all[key].map(({ uniqueID }) => uniqueID)}
              title={
                <>
                  {key}
                  <span className={`${prefix}--inventory__item-count`}>
                    {all[key].length} found
                  </span>
                </>
              }
              className={`${prefix}--inventory__item`}
              key={key + i}>
              {all[key].map(({ uniqueID, innerText, tag, id, classes }) => (
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
                  }}>
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
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        emptyInventory()
      )}
    </>
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
          key={classname + i}>
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

function emptyInventory() {
  return (
    <p>
      We could not find any components that matched our records. If you believe
      this to be in error please{' '}
      <Link
        href={bugs.url}
        target="_blank"
        onClick={() => gaNavigationEvent('click', 'submit-an-issue')}>
        submit an issue
      </Link>
      .
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
    gaExcpetion(`Slow inventory audit: ${time}ms`, 0);
  }
}

export { Inventory };
