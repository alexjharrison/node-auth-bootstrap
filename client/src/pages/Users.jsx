import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import axios from 'axios';

class Users extends Component {
    state = { users: [] }

    componentDidMount(){
        axios.get('http://localhost:3000/api/users/').then(({data})=>this.setState({users:data}));
    }

    getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    deleteUser = id => {
        console.log(id);
        axios.delete('http://localhost:3000/api/users/'+id,{headers: {
            'x-access-token': this.getCookie('auth')
        }}).then(({data})=>axios.get('http://localhost:3000/api/users/').then(({data})=>this.setState({users:data})));
    }

    render() { 
        return ( <div className="users">
        <h1>Users</h1>
        <Link to="/">Home</Link>
        {this.state.users.map(user=>{
            return (
                <div key={user._id}>
                <Button color="danger" size="sm" onClick={()=>this.deleteUser(user._id)}>Delete</Button>
                    <ul>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        <li>Id: {user._id}</li>
                    </ul>
                </div>
            )
        })}
        </div> );
    }
}
 
export default Users;