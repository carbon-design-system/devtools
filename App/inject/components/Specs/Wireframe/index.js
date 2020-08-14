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