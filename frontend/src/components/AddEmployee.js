import React, { Component } from 'react';
import axios from 'axios';
class AddEmployee extends Component {
 
    state={
        empId:"",
        empName:"",
        age:"",
        salary:"40000",
        achievements:"",
        formErrors:{
            empNameErr:"",
            empAgeErr:""
        },
        fieldValidity:{
            empName:"",
            empAge:""
        },
        formValid:false,
        successMessage:""
    };
 
    validateEmpName=(e)=>{
        let empName=e.target.value;
        let formError=this.state.formErrors;
        let fieldValidity=this.state.fieldValidity;
        this.setState({empName:empName});
        if(empName.length<6){
            formError.empNameErr="The Name Should not be less than 6";
            fieldValidity.empName=false;
        }
        else{
            formError.empNameErr="";
            fieldValidity.empName=true;
        }
        this.setState({formErrors:formError});
        this.setState({formValid:this.state.fieldValidity.empName&&this.state.fieldValidity.empAge})
    };

    validateAge=(e)=>{
        let empAge=e.target.value;
        let formError=this.state.formErrors;
        let fieldValidity=this.state.fieldValidity;
        this.setState({empAge:empAge});
        if(empAge<21){
            formError.empAgeErr="The Age Should not be less than 21";
            fieldValidity.empAge=false;
        }
        else{
            formError.empAgeErr="";
            fieldValidity.empAge=true;
        }
        this.setState({formErrors:formError});
        this.setState({formValid:this.state.fieldValidity.empName&&this.state.fieldValidity.empAge})
    };
    
    validateSalary=(e)=>{
        const salary=e.target.value;
        this.setState({salary:salary});
    };
    validateAchievement=(e)=>{
        const achievements=e.target.value;
        this.setState({achievements:achievements});
    };
    addEmployee=(e)=>{
            e.preventDefault();
            var addForm={
                empName:this.state.empName,
                empAge:this.state.empAge,
                salary:this.state.salary,
                achievements:this.state.achievements
            };
            console.log(addForm);
             axios.post("http://localhost:2000/InsertEmployee/",addForm)
             .then(response=>{
                this.setState({successMessage:response.data.message,error:""});
            })
            .catch(error=>{
                if(error.response){
                    this.setState({error:error.response.data.message,success:""});

                }else{
                    this.setState({error:error.message,success:""});
                }
            });
        
    };



    render() {
        return (
            <div style={{width:500,margin:'0px auto'}}>
                <h1 className="text-center">Add Employee</h1>
                <form>
                    <div className="form-group">
                        <label>Employee Name:</label>
                        <input className="form-control" type="text" onChange={this.validateEmpName} value={this.state.empName}/>
                    </div>
                    <span className="text-danger">{this.state.formErrors.empNameErr}</span>

                    <div className="form-group">
                        <label>Employee Age:</label>
                        <input className="form-control" type="text" onChange={this.validateAge} value={this.state.empAge}/>
                    </div>
                    <span className="text-danger">{this.state.formErrors.empAgeErr}</span>

                    <div className="form-group">
                        <label>Employee Salary:</label>
                        <select className="form-control" type="text" onChange={this.validateSalary} value={this.state.salary}>
                            <option value="20000">20000</option>
                            <option value="30000">30000</option>
                            <option value="40000">40000</option>
                            <option value="50000">50000</option>     
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Employee Achievements:</label>
                        <textarea className="form-control" type="text" onChange={this.validateAchievement} value={this.state.achievements}/>
                    </div>
                    <button type="button" onClick={this.addEmployee} className="btn btn-success" disabled={!this.state.formValid} >Add Employee</button><br/>
                    <span className="text-success">{this.state.successMessage}</span>
                </form>
            </div>
        );
    }
}

export default AddEmployee;