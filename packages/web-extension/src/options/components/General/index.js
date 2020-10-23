import React from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, ToggleSmall } from 'carbon-components-react';
import { configuration } from '../';
import { themes } from '@carbon/themes';

const { prefix } = settings;
const themeList = Object.keys(themes);

function General ({ generalTheme = 'g90', generalExperimental, generalNonCarbon }) {
    return (
        <>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        labelText="Non-carbon pages"
                        className={`${prefix}--options__non-carbon`}
                        id="nonCarbon"
                        toggled={generalNonCarbon}
                        onChange={e => configuration('general-ignore-validation', { generalNonCarbon: e.target.checked })}
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        labelText="Experimental features"
                        className={`${prefix}--options__experimental`}
                        id="experimental"
                        toggled={generalExperimental}
                        onChange={e => configuration('general-experimental', { generalExperimental: e.target.checked })}
                    />
                </div>
            </div>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col-sm-2`}>
                    <Select
                        size="sm"
                        onChange={e => configuration('general-theme', { generalTheme: e.target.value })}
                        labelText="Choose a theme"
                        className={`${prefix}--options__select`}>
                        {themeList.map(theme => 
                            <SelectItem
                                value={theme}
                                text={theme}
                                selected={theme === generalTheme ? true : false}
                            />
                        )}
                    </Select>
                </div>
            </div>
        </>
    );
}

export { General };