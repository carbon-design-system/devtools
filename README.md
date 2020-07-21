![image](https://media.github.ibm.com/user/19/files/a6852000-5f31-11ea-9520-4186ecc02341)

# Carbon Devtools

The [Carbon Devtools](http://ibm.biz/carbon-devtools) provides designers, developers, QA teams and anyone collaborating to build Carbon pages with a simple set of tools.

 * [General usage](#general-usage)
   - [Chrome web store](#chrome-web-store)
   - [Firefox browser add-ons](#firefox-browser-add-ons)
 * [Local development](#local-development)
 * [Contributing](#-contributing)
 * [License](#-license)

## General usage

#### Chrome web store

1. Go to [Carbon Devtools](http://ibm.biz/carbon-devtools-chrome) on the Chrome Web Store.
2. Click the "Add to Chrome" button.
3. Once installed you can click to open it next to the Chrome Omnibox.

#### Firefox browser add-ons

1. Go to [Carbon Devtools](http://ibm.biz/carbon-devtools-firefox) on the Firefox browser add-ons.
2. Click the "+ Add to Firefox" button.
3. Once installed you can click to open it from your toolbar.

## Local development

#### Build extension
1. `fork`, `clone` and `yarn install` dependencies
2. `yarn build` or `yarn watch` to build extension

#### Install locally built extension
1. Go to `Menu > More Tools > Extensions`. Or go to `chrome://extensions/`.
2. Turn "Developer mode" on.
3. Click "Load unpacked" button.
4. Navigate to, find, and select `devtools/chrome-extension`.
5. You should now be able to see a tile with your local build, and be able to see its extension next to the Chrome Omnibox indicating it was successfully installed.

> 👀 Check out Google's [getting started](https://developer.chrome.com/extensions/getstarted#manifest) guidelines

#### Continue local development

Once you have your local version of the extension built and installed how do we continue working as we update the extension?

1. `yarn watch` or `yarn build` works in most cases and automatically updates the extension.
2. Every once in a while you might need to refresh the extension using the refresh button.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
