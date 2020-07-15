import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Toggle } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { getMessage, sendMessage, getStorage } from '../utilities';
import { Loading, Empty, Main, MoreOptions } from './components';

import './index.scss';

const { prefix } = settings;

function Popup () {
    const [onCarbon, setCarbon] = useState('loading'); // 'loading', true, false

    let Content = Loading;

    useEffect(() => {
        sendMessage({ popup: true }); // TODO: how can we send only per tab once?

        getMessage(msg => {
            setCarbon(msg.runningCarbon);
        });
        
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
        <article className={`${prefix}--popup ${prefix}--grid`}>
            <header className={`${prefix}--row ${prefix}--popup__header`}>
                <div className={`${prefix}--col-sm-2`}>
                    <h1 className={`${prefix}--popup__heading`}>IBM.com Devtools</h1>
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <MoreOptions />
                </div>
            </header>
            <main>
                <Content />
            </main>
        </article>
    );
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));