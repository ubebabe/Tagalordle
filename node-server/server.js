//require() = built-in function to include external modules in 
// Node.js application using which we are importing
const express = require('express');
const cors = require('cors');


//creates express application
const app = express();

app.use(cors());

//parses incoming requests
app.use(express.json());

//get route
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });