import React, { Component } from 'react';
import { ListGroupItem, Button, Input } from 'reactstrap';
import Axios from 'axios';
import cookie from "react-cookies";

class ToDoItem extends Component {
    state = {
        editing: false,
        newTodo: this.props.todo.todo
    }

    componentDidMount() {
        console.log(this.props.todo);
    }

    editItem = () => {
        this.setState({ editing: true })
    }

    updateTodo = () => {
        const { newTodo } = this.state;
        Axios.put('http://todo.aharrison.xyz:4521/api/todo/' + this.props.todo._id,
            { todo: newTodo },
            {
                headers: {
                    'x-access-token': cookie.load('x-access-token')
                }
            }).then(res => {
                this.setState({ editing: false })
                this.props.getTodoItems();
            })
    }

    handleChange = e => {
        this.setState({ newTodo: e.target.value })
    }

    render() {
        return (
            <ListGroupItem>
                {this.state.editing ?
                    <Button onClick={this.updateTodo} color="warning" >Update</Button>
                    :
                    <Button onClick={() => this.props.handleDelete(this.props.todo._id)} color="danger" >X</Button>
                }{' '}
                {this.state.editing ?
                    <Input style={{ "display": "inline", "width": "70%" }} type="text" active="true" onKeyPress={e => e.key === "Enter" ? this.updateTodo() : ""} onChange={this.handleChange} value={this.state.newTodo} /> :
                    <span onClick={this.editItem}>{this.props.todo.todo}</span>
                }

            </ListGroupItem>
        );
    }
}

export default ToDoItem;