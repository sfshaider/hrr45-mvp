const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 1234

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb://localhost/mvp',
    { useNewUrlParser: true },
  );
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log(`Connected to MongoDB on ${db.host}:${db.port}`));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
