# Carbon Dependencies Version Updates Summary

## Overview
This document summarizes all the Carbon dependency updates made across the project's package.json files. The goal was to update all packages to their latest minor versions while maintaining major version compatibility.

## Updates by Package

### packages/component-list/package.json

| Package | Original Version | Updated Version |
|---------|-----------------|-----------------|
| @carbon/ibm-products | ^1.2.4 | ^1.29.0 |
| @carbon/ibm-security | ^1.31.0 | ^1.38.0 |
| @carbon/ibmdotcom-react | ^1.27.0 | ^1.42.0 |
| @carbon/ibmdotcom-web-components | ^1.12.0 | ^1.21.0 |
| carbon-components | ^10.41.0 | ^10.59.2 |
| carbon-components-react | ^7.45.0 | ^7.49.0 |
| carbon-web-components | ^1.16.2 | ^1.21.0 |
| eslint-config-carbon | ^3.14.0 | ^3.18.0 |
| stylelint-config-carbon | ^1.17.0 | ^1.20.0 |

### packages/utilities/package.json

| Package | Original Version | Updated Version |
|---------|-----------------|-----------------|
| @carbon/layout | ^10.29.0 | ^10.37.5 |
| eslint-config-carbon | ^3.14.0 | ^3.18.0 |

### packages/web-extension/package.json

| Package | Original Version | Updated Version |
|---------|-----------------|-----------------|
| @carbon/colors | ^10.30.0 | ^10.37.5 |
| @carbon/grid | ^10.33.0 | ^10.43.5 |
| @carbon/ibm-products | ^1.2.4 | ^1.29.0 |
| @carbon/ibm-security | ^1.31.0 | ^1.38.0 |
| @carbon/ibmdotcom-react | ^1.27.0 | ^1.42.0 |
| @carbon/ibmdotcom-utilities | ^1.27.0 | ^1.42.0 |
| @carbon/icons | ^10.37.0 | ^10.48.6 |
| @carbon/layout | ^10.29.0 | ^10.37.5 |
| @carbon/motion | ^10.22.0 | ^10.29.5 |
| @carbon/themes | ^10.40.0 | ^10.55.6 |
| @carbon/type | ^10.33.0 | ^10.42.0 |
| carbon-components | ^10.41.0 | ^10.59.2 |
| carbon-components-react | ^7.41.0 | ^7.49.0 |
| @carbon/icons-react | ^10.49.5 | ^10.49.6 |
| eslint-config-carbon | ^3.14.0 | ^3.18.0 |
| stylelint-config-carbon | ^1.17.0 | ^1.20.0 |

## Notes
- We encountered some version compatibility issues during the update process and had to adjust our initial target versions to use the actual latest available minor versions.
- Some packages like carbon-components are deprecated but were updated to their latest minor versions as requested.
- The updates maintain major version compatibility to minimize the risk of breaking changes.