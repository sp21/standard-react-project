import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import image1 from '../assets/image1.jpg';

class Employee extends Component {

    state = {
        achievements: null,
        edit: null
    };

    handleEdit = () => {
        this.setState(() => ({ edit: true }))
    };

    handleView = () => {
        this.setState(() => ({ achievements: this.props.emp.achievements }))
    };



    render() {
        var note=null;
        var redirect=null;
        const { emp } = this.props; // this will export the emp from the props declared in Card component
        console.log(emp);
        if (this.state.edit) {
            return <Redirect to={"/edit/" + emp.empId} push></Redirect>
        }
        if(this.props.emp.age<25){
            note=<span className="text-info">-Fresher</span>;
        }
        return (
            <div className="card" style={{ width: "300px", margin: "15px" }} >

                <img className="card-img-top" src={image1} alt="profile pic" height="200" />
                <div className="card-body">
                    <h5 className="card-title text-center">{emp.empName}</h5>
                    <p className="card-text">
                        <span>Id: {emp.empId}</span><br />
                        <span>Age:{emp.age}</span><br />{note}<br/>
                        {/* {emp.age < 25 && <span className="text-info">Fresher</span>}<br /> */}
                        <span> Salary:{emp.salary}</span><br />
                    </p>
                    <p><i>{this.state.achievements}</i></p>
                    <button type="button" className="btn btn-primary" onClick={this.handleEdit}>Edit</button>
                    <button type="button" className="btn btn-success" onClick={this.handleView}>View</button>
                    {redirect}
                </div>
            </div>
        );
    }
}

export default Employee;