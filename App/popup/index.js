import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Tag } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { getMessage, sendMessage, getStorage, experimentalFlag } from '../utilities';
import { Loading, Empty, Main, MoreOptions } from './components';

import './index.scss';

const { prefix } = settings;

function Popup () {
    const [onCarbon, setCarbon] = useState('loading'); // 'loading', true, false

    let Content = Loading;

    useEffect(() => {
        sendMessage({ popup: true }); // TODO: how can we send only per tab once?

        getMessage(msg => {
            console.log(msg.runningCarbon);
            if (msg.runningCarbon) {
                setCarbon(msg.runningCarbon);
            }
        });
        
        getStorage(['generalTheme'], ({ generalTheme }) => {
            document.body.setAttribute('class', `${prefix}--popup--${generalTheme}`);
        });
    }, []);
    
    if (onCarbon === true) {
        Content = Main;
    } else {
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
                <Content />
            </main>
        </article>
    );
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));