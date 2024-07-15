const express = require('express');
const cors = require('cors');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3500;

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log("Server is Running on port", port);
});
