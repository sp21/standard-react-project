import React, { Component } from 'react';
import axios from 'axios';
class EditEmployee extends Component {

    state = {
        form: {
            empId: '',
            empName: '',
            age: '',
            salary: '',
            achievements: ''
        },
        formError: {
            empNameError: '',
            ageError: '',
            salaryError: ''
        },
        fieldValidity: {
            empNameValidity: false,
            ageValidity: false,
            salaryValidity: false
        },
        formValid: false,
        successMessage: ''
    }
    validateField(field, value) {
        var form = this.state.form;
        var fieldValidity = this.state.fieldValidity;
        var formError = this.state.formError;
        form[field] = value;
        if (field === "empName") {
            if (value.length < 4) {
                formError.empNameError = "The name should not be less than 4";
                fieldValidity.empNameValidity = false;
            }
            else {
                formError.empNameError = "";
                fieldValidity.empNameValidity = true;
            }
        }
        if (field === "age") {
            if (value < 21) {
                formError.ageError = "The age should not be less than 21";
                fieldValidity.ageValidity = false;
            }
            else {
                formError.ageError = "";
                fieldValidity.ageValidity = true;
            }
        }
        if (field === "salary") {
            if (value <= 10000) {
                formError.salaryError = "The name should not be less than 10000";
                fieldValidity.salaryValidity = false;
            }
            else {
                formError.salaryError = "";
                fieldValidity.salaryValidity = true;
            }
        }

        console.log(this.state.form.empName)
        console.log(this.state.fieldValidity.empNameValidity + " " + this.state.fieldValidity.ageValidity + "  " + this.state.fieldValidity.salaryValidity);
        this.setState({ form: form, formError: formError, fieldValidity: fieldValidity });

        this.setState({ formValid: this.state.fieldValidity.empNameValidity && this.state.fieldValidity.ageValidity && this.state.fieldValidity.salaryValidity })
    }

    handleChange = (e) => {
        e.preventDefault();
        if (this.state.formValid) {
            var resultJSON = {
                empId: this.props.match.params.empId,
                ename: this.state.form.ename,
                age: this.state.form.age,
                salary: this.state.form.salary,
                achievements: this.state.form.achievements
            }
            console.log(JSON.stringify(resultJSON));
        }
        this.setState({ successMessage: JSON.stringify(resultJSON) });

    }
    updateEmployee=(e)=>{
        var formJSON = {
            empId: this.props.match.params.empId,
            empName: this.state.form.empName,
            age: this.state.form.age,
            salary: this.state.form.salary,
            achievements: this.state.form.achievements
        };
        console.log(formJSON.empId);
        axios.put("http://localhost:2000/updateEmployeeDetails/"+this.props.match.params.empId,formJSON)
        .then(response=>{
            this.setState({successMessage:response.data.message,error:""});
        })
        .catch(error=>{
            if(error.response){
                this.setState({error:error.response.data.message,success:""});
            }
            else{
                this.setState({error:error.message,success:""});
            }
        });

    };

    render() {
        return (
            <div style={{ width: 500, margin: '0px auto', textAlign: 'left', fontSize: '20px' }}>
                <div className="form-group">
                    <label>Employee Id:</label>
                    <input className="form-control" name="empId" value={this.props.match.params.empId} disabled />
                </div>

                <div className="form-group">
                    <label>Employee Name:</label>
                    <input className="form-control" onChange={(e) => { this.validateField(e.target.name, e.target.value) }} name="empName" value={this.state.form.empName} />
                    <span className="text-danger">{this.state.formError.empNameError}</span>
                </div>

                <div className="form-group">
                    <label>Age:</label>
                    <input className="form-control" onChange={(e) => { this.validateField(e.target.name, e.target.value) }} name="age" value={this.state.form.age} />
                    <span className="text-danger">{this.state.formError.ageError}</span>
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <select className="form-control" onChange={(e) => { this.validateField(e.target.name, e.target.value) }} name="salary" value={this.state.form.salary}>
                        <option>--SELECT---</option>
                        <option value="10000" >10000</option>
                        <option value="20000" >20000</option>
                        <option value="30000">30000</option>
                        <option value="40000">40000</option>
                    </select>
                    <span className="text-danger ">{this.state.formError.salaryError}</span>
                </div>

                <div className="form-group">
                    <label>Achievements:</label>
                    <textarea className="form-control" onChange={(e) => { this.validateField(e.target.name, e.target.value) }} name="achievements" value={this.state.form.achievements} />
                </div>
                <button type="button" className="btn btn-success" onClick={this.handleChange} disabled={!this.state.formValid}>Add</button><br />

                <button type="button" className="btn btn-success" onClick={this.updateEmployee} disabled={!this.state.formValid}>Update</button><br />
                <span className="text-success">{this.state.successMessage}</span>
            </div>
        );
    }
}

export default EditEmployee;