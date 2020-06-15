const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect(
  "mongodb://localhost/express-react-urql", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(() => {
  console.log('Connection to database established...')
  app.listen(PORT, _ => console.log(`Server started at ${PORT}`));
}).catch(err => {
  console.log(err);
});