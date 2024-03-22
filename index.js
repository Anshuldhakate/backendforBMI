const express= require("express");
const bodyParser = require('body-parser');

const app= express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("welcome to BMI Calculator")
})


app.post('/calculateBMI', (req, res) => {
    const { height, weight } = req.body;
    
    // Input validation
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'Invalid input. Height and weight must be numeric values.' });
    }
    
    // Calculate BMI
    const heightInMeters = height / 100; // Convert height to meters
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine interpretation
    let result;
    if (bmi < 18.5) {
        result = 'Underweight';
    } 
    
    else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Normal weight';
    } 
    
    else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Overweight';
    } 
    
    else {
        result = 'Obese';
    }

    res.json({ bmi, result });
});





app.listen(8080, ()=>{
    console.log("server is running on port 8080")
})