const express = require('express');
const cors = require('cors')

const authRoute = require('./routes/authRoute.js');
const testRoute = require('./routes/testRoute.js');
const userRoute = require('./routes/userRoute.js');
const postRoute = require('./routes/postRoute.js')
const cookieParser = require('cookie-parser');

const app = express();
const port = 3500;


app.use(cors({
    origin: 'http://localhost:5173/',
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
