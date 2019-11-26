const app = require(".");
const port = process.env.PORT || 3000;

// start app
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
