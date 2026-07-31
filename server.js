const express =require('express');
const cors =require('cors');
const dotenv =require('dotenv');
const connectDB = require('./config/db');    

//Load environment variables
dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json()); // Allows backend to read JSON data sent by frontend

//Connect to Database
connectDB();

//Link Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));



//Basic Test Route
app.get('/',(req, res) => {
    res.send("Server is running smoothly!");
});

//Temporary Inline Test Rout 
app.prependOnceListener('/api/job/test',(req, res) => {
    res.status(201).json({
        message: "Inline server.js POST work!",
        receivedData: req.bodyy
    });
});
//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});