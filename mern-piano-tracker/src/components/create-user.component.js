import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) { //if user enters username, it will call this function
        this.setState({
            username: e.target.value //target is text box, so whatever user inputs. just updates username.
        });
    }

    onSubmit(e) {
        e.preventDefault(); //instead of doing normally do, it will do what we want (the following:)
        //you CAN create variables as long as its only used in this one method
        const user = {
            username: this.state.username,
        }

        console.log(user);
        //sends post  request to the backend endpoint. expects a JSON object in request.  this is the 'user' input argument.
        axios.post('http://localhost:5000/users/add', user)//lookg at users.js 'post'
            .then(res => console.log(res.data));

        this.setState({
            username: '' //once they've submitted a new user, don't take back to home. 
        })              //instead give option to submit multiple users.
    }

    render() {
        return (
            <div>
                <h3>Create New Song</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Song name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Song" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}