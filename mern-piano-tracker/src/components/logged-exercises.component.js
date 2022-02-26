import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Exercise component. a functional react component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(5, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)                                                                  //"#" means link goes nowhere      
//class component
export default class LoggedExercises extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };  //empty array of exercises
    }
    //get the list of exercises from database
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {   //we want to get all the fields for exercises. entire JSON object, put into array
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //id is an input. (mongoDb automatically assigned)
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => console.log(response.data)); //will say 'exercise deleted' (from backend)

        this.setState({  //react automatically updates page with this new state
            exercises: this.state.exercises.filter(el => el._id !== id)
        })   //filters thru array of exercises. only return elements whose elements != the id we are deleting. lambda func.
    }       //where did _id come from? _id is the automatically created one from mongoid.

    selectedUsername = this.props.match.params.username;

    exerciseList(selectedUsername) {
        //console.log('selectedUsername: ' + selectedUsername);
        if (selectedUsername !== "ALL") {
            return this.state.exercises
                .filter(function (currentexercise) {
                    return currentexercise.username == selectedUsername;
                })
                .map(currentexercise => {
                    return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
                })  //these are three 'props'
        }
        else {
            //show all users
            //console.log("ALL users selected");
            return this.state.exercises.map(currentexercise => {
                return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
            })  //these are three 'props'
        }

    }



    /**
     * Finds amount played for a given day
     * @param date , the string date in yyyy-mm-dd format 
     * @param targetUsername the person who we are looking for
     * @returns number of minutes played that day
     */
    durationPerDay(date, targetUsername) {
        if (targetUsername == "ALL") {
            let addingDuration = 0;
            for (const currentexercise of this.state.exercises) {
                if (currentexercise.date.substring(5, 10) == date) {

                    addingDuration += currentexercise.duration;
                    //console.log('currDur:' + currentexercise.duration);
                    //console.log('MATCH');
                }

            }
            //console.log(addingDuration);
            return addingDuration;
        }
        else {
            let addingDuration = 0;
            for (const currentexercise of this.state.exercises) {
                if (currentexercise.date.substring(5, 10) == date && currentexercise.username == targetUsername) {

                    addingDuration += currentexercise.duration;
                    //console.log('currDur:' + currentexercise.duration);
                    //console.log('MATCH');
                }

            }
            //console.log(addingDuration);
            return addingDuration;
        }
    }

    getCurrentDate() {
        let currDate = new Date();
        return currDate.toISOString().substring(5, 10);
    }

    render() { //7 days in a week
        let today = new Date();
        let data = [];
        let iteratingDate = new Date();
        //console.log('Finding duration for each day...');
        for (let i = 0; i < 7; i++) {
            iteratingDate.setDate(today.getDate() - i)
            let iteratingDuration = this.durationPerDay(iteratingDate.toISOString().substring(5, 10), this.props.match.params.username);

            var dataPoint = {
                dateX: iteratingDate.toISOString().substring(5, 10),
                duration: iteratingDuration,
            }
            //console.log(dataPoint);
            data[i] = dataPoint;
        }

        data.reverse();

        return (
            <div>
                <h3>Logs for {this.props.match.params.username}</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Song</th>
                            <th>Description of practice</th>
                            <th>Duration (minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList(this.props.match.params.username)}
                    </tbody>
                </table>
                <div>
                    <h4>Weekly practice duration summary (minutes)</h4>
                    <LineChart
                        width={1200}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateX" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>

        )
    }
}

