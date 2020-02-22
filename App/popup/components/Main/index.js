import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Toggle, ToggleSmall } from 'carbon-components-react';
import { sendMessage, setStorage, getStorage } from '../../../utilities';

const { prefix } = settings;

function Main () {
    const [onLoadState, setOnLoadState] = useState(false);
    const [onDataState, setOnDataState] = useState(false);
    const [toggleGridsState, setToggleGridsState] = useState(true);

    const [toggle2xColumnsState, setToggle2xColumnsState] = useState(false);
    const [toggle2xGuttersState, setToggle2xGuttersState] = useState(false);
    const [toggle2xBordersState, setToggle2xBordersState] = useState(false);
    const [toggle2xFullWidthState, setToggle2xFullWidthState] = useState(false);
    const [toggle2xBreakpointLabelState, setToggle2xBreakpointLabelState] = useState(false);
    const [toggle2xHoverState, setToggle2xHoverState] = useState(false);

    const [toggleMiniUnitBordersState, setToggleMiniUnitBordersState] = useState(false);
    const [toggleMiniUnitFixedState, setToggleMiniUnitFixedState] = useState(false);

    const ds = {
        toggleGridsState: toggleGridsState,

        toggle2xColumnsState: toggle2xColumnsState,
        toggle2xGuttersState: toggle2xGuttersState,
        toggle2xBordersState: toggle2xBordersState,
        toggle2xFullWidthState: toggle2xFullWidthState,
        toggle2xBreakpointLabelState: toggle2xBreakpointLabelState,
        toggle2xHoverState: toggle2xHoverState,

        toggleMiniUnitBordersState: toggleMiniUnitBordersState,
        toggleMiniUnitFixedState: toggleMiniUnitFixedState
    };
    
    useEffect(() => {
        onLoad(true);
    }, []);
    
    useEffect(() => {
        setStorage(ds);
    });
    
    return !onDataState ? null : (
        <div className={`${prefix}--popup-main`}>
            <div className={`${prefix}--row ${prefix}--popup-main__section`}>
                <div className={`${prefix}--col`}>
                    <Toggle
                        toggled={toggleGridsState}
                        labelText="All grids"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggleGridsState}
                        id="toggleGrids"
                    />
                </div>
            </div>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col`}>
                    <h2 className={`${prefix}--popup-main__section-title`}>Overlay grid options</h2>
                </div>
            </div>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xColumnsState}
                        labelText="Columns"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xColumnsState}
                        id="toggle2xColumns"
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xGuttersState}
                        labelText="Gutters"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xGuttersState}
                        id="toggle2xGutters"
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xBordersState}
                        labelText="Borders"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xBordersState}
                        id="toggle2xBorders"
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xFullWidthState}
                        labelText="Full width"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xFullWidthState}
                        id="toggle2xFullWidth"
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xBreakpointLabelState}
                        labelText="Breakpoint label"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xBreakpointLabelState}
                        id="toggle2xBreakpointLabel"
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggle2xHoverState}
                        labelText="Hover"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggle2xHoverState}
                        id="toggle2xHover"
                    />
                </div>
            </div>
            
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col`}>
                    <h2 className={`${prefix}--popup-main__section-title`}>Mini unit grid options</h2>
                </div>
            </div>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggleMiniUnitBordersState}
                        labelText="Borders"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggleMiniUnitBordersState}
                        id="toggleMiniUnitBorders"
                    />
                </div>
                <div className={`${prefix}--col`}>
                    <ToggleSmall
                        disabled={!toggleGridsState}
                        toggled={toggleMiniUnitFixedState}
                        labelText="Fixed"
                        labelA="Off"
                        labelB="On"
                        onToggle={setToggleMiniUnitFixedState}
                        id="toggleMiniUnitFixed"
                    />
                </div>
            </div>
        </div>
    );

    function onLoad (e) {
        if (!onLoadState) {
            setDefaults();
            setOnLoadState(e);
            sendMessage({onLoad: e});
        }
    }

    function setDefaults() {
        getStorage(null, data => {
            let defaultsSet = false;

            if (data) {
                if (data.toggle2xColumnsState) {
                    setToggle2xColumnsState(data.toggle2xColumnsState);
                    defaultsSet = true;
                }

                if (data.toggle2xGuttersState) {
                    setToggle2xGuttersState(data.toggle2xGuttersState);
                    defaultsSet = true;
                }

                if (data.toggle2xBordersState) {
                    setToggle2xBordersState(data.toggle2xBordersState);
                    defaultsSet = true;
                }

                if (data.toggle2xFullWidthState) {
                    setToggle2xFullWidthState(data.toggle2xFullWidthState);
                    defaultsSet = true;
                }

                if (data.toggle2xBreakpointLabelState) {
                    setToggle2xBreakpointLabelState(data.toggle2xBreakpointLabelState);
                    defaultsSet = true;
                }

                if (data.toggleMiniUnitBordersState) {
                    setToggleMiniUnitBordersState(data.toggleMiniUnitBordersState);
                    defaultsSet = true;
                }

                if (data.toggleMiniUnitFixedState) {
                    setToggleMiniUnitFixedState(data.toggleMiniUnitFixedState);
                    defaultsSet = true;
                }

                if (data.toggle2xHoverState) {
                    setToggle2xHoverState(data.toggle2xHoverState);
                    defaultsSet = true;
                }
            }
            
            if (!defaultsSet) {
                setToggle2xColumnsState(true);
                setToggle2xBreakpointLabelState(true);
            }
            setOnDataState(true);
        });
    }
}

export { Main };