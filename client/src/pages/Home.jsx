import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Form, ListGroup, Input, Button, FormGroup, Col } from 'reactstrap';
import cookie from 'react-cookies';
import axios from "axios";
import ToDoItem from "../components/ToDoItem";

class Home extends Component {
    state = {
        name: "",
        email: "",
        id: "",
        todoItems: [],
        newTodo: ""
    }
    componentDidMount() {
        this.getUserInfo();
        this.getTodoItems();
    }

    addTodo = e => {
        e.preventDefault();
        axios.post('httpss://node-auth.aharrison.xyz/api/node-auth', {
            todo: this.state.newTodo,
            public: false
        }, {
                headers: {
                    'x-access-token': cookie.load('x-access-token')
                }
            }
        )
            .then(() => {
                this.getTodoItems()
                this.setState({ newTodo: "" })
            });
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getUserInfo = () => {
        axios.get('httpss://node-auth.aharrison.xyz/api/auth/me', {
            headers: {
                'x-access-token': cookie.load('x-access-token')
            }
        })
            .then(({ data }) => this.setState({
                name: data.name,
                email: data.email,
                id: data._id
            }))
            .catch(err => {

            })
    }

    deleteTodoItem = id => {
        axios.delete('httpss://node-auth.aharrison.xyz/api/node-auth/' + id, {
            headers: {
                'x-access-token': cookie.load('x-access-token')
            }
        }).then(() => this.getTodoItems());
    }

    getTodoItems = () => {
        axios.get('httpss://node-auth.aharrison.xyz/api/node-auth', {
            headers: {
                'x-access-token': cookie.load('x-access-token')
            }
        }).then(({ data }) => this.setState({ todoItems: data }));
    }

    logout = () => {
        cookie.remove("x-access-token");
        this.setState({});
    }

    render() {
        if (!cookie.load('x-access-token')) {
            return <Redirect to="/login" />
        }
        return (
            <div className="home">
                <h1>Home</h1>
                <h6>{this.state.name}</h6>
                <h6>{this.state.email}</h6>
                <Button onClick={this.logout} color="warning">Logout</Button>{" "}
                <Button color="info">
                    <Link style={{ "color": "white" }} to="/users">Users</Link></Button>
                <Card className="mt-3">
                    <CardBody>
                        <CardTitle className="h1">Todo Items</CardTitle>
                    </CardBody>
                    <ListGroup>
                        {this.state.todoItems.map(todo => {
                            return <ToDoItem getTodoItems={this.getTodoItems} handleDelete={this.deleteTodoItem} key={todo._id} node-auth={todo} />
                        })}
                    </ListGroup>
                    <CardBody>
                        <Form onSubmit={this.addTodo}>
                            <FormGroup row>
                                <Col sm={7}>
                                    <Input type="text" name="newTodo" value={this.state.newTodo} onChange={this.handleInput} />
                                </Col>
                                <Button color="success">Add</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

export default Home;
