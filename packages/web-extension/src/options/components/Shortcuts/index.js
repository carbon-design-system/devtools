import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from 'carbon-components-react/es/components/StructuredList';
import MacShift from '@carbon/icons/svg/32/mac--shift.svg';
import Cursor_1 from '@carbon/icons/svg/32/cursor--1.svg';

const { prefix } = settings;

function Shortcuts() {
  const shortcuts = [
    'Toggle everything',
    'Toggle 2x grid',
    'Toggle mini unit grid',
    'Toggle breakpoint label',
  ];

  return (
    <div className={`${prefix}--options-shortcuts`}>
      <p className={`${prefix}--col-sm-3`}>
        Shortcuts will work on a validated page if you have given the extension
        permission for that page by clicking on the icon.
      </p>
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head />
            <StructuredListCell head />
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {shortcuts.map((description, i) => {
            return (
              <StructuredListRow key={i}>
                <StructuredListCell>{description}</StructuredListCell>
                <StructuredListCell
                  className={`${prefix}--options-shortcuts__keys`}
                >
                  <span className={`${prefix}--options-shortcuts__key`}>
                    <MacShift width="32" aria-label="Shift" />
                  </span>
                  <span className={`${prefix}--options-shortcuts__key`}>
                    Ctrl
                  </span>
                  <span className={`${prefix}--options-shortcuts__key`}>
                    {i}
                  </span>
                </StructuredListCell>
              </StructuredListRow>
            );
          })}
          <StructuredListRow>
            <StructuredListCell>Toggle columns on click</StructuredListCell>
            <StructuredListCell
              className={`${prefix}--options-shortcuts__keys`}
            >
              <span className={`${prefix}--options-shortcuts__key`}>
                <MacShift width="32" aria-label="Shift" />
              </span>
              <span className={`${prefix}--options-shortcuts__key`}>`</span>
              <span className={`${prefix}--options-shortcuts__key`}>
                <Cursor_1 width="32" aria-label="Click" />
              </span>
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
}

export { Shortcuts };
