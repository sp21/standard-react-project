import React, { Component } from 'react';
import axios from 'axios';
import Employee from './Employee';

class Card extends Component {

    constructor(props) {
        super();
        this.state = {
            result: '',
            errorMessage: ''
        };
        this.fetchEmployees = this.fetchEmployees.bind(this);
    }

    componentDidMount() {
        this.fetchEmployees();
    }
    fetchEmployees() {
        axios
            .get("http://localhost:2000/retreiveEmployeelist")
            .then(response => {
                this.setState({
                    result: response.data,
                    errorMessage: ""
                });
                console.log(this.state.result);
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        errorMessage: error.response.data.message,
                        result: ""
                    });
                } else {
                    this.setState({ errorMessage: error.message, result: "" });
                }
            });
    }

    render() {

        return (
            <div>
                <h3 className="text-center text-primary">Employee Details</h3>
                <div className="row">
                    {this.state.result ? this.state.result.map(emp => <Employee key={emp.empId} emp={emp} />) : null}
                </div>
                {this.state.errorMessage ? (<h4 className="text-danger">{this.state.errorMessage}</h4>) : null}
            </div>
        );
    }
}

export default Card;