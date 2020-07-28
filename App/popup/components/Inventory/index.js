import React from "react";
import { settings } from 'carbon-components';
import { Accordion, AccordionItem, AccordionSkeleton } from 'carbon-components-react';

const { prefix } = settings;

function Inventory () {
    return loading();
}

function loading () {
    return <AccordionSkeleton align="start" open={false} count={3} />
}

export { Inventory };