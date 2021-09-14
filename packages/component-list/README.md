# @carbon/devtools-component-list

Generates a list of components and their selectors across all of the Carbon
libraries.

## Contribute a component/library

Anyone can contribute a new component, or library. Just follow the steps below
and submit a pull request.

1. Add a unique prefix to the
   [`prefixSelectors.js`](https://github.com/carbon-design-system/devtools/blob/base/packages/web-extension/src/globals/prefixSelectors.js)
   file.

2. Create a file under
   [`src/library`](https://github.com/carbon-design-system/devtools/tree/base/packages/component-list/src/library)
   with the library name.

3. `import` your library's prefix, components, and stable attribute.

4. Loop through your components, or manually add them based on the following
   data structure, and then export the resulting data.

```javascript
{ 'unique-component-selector': 'component-display-name' }
```

> 💡 Thinking about maintenance, it's best to find a way to build this data from
> your component library. See how
> [cloud-cognitive](https://github.com/carbon-design-system/devtools/tree/base/packages/component-list/src/library/cloud-cognitive.js)
> set up their components to scale.

5. Add your new library file to the build file
   [`src/index.js`](https://github.com/carbon-design-system/devtools/tree/base/packages/component-list/src/library/index.js)
