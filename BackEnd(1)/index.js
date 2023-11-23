const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");



//reading env file
require('dotenv').config(); 
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// // cors
const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionSuccessStatus: 200
}
 app.use(cors(corsOptions));
//IF BACKEND AND FRONTEND ARE ON DIFFERENT SERVERS/PORTS THEN  CORS IS USED. ITS USED TO MAKE SERVER AWARE OF WEBSITES WHICH ARE ALLOWED TO INTERACT/ACCESS IT

// routes
const blogRoute = require('./routes/blogRoute');
const authRoute = require('./routes/authRoute');

// middleware
const authMiddleWare = (req, res, next) => {
    // Check the JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    const actualToken = token.split(' ')[1];
    console.log("Token received by auth middleware:- "+token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access:-Token Issue' });
    }
    const decode = jwt.decode(actualToken, secretKey);
    console.log(decode);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized access:- Wrong Token' });
    }
    req.user = decode;
   // console.log(req);
    next();
};

const errorMiddleware = (err, req, res, next) => {
	res.status(err.status).json({ error: true, message: err.message });
};

app.use('/blogs', authMiddleWare, blogRoute);
app.use('/user', authRoute);
app.use(errorMiddleware);


// connection to local database
mongoose.connect('mongodb://127.0.0.1/blog_system').then(()=> {
    app.listen(PORT, () => {
        console.log(`Express server is running in port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error while connecting to DB`, err);
});
