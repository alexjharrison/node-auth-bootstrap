import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    state = { 
        email: "",
        name: "",
        password: "",
        toUsers: false,
     }

     handleKeypress = e => {
         this.setState({[e.target.name]:e.target.value})
     }

    handleSubmit = e => {
        e.preventDefault();
        const {email,name,password} = this.state;
        axios.post('http://localhost:3000/api/auth/register',{email,name,password})
            .then(({data})=>{
                console.log(data.token)
                document.cookie="auth="+data.token
                this.setState({toUsers:true})
            })
        
    }

    render() { 
        if(this.state.toUsers){
            return <Redirect to="/users" />
        }
        return ( 
            <div className="register">
                <h1>Register</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input onChange={this.handleKeypress} type="text" name="name" value={this.state.name}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input onChange={this.handleKeypress} type="email" name="email" value={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input onChange={this.handleKeypress} type="password" name="password" value={this.state.password}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
            </div> 
        );
    }

}
 
export default Register;