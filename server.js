const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const session = require("express-session");
const app = express();
require("dotenv").config();
const port = process.env.PORT ;


require("./config/db");
const router = require("./routers/userRouter");
// const talkrouter=require("./routers/talkRouter");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(router);


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
