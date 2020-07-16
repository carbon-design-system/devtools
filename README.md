![image](https://media.github.ibm.com/user/19/files/a6852000-5f31-11ea-9520-4186ecc02341)

# Carbon Devtools

The [Carbon Devtools](http://ibm.biz/carbon-devtools) provides designers, developers, QA teams and anyone collaborating to build Carbon pages with a simple set of tools.

 * [General usage](#general-usage)
 * [Local development](#local-development)
 * [Contributing](#-contributing)
 * [License](#-license)

## General usage

#### Chrome web store

1. Go to [Carbon Devtools](http://ibm.biz/carbon-devtools) on the Chrome Web Store.
2. Click the "Add to Chrome" button.
![image](https://user-images.githubusercontent.com/3793636/76051228-bdc30e00-5f2f-11ea-845f-a4dae86f4c53.png)

3. Once installed you can click to open it next to the Chrome Omnibox.
![image](https://media.github.ibm.com/user/19/files/3eced500-5f31-11ea-89fc-e26b768b0efd)

## Local development

#### Build extension
1. `fork`, `clone` and `yarn install` dependencies
2. `yarn build` or `yarn watch` to build extension

#### Install locally built extension
1. Go to `Menu > More Tools > Extensions`. Or go to `chrome://extensions/`.
2. Turn "Developer mode" on.

    <img src="https://media.github.ibm.com/user/19/files/4e075000-5f3c-11ea-8c47-f5f120993570" width="300px" />

3. Click "Load unpacked" button.

    <img src="https://media.github.ibm.com/user/19/files/2dd79100-5f3c-11ea-9e06-a8d1eea75c8d" width="300px" />

4. Navigate to, find, and select `devtools/chrome-extension`.
5. You should now be able to see a tile with your local build, and be able to see its extension next to the Chrome Omnibox indicating it was successfully installed.

    <img src="https://media.github.ibm.com/user/19/files/e0a7ef00-5f3c-11ea-8512-54f6d95e9f5c" width="300px" />

> 👀 Check out Google's [getting started](https://developer.chrome.com/extensions/getstarted#manifest) guidelines

#### Continue local development

Once you have your local version of the extension built and installed how do we continue working as we update the extension?

1. `yarn watch` or `yarn build` works in most cases and automatically updates the extension.
2. Every once in a while you might need to refresh the extension using the refresh button.

    <img src="https://media.github.ibm.com/user/19/files/4779d800-5f3e-11ea-9050-47f62be26d50" width="150px" />


## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
