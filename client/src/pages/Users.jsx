import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';
import cookie from 'react-cookies';

class Users extends Component {
    state = {
        users: [],
        myId: "",
        redirect: false
    }

    componentDidMount() {
        axios.get('http://todo.aharrison.xyz/api/users/').then(({ data }) => this.setState({ users: data }));
        axios.get('http://todo.aharrison.xyz/api/auth/me', {
            headers: {
                'x-access-token': cookie.load('x-access-token')
            }
        }).then(({ data }) => this.setState({ myId: data._id }));
    }

    deleteUser = id => {
        console.log(id, this.state.myId)
        axios.delete('http://todo.aharrison.xyz/api/users/' + id, {
            headers: {
                'x-access-token': cookie.load('x-access-token')
            }
        }).then(({ data }) => axios.get('http://todo.aharrison.xyz/api/users/').then(({ data }) => {
            if (id === this.state.myId) {
                cookie.remove("x-access-token")
                this.setState({ redirect: true })
            }
            else this.setState({ users: data });
        }));
    }

    render() {
        if (this.state.redirect) return <Redirect to="/register" />;
        return (<div className="users">
            <h1>Users</h1>
            <Link to="/">Home</Link>
            {this.state.users.map(user => {
                return (
                    <div key={user._id}>
                        <Button color="danger" size="sm" onClick={() => this.deleteUser(user._id)}>Delete</Button>
                        <ul>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                            <li>Password: {user.password}</li>
                            <li>Id: {user._id}</li>
                        </ul>
                    </div>
                )
            })}
        </div>);
    }
}

export default Users;