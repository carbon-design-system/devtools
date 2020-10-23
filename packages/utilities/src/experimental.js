import React, { useState, useEffect } from "react";
import { getStorage, storageItemChanged } from './index';

experimentalStatusChanged(setExperimentalStatus);
getExperimentalStatus(setExperimentalStatus);

function experimentalFlag (inverse, callback) {
    let experimental = window.generalExperimental;

    if (typeof inverse === 'function') {
        callback = inverse;
    } else if (inverse === true) {
        experimental = !window.generalExperimental;
    }

    return experimental ? callback() : null;
}

function setExperimentalStatus (newStatus) {
    window.generalExperimental = newStatus;
}

function getExperimentalStatus (callback) {
    getStorage(['generalExperimental'], ({ generalExperimental }) => {
        callback(generalExperimental);
    });
}

function experimentalStatusChanged (callback) {
    storageItemChanged('generalExperimental', generalExperimental => {
        callback(generalExperimental);
    });
}

export { experimentalFlag, setExperimentalStatus, getExperimentalStatus, experimentalStatusChanged };