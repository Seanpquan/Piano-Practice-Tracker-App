import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props) { //always call super when defining constrcutor for subclass
        super(props);
        //want keyword 'this' to refer to the whole class, need to use 'bind' 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //update state automatically update page with new values
        this.state = { //state is how you create variables in react. using ':' not '='. 
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [] //page will have dropdown menu with users to associate with exercise
        }
    }
    //react lifecycle method. this is automaticlaly called before anything is displayed on the page
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) { //check at least one user in database
                    this.setState({
                        users: response.data.map(user => user.username),  //just get the username from each JSON user, puts into array
                        username: response.data[0].username //automatically set to first user
                    })
                }
            })
    }
    //never say '=' here, instead use setState prebuilt method.
    onChangeUsername(e) { //if user enters username, it will call this function
        this.setState({
            username: e.target.value //target is text box, so whatever user inputs. just updates username.
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    //use library to make calendar
    onChangeDate(date) {
        this.setState({
            date: date //set date to equal the input variable 'date'
        })
    }

    onSubmit(e) {
        e.preventDefault(); //instead of doing normally do, it will do what we want (the following:)
        //you CAN create variables as long as its only used in this one method
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));


        window.location = '/logged-exercises/ALL'; //take the user back to home page, which is the list of exercises
    }

    render() {
        return (
            <div>
                <h3>Create New Practice Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Song: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description of practice: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}