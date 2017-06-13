const app = require('./serverConfig.js');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running the server on port ${port}`);
});