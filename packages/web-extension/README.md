# Carbon Devtools — Web extension

The [Carbon Devtools](http://ibm.biz/carbon-devtools) web extension is a plugin
tool for browsers that provides designers, developers, QA teams and anyone
collaborating to build and validate Carbon pages with a simple set of tools.

- [Features](#features)
- [Install on Chrome](#chrome-web-store)
- [Install on Firefox](#firefox-browser-add-ons)
- [Local development](#local-development)
- [Contributing](#-contributing)
- [License](#-license)

## Features

##### Resize browser

Identify what Carbon breakpoint you're browser is actively using, and quickly
resize your browser to see how your page responds at various supported
breakpoints.

##### Component list

Quickly get an inventory of all the Carbon supported components being used on a
given page. Search for a specific component, and click on it to find where it's
located on the page.

##### Specs

Switch between a number of speccing options like color, spacing, and typography
to identify what Carbon tokens are being used for a given component or element
on the page.

##### Grid overlay

Use the grid overlay feature to lay the 2x and mini unit grid on top of your
page to quickly check the alignment of your page's layout.

## Install on Chrome

1. Go to [Carbon Devtools](http://ibm.biz/carbon-devtools-chrome) on the Chrome
   Web Store.
2. Click the "Add to Chrome" button.
3. Once installed you can click to open it next to the Chrome Omnibox.

> This extension works for all chromium based browsers, and thus can be applied
> to Microsoft Edge, Brave, and Opera as well.

## Install on Firefox

1. Go to [Carbon Devtools](http://ibm.biz/carbon-devtools-firefox) on the
   Firefox browser add-ons.
2. Click the "+ Add to Firefox" button.
3. Once installed you can click to open it from your toolbar.

## Local development

#### Build extension

1. `fork`, `clone` and `yarn install` dependencies
2. `yarn build` or `yarn watch` to build extension

#### Install locally to browser

`/extension`

- Google
  [getting started](https://developer.chrome.com/extensions/getstarted#manifest)
- Firefox
  [your first web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out)

#### Continue local development

Once you have your local version of the extension built and installed how do we
continue working as we update the extension?

1. `yarn watch` or `yarn build` works in most cases and automatically updates
   the extension.
2. Every once in a while you might need to refresh the extension using the
   refresh button.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
