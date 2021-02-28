const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const empDetails = [
    { "empId": 101, "empName": "Claire", "age": 30, "salary": 50000, "achievements": "No major achievements so far" },
    { "empId": 102, "empName": "Benny", "age": 39, "salary": 60000, "achievements": "Got 3 bravos" },
    { "empId": 103, "empName": "Daphne", "age": 27, "salary": 40000, "achievements": "Got five bravos" },
    { "empId": 104, "empName": "Matt", "age": 31, "salary": 30000, "achievements": "Got all the bravos" },
    { "empId": 105, "empName": "Peter", "age": 21, "salary": 20000, "achievements": "He creates the bravos" }

]

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/retreiveEmployeelist', (req, res, next) => {
    res.send(empDetails)
})

app.post('/InsertEmployee', (req, res, next) => {
    const data = req.body;
    data.empId = 101 + empDetails.length
    empDetails.push(data)
    res.json({ "message": data.empName + ' is inserted succesfully with employee id: ' + data.empId })
})


app.put('/updateEmployeeDetails/:empId', (req, res, next) => {
    for (let i = 0; i <= empDetails.length; i++) {
        if (empDetails[i]['empId'].toString() === req.params.empId) {
            empDetails[i]["empName"] = req.body.empName;
            empDetails[i]["age"] = req.body.age;
            empDetails[i]["salary"] = req.body.salary;
            empDetails[i]["achievements"] = req.body.achievements;
            res.json({ "message": "Employee details succesfully added for the employee Id Succesfully " + req.params.empId })
            break;

        }
    }
}
)
console.log("Server Started at port 2000!");
app.listen(2000);