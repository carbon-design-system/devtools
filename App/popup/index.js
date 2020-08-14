import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Tag } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { getMessage, sendMessage, getStorage, experimentalFlag, gaPageview, gaDomEvent } from '../utilities';
import { Loading, Empty, Main, MoreOptions } from './components';

import './index.scss';

const { prefix } = settings;

gaPageview('/popup', document.title);

function Popup () {
    const [onCarbon, setCarbon] = useState('loading'); // 'loading', true, false
    const [initialMsg, setInitialMsg] = useState();

    let startPerfCheck,
        Content = Loading;

    getMessage(msg => {
        const msgKeys = Object.keys(msg);

        if (msgKeys.indexOf('runningCarbon') > -1) {
            setCarbon(msg.runningCarbon);
            setInitialMsg(msg);
            perfCheck(startPerfCheck, msg);
        }
    });

    useEffect(() => {
        startPerfCheck = performance.now();

        sendMessage({ popup: true }); // TODO: how can we send only per tab once?
        
        getStorage(['generalTheme'], ({ generalTheme }) => {
            document.body.setAttribute('class', `${prefix}--popup--${generalTheme}`);
        });
    }, []);
    
    if (onCarbon === true) {
        Content = Main;
    } else if (onCarbon === false) {
        Content = Empty;
    }
    
    return (
        <article className={`${prefix}--popup ${prefix}--grid ${experimentalFlag(() => `${prefix}--popup--experimental`)}`}>
            <header className={`${prefix}--row ${prefix}--popup__header`}>
                <div className={`${prefix}--col-sm-2`}>
                    <h1 className={`${prefix}--popup__heading`}>Carbon Devtools</h1>
                    {experimentalFlag(() => <Tag type="magenta" className={`${prefix}--popup__experimental-tag`}>Experimental</Tag>)}
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <MoreOptions />
                </div>
            </header>
            <main>
                <Content initialMsg={initialMsg} />
            </main>
        </article>
    );
}

function perfCheck (startTime, msg) {
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

        console.log('validate', status, Math.round(time));
        gaDomEvent('validate', status, Math.round(time));
        
        if (time > timeToCheck) {
            gaExcpetion(`Slow validation: ${time}ms`, 0);
        }
    }
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));