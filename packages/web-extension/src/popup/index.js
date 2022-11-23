import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import settings from 'carbon-components/es/globals/js/settings';
import Tag from 'carbon-components-react/es/components/Tag';
import Button from 'carbon-components-react/es/components/Button';
import ChevronLeft from '@carbon/icons/svg/32/chevron--left.svg';
import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import {
  sendMessage,
  sendTabMessage,
} from '@carbon/devtools-utilities/src/sendMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { experimentalFlag } from '@carbon/devtools-utilities/src/experimental';
import { formInventoryData } from '@carbon/devtools-utilities/src/formInventoryData';
import {
  gaPageview,
  gaDomEvent,
  gaNavigationEvent,
  gaException,
  setIBMer,
} from '@carbon/devtools-utilities/src/ga';
import { defaults } from '../globals/defaults';
import { Loading, Empty, Main, MoreOptions } from './components';

import './index.scss';

const { prefix } = settings;

let carbonStatus = defaults.popup.carbonStatus;

gaPageview('/popup', document.title);

function Popup() {
  const [onCarbon, setOnCarbon] = useState(carbonStatus); // eslint-disable-line no-unused-vars
  const [initialMsg, setInitialMsg] = useState();
  const [panelState, setPanelState] = useState(defaults.popup.panelState);
  const [inventoryData, setInventoryData] = useState(undefined);

  useEffect(() => {
    getMessage((msg) => {
      setInventoryData(formInventoryData(msg.inventoryData));
    });
  });

  let Content = Loading,
    panelControls = {
      open: (name, children) => {
        setPanelState({
          name: name,
          open: true,
          children: children,
        });
        gaNavigationEvent('panel', name, 1);
      },
      close: (name) => {
        setPanelState({
          name: name,
          open: false,
          children: panelState.children,
        });
        gaNavigationEvent('panel', name, 0);
      },
    };

  useEffect(() => {
    let startPerfCheck = performance.now();

    sendMessage({ popup: true });

    getStorage(['generalTheme'], ({ generalTheme }) => {
      document.body.setAttribute(
        'class',
        `${prefix}--popup--${generalTheme || defaults.generalSettings.theme}`
      );
    });

    getMessage((msg) => {
      if (msg.carbonDevtoolsInjected) {
        // request inventory once injection is complete
        sendTabMessage(-1, { requestInventory: true });
      }

      if (
        msg.digitalData &&
        msg.digitalData.user &&
        msg.digitalData.user.segment
      ) {
        setIBMer(msg.digitalData.user.segment.isIBMer);
      } else {
        setIBMer(3); // unknown, but probably not
      }

      if (msg.runningCarbon) {
        carbonStatus = true;
        setOnCarbon(true);
        setInitialMsg(msg);
      } else if (
        carbonStatus !== true &&
        Boolean(msg.runningCarbon) === false
      ) {
        // undefined || false
        carbonStatus = false;
        setOnCarbon(false);
      }

      perfCheck(startPerfCheck, msg);
    });
  }, []);

  if (carbonStatus === true) {
    Content = Main;
  } else if (carbonStatus === false) {
    Content = Empty;
  }

  return (
    <article
      className={`${prefix}--popup ${experimentalFlag(
        () => `${prefix}--popup--experimental`
      )}`}>
      <header className={`${prefix}--popup__header`}>
        <div className={`${prefix}--col-sm-3`}>
          <h1 className={`${prefix}--popup__heading`}>
            Carbon Devtools
            {experimentalFlag(() => (
              <Tag
                type="magenta"
                className={`${prefix}--popup__experimental-tag`}>
                Exp
              </Tag>
            ))}
          </h1>
        </div>
        <div className={`${prefix}--col-sm-1`}>
          <MoreOptions />
        </div>
      </header>
      <section
        className={`${prefix}--popup__panel-container ${activePanel(
          panelState
        )}`}>
        <main className={`${prefix}--grid ${prefix}--popup__panel`}>
          <Content
            initialMsg={initialMsg}
            _inventoryData={inventoryData}
            _panelControls={panelControls}
          />
        </main>
        <aside className={`${prefix}--popup__panel`}>
          <Button
            className={`${prefix}--popup__panel-close`}
            kind="ghost"
            onClick={() => panelControls.close(panelState.name)}>
            <ChevronLeft height="16" />
            Back
          </Button>
          <div className={`${prefix}--grid`}>
            <div className={`${prefix}--row`}>
              <h1
                className={`${prefix}--popup__panel-title ${prefix}--col-sm-3`}>
                {panelState.name}
              </h1>
            </div>
            <div className={`${prefix}--popup__panel-content`}>
              {panelState.children}
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
}

function activePanel(stateName) {
  if (stateName.open) {
    return `${prefix}--popup__panel--shift`;
  }

  return '';
}

function perfCheck(startTime, msg) {
  const time = performance.now() - startTime;
  const timeToCheck = 1000;
  let status = 'non-carbon';

  if (!msg.carbonDevtoolsInjected) {
    if (msg.ignoreValidation) {
      status = 'ignored';
    } else {
      if (msg.runningCarbon) {
        status = 'carbon';
      }
    }

    gaDomEvent('validate', status, Math.round(time));

    if (time > timeToCheck) {
      gaException(`Slow validation: ${time}ms`, 0);
    }
  }
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));
