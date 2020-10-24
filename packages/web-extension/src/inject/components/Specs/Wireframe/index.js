// @import url("https://gitcdn.xyz/repo/octoshrimpy/blokkfont/master/blokkfont.css");
//
// *:not(.bx-dev--container) {
//     font-family: "BLOKK" !important;
//     // color: #323232 !important;
//     // border-color: #e0e0e0 !important;
//     box-shadow: 0 0 0 1px rgba(red, .2);
//
//     main &, footer & {
//         line-height: 1 !important;
//         // background: none !important;
//     }
// }
//
// (() => {
//  const imgs = document.querySelectorAll('img');
//  let width, height, parent;
//
//  imgs.forEach(img => {
//   parent = img.parentNode;
//   width = img.width;
//   height = img.height;
//
//   if (parent.nodeName === 'PICTURE') {
//     if (parent.children.length > 0) {
//       parent.children.forEach(item => {
//         if (item.nodeName === 'SOURCE') {
//          item.srcset = `https://dummyimage.com/${width}x${height}/8d8d8d/FFF?text=+`;
//         } else if (item.nodeName === 'IMG') {
//          item.src = `https://dummyimage.com/${width}x${height}/8d8d8d/FFF?text=+`;
//          item.srcset = ``;
//         }
//       });
//     }
//   } else {
//     img.src = `https://dummyimage.com/${width}x${height}/8d8d8d/FFF?text=+`;
//     img.srcset = ``;
//   }
//  });
// })();

// get data
// check for updates
// spec on?
// this item on?

import { settings } from 'carbon-components';

const { prefix } = settings;

const html = document.querySelector('html');
// const outlineClass = `${prefix}--specs--outline`;

function manageSpecsWireframe(specs, specType) {
  if (specs && specType === 'wireframe') {
    activateWireframe();
  } else {
    deactivateWireframe();
  }
}

function activateWireframe() {
  // html.classList.add(outlineClass);
  // .bx--grid, .bx--row, .bx--col, .bx--col-sm-#, .bx--col-md-# ...
  // add highlight
  // add tooltip
}

function deactivateWireframe() {
  // html.classList.remove(outlineClass);
}

export { manageSpecsWireframe };
