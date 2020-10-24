import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { settings } from 'carbon-components';
import { Accordion, AccordionItem } from 'carbon-components-react';
import { Footer, General, Grid, Shortcuts, Reset } from './components';
import {
  storageChanged,
  getStorage,
  gaPageview,
  gaNavigationEvent,
} from '@carbon/devtools-utilities';

import './index.scss';

const { prefix } = settings;

gaPageview('/options', document.title);

function Options() {
  const [data, setData] = useState({});

  const refreshData = () => {
    getStorage(null, (d) => {
      delete d.clientId;
      d.settingKeys = Object.keys(d);
      setData(d);
    });
  };

  useEffect(() => {
    refreshData(); // onload

    storageChanged(() => {
      refreshData(); // if data changes
    });
  }, []);

  return (
    <article className={`${prefix}--options ${prefix}--grid`}>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col`}>
          <h1 className={`${prefix}--options__title`}>Settings</h1>
          <Accordion>
            <AccordionItem
              title="General"
              onHeadingClick={() =>
                gaNavigationEvent('toggle', 'general-settings')
              }
              open={false}>
              <General {...data} />
            </AccordionItem>
            <AccordionItem
              title="Grid"
              onHeadingClick={() =>
                gaNavigationEvent('toggle', 'grid-settings')
              }
              open={false}>
              <Grid {...data} />
            </AccordionItem>
            <AccordionItem
              title="Shortcuts"
              onHeadingClick={() =>
                gaNavigationEvent('toggle', 'shortcut-settings')
              }
              open={false}>
              <Shortcuts {...data} />
            </AccordionItem>
            <AccordionItem
              title="Reset"
              onHeadingClick={() =>
                gaNavigationEvent('toggle', 'reset-settings')
              }
              open={false}>
              <Reset {...data} />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </article>
  );
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Options />, document.getElementById('app'));
