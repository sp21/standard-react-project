import './App.css';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Card from './components/Card';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">HR Portal</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/addEmployee">
              Add Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/card">
              View Employees
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/card" />)} />
        <Route path="/card" component={Card}/>
        <Route path="/addEmployee" component={AddEmployee}/>
        <Route path="/edit/:empId" component={EditEmployee}/>
      </Switch>
    </div>
  );
}

export default App;
