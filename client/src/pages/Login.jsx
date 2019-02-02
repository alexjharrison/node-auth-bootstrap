import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
import Axios from 'axios';
import cookie from 'react-cookies';

class Login extends Component {
    state = {
        email: "",
        password: "",
        redirect: false,
        badPw: false
    }

    handleKeypress = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        Axios.post('http://todo.aharrison.xyz/api/auth/login', { email, password })
            .then(({ data }) => {
                cookie.save('x-access-token', data.token)
                this.setState({ redirect: true })
            })
            .catch(() => {
                this.setState({ badPw: true })
                setTimeout(() => {
                    this.setState({ badPw: false })
                }, 3000);
            })
    }




    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="login m-4">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input onChange={this.handleKeypress} type="email" name="email" value={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input onChange={this.handleKeypress} type="password" name="password" value={this.state.password} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" type="submit">Submit</Button>{" "}
                        <Link className="ml-4" to="/register">Register</Link>
                    </FormGroup>
                </Form>
                {this.state.badPw ? <Alert color="danger">Wrong Password Entered</Alert> : ""}
            </div>
        );
    }
}

export default Login;