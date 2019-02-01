import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {
    state = {  }
    render() { 
        return ( <div className="home">
        <h1>Home</h1>
        <Link to="/login">Login</Link><br/>
        <Link to="/register">Register</Link><br/>
        <Link to="/users">Users</Link>
        </div> );
    }
}
 
export default Home;