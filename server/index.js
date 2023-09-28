const express = require("express");
const Gun = require("gun");
const app = express();
const port = process.env.PORT || 3030;

app.use(Gun.serve);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

Gun({ web: server });

module.exports = async (event, context) => {
  // Your server logic goes here
  // You can access event and context objects if needed

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Server is running." }),
  };
};
