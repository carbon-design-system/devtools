import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { AccordionItem, StructuredListWrapper, StructuredListHead, StructuredListBody, StructuredListRow, StructuredListCell } from 'carbon-components-react';
import { MacShift32, Cursor_132 } from '@carbon/icons-react';
import { gaNavigationEvent } from '../../../utilities';

const { prefix } = settings;

function Shortcuts () {
    
    const shortcuts = [
        'Toggle everything',
        'Toggle 2x grid',
        'Toggle mini unit grid',
        'Toggle breakpoint label'
    ];

    return (
        <AccordionItem
            onClick={() => gaNavigationEvent('toggle', 'shortcut-settings')}
            title="Shortcuts"
            open={false}
            className={`${prefix}--options-shortcuts`}>
            <p>Shortcuts will work on a validated page if you have given the extension permission for that page by clicking on the icon.</p>
            
            <div className={`${prefix}--row`}>
                <StructuredListWrapper>
                    <StructuredListHead>
                        <StructuredListRow head>
                            <StructuredListCell head>
                                
                            </StructuredListCell>
                            <StructuredListCell head>
                                
                            </StructuredListCell>
                        </StructuredListRow>
                    </StructuredListHead>
                    <StructuredListBody>
                        {shortcuts.map((description, i) => {
                            return (
                                <StructuredListRow key={i}>
                                    <StructuredListCell>
                                        {description}
                                    </StructuredListCell>
                                    <StructuredListCell className={`${prefix}--options-shortcuts__keys`}>
                                        <span className={`${prefix}--options-shortcuts__key`}><MacShift32 aria-label="Shift" /></span>
                                        <span className={`${prefix}--options-shortcuts__key`}>Ctrl</span>
                                        <span className={`${prefix}--options-shortcuts__key`}>{i}</span>
                                    </StructuredListCell>
                                </StructuredListRow>
                            );
                        })}
                        <StructuredListRow>
                            <StructuredListCell>
                                Toggle columns on click
                            </StructuredListCell>
                            <StructuredListCell className={`${prefix}--options-shortcuts__keys`}>
                                <span className={`${prefix}--options-shortcuts__key`}><MacShift32 aria-label="Shift" /></span>
                                <span className={`${prefix}--options-shortcuts__key`}>`</span>
                                <span className={`${prefix}--options-shortcuts__key`}><Cursor_132 aria-label="Click" /></span>
                            </StructuredListCell>
                        </StructuredListRow>
                    </StructuredListBody>
                </StructuredListWrapper>
            </div>
        </AccordionItem>
    );
}

export { Shortcuts };