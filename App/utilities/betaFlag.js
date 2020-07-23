import React, { useState, useEffect } from "react";
import { getStorage } from './index';

getStorage(['generalBeta'], ({ generalBeta }) => {
    if (generalBeta) {
        window.generalBeta = generalBeta;
    }
});

function betaFlag (inverse, callback) {
    let beta = !window.generalBeta;

    if (typeof inverse === 'function') {
        callback = inverse;
    }
    
    if (inverse === true) {
        beta = window.generalBeta;
    }
    
    return beta ? null : callback();
}

export { betaFlag };