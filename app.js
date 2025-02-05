const express = require('express');
const cors = require('cors')

const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3500;


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);



app.listen(port, () => {
    console.log("Server is Running on port", port);
});
