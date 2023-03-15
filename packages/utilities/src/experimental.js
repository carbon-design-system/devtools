import { getStorage, storageItemChanged } from '../';
import { isManifestV3 } from './isManifestV3';

experimentalStatusChanged(setExperimentalStatus);
getExperimentalStatus(setExperimentalStatus);

function experimentalFlag(inverse, callback) {
  let experimental = isManifestV3()
    ? self.generalExperimental
    : window.generalExperimental;

  if (typeof inverse === 'function') {
    callback = inverse;
  } else if (inverse === true) {
    experimental = isManifestV3()
      ? !self.generalExperimental
      : !window.generalExperimental;
  }

  return experimental ? callback() : null;
}

function setExperimentalStatus(newStatus) {
  if (isManifestV3()) {
    self.generalExperimental = newStatus;
  } else {
    window.generalExperimental = newStatus;
  }
}

function getExperimentalStatus(callback) {
  getStorage(['generalExperimental'], ({ generalExperimental }) => {
    callback(generalExperimental);
  });
}

function experimentalStatusChanged(callback) {
  storageItemChanged('generalExperimental', (generalExperimental) => {
    callback(generalExperimental);
  });
}

export {
  experimentalFlag,
  setExperimentalStatus,
  getExperimentalStatus,
  experimentalStatusChanged,
};
