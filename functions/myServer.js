const server = require("../server/index");

// Define your serverless function
exports.handler = async (event, context) => {
  // Run your server when the function is invoked
  const response = await server(event, context);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
