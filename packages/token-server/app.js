const express = require('express');
// const elements = require('./public/packages/elements');

const app = express();
const port = process.env.PORT || '3000';

// console.log(process.env.bxdev);
app.use(express.static('public'));

// app.get('/api/elements', function (req, res) {
//     // console.log(process.env.bxdev)
//   res.send(elements);
// });

// app.get('/api/selectors', function (req, res) {
//   res.json(elements.selectors);
// });
//
// app.get('/api/components', function (req, res) {
//   res.json(elements.components);
// });
//
// app.get('/api/tokens', function (req, res) {
//   res.json(elements.tokens);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
