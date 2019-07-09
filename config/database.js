if (process.env.NODE_ENV == "production") {
  module.exports = {
    mongoURI: "mongodb+srv://sugandh:sugandh@cluster0-gv692.mongodb.net/test?retryWrites=true&w=majority"
  }
}
else {
  module.exports = {
    mongoURI: "mongodb://localhost/inventory-dev"
  }
}