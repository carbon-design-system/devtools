import React, { useEffect, useState } from "react";
import { settings } from 'carbon-components';
import { sendTabMessage, getMessage } from '../../../utilities';
import { Accordion, AccordionItem, AccordionSkeleton, ClickableTile, Link } from 'carbon-components-react';
import { bugs } from '../../../../package.json'

const { prefix } = settings;

function Inventory ({ disable, isOpen }) {
    const [inventoryData, setInventoryData] = useState({});

    getMessage(({ inventoryData }) => {
        if (inventoryData) {
            setInventoryData(inventoryData);
        }
    });

    useEffect(() => {
        // only request inventory if open,
        // and no data has been received
        if (isOpen && Object.keys(inventoryData).length === 0) {
            sendTabMessage(-1, { requestInventory: true });
        }
        
        document.querySelectorAll(`.${prefix}--accordion__heading`).forEach(comp => {
            comp.addEventListener('mouseenter', componentMouseOver);
            comp.addEventListener('mouseleave', componentMouseOut);
            comp.addEventListener('focus', componentMouseOver);
            comp.addEventListener('blur', componentMouseOut);
        });
    });

    return (Object.keys(inventoryData).length ? inventoryList(inventoryData) : loadingInventory());
}

function inventoryList ({ all, uniqueCount, totalCount }) {
    const allKeys = Object.keys(all).sort();

    return (
        <>
            <div className={`${prefix}--row`}>
                {uniqueCount === 0 ? null : (
                    <div className={`${prefix}--col-sm-2 ${prefix}--inventory__info`}></div>
                )}
                <div className={`${prefix}--col-sm-1 ${prefix}--inventory__info`}>
                    <h3 className={`${prefix}--inventory__info-title`}>
                        Total
                    </h3>
                    <p className={`${prefix}--inventory__info-value`}>
                        {totalCount}
                    </p>
                </div>
                <div className={`${prefix}--col-sm-1 ${prefix}--inventory__info`}>
                    <h3 className={`${prefix}--inventory__info-title`}>
                        {`Groups`}
                    </h3>
                    <p className={`${prefix}--inventory__info-value`}>
                        {uniqueCount}
                    </p>
                </div>
            </div>
            {uniqueCount > 0 ? (
                <Accordion
                    align="start"
                    className={`${prefix}--inventory`}>
                    {allKeys.map((key, i) => (
                        <AccordionItem
                            data-identifier={all[key].map(({ uniqueID }) => uniqueID)}
                            title={(
                                <>
                                    {key}
                                    <span className={`${prefix}--inventory__item-count`}>
                                        {all[key].length} found
                                    </span>
                                </>
                            )}
                            className={`${prefix}--inventory__item`}
                            key={key + i}>
                            {all[key].map(({ uniqueID, innerText, tag, id, classes}, i) => (
                                <ClickableTile
                                    href="#"
                                    className={`${prefix}--inventory__sub-item`}
                                    kind='secondary'
                                    size='small'
                                    key={uniqueID}
                                    data-identifier={uniqueID}
                                    handleClick={componentClick}
                                    onMouseEnter={componentMouseOver}
                                    onMouseLeave={componentMouseOut}
                                    onFocus={e => {
                                        componentClick(e);
                                        componentMouseOver(e);
                                    }}
                                    onBlur={e => {
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
                                    <p className={`${prefix}--inventory__sub-item__unique-id`}>{uniqueID}</p>
                                </ClickableTile>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : emptyInventory()}
        </>
    );
}

function buildName (tag, id, classes) {
    let name = [];
    
    if (tag) {
        name.push(
            <span className={`${prefix}--inventory__sub-item__name__tag`}>
                {tag}
            </span>
        );
    }
    
    if (id) {
        name.push(
            <span className={`${prefix}--inventory__sub-item__name__id`}>
                {id}
            </span>
        );
    }
    
    if (classes) {
        name.push(
            classes.map(classname => (
                <span className={`${prefix}--inventory__sub-item__name__class`}>
                    {classname}
                </span>
            ))
        );
    }

    return name;
}

function componentClick (e) {
    // only a single item
    e.preventDefault();
    const id = e.currentTarget.dataset.identifier.split(',');
    sendTabMessage(-1, { inventoryComponentClicked: id }); // single string
}

function componentMouseOver (e) {
    let ids = getIdsData(e.currentTarget);
    
    if (ids.length > 0) {            
        sendTabMessage(-1, { inventoryComponentMouseOver: ids });
    }
}

function componentMouseOut (e) {
    let ids = getIdsData(e.currentTarget);
    
    if (ids.length > 0) {            
        sendTabMessage(-1, { inventoryComponentMouseOut: ids });
    }
}

function getIdsData (target) {
    const dataset = target.dataset.identifier || target.parentNode.dataset.identifier;
    let idList = [];

    if (dataset) {
        idList = dataset.split(',');
    }

    return idList;
}


function emptyInventory () {
    return (
        <p>
            We couldn't find any components that matched our records. If you believe this to be in error please <Link href={bugs.url} target="_blank">submit an issue</Link>.
        </p>
    );
}

function loadingInventory () {
    return <AccordionSkeleton align="start" open={false} count={3} />;
}

export { Inventory };

//TODO: fix sourcemap issue
//TODO: fix webpack watch again