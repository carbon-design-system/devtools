import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import MoreOptions from "./components/MoreOptions";

import * as settings from '@carbon/web-components/es/globals/settings.js';
import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import {
  sendMessage,
} from '@carbon/devtools-utilities/src/sendMessage';

const { prefix } = settings;

function Popup() {

  useEffect(() => {
    sendMessage({ popup: true });
    console.log('Popup opened!');

    getMessage((msg) => {
      console.log("Message caught in popup: ", msg);

      if (msg.carbonDevtoolsInjected) {
        console.log("Carbon devtools injected!");
      }

      if (msg.runningCarbon) {
        console.log("Page is running carbon!");
      } else if (
        Boolean(msg.runningCarbon) === false
      ) {
        console.log("Page is not running carbon.");
      }
    });
  }, []);



  return (
    <>
      <header>
        <h1>Carbon Devtools</h1>
        <MoreOptions/>
      </header>
      <main>
        <p>devtools go here.</p>
      </main>
    </>
  )
}

const appRoot = document.querySelector('#popup');

ReactDOM.createRoot(appRoot).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
