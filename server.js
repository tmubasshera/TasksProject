const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const tasksRouter = require('./routes/tasks');


const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', __dirname + '/public');

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://adminssems:BOpeGCzCBMHqpsmq@ssemscluster.b1gxjjc.mongodb.net/TasksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up the route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(express.json());

// Routes
app.use(tasksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
