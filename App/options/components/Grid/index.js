import React from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem } from 'carbon-components-react';

const { prefix } = settings;

function Grid () {
    return (
        <AccordionItem title="Grid settings" open={false}>
            <Select labelText="Choose a grid" defaultValue="Carbon 16 Columns" size="sm" className={`${prefix}--options__select`}>
                <SelectItem value="carbon-16" text="Carbon 16 Columns" />
                <SelectItem value="carbon-12" text="Carbon 12 Columns (legacy)" />
                {/* <SelectItem value="g90" text="Northstar Fluid (legacy)" />
                <SelectItem value="g100" text="Northstar Adaptive (legacy)" /> */}
            </Select>
        </AccordionItem>
    );
}

export { Grid };