import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//User component. a functional react component
const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>
            <Link to={"/logged-exercises/" + props.user.username}>view</Link>
        </td>
        <td>
            <a href={props.youtubeLink}>link</a>
        </td>
        <td>
            <Link to={"edit-user/" + props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
        </td>
    </tr>
)                                                                  //"#" means link goes nowhere      
//class component
export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            users: [],
            exercises: [],
        };  //empty array of users
    }
    //get the list of exercises from database
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {   //we want to get all the fields for exercises. entire JSON object, put into array
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        //get all the exercises in an array
        axios.get('http://localhost:5000/exercises/')
            .then(response => {   //we want to get all the fields for exercises. entire JSON object, put into array
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //id is an input. (mongoDb automatically assigned)
    deleteUser(id) {
        //also delete exercisees!!!! 
        this.removeExercisesWithDeletedUser(id);

        axios.delete('http://localhost:5000/users/' + id)
            .then(response => console.log(response.data)); //will say 'user deleted' (from backend)

        this.setState({  //react automatically updates page with this new state
            users: this.state.users.filter(el => el._id !== id)
        })   //filters thru array of exercises. only return elements whose elements != the id we are deleting. lambda func.
    }


    userList() {
        //getting Youtube url

        return this.state.users.map(currentuser => {
            return <User user={currentuser} youtubeLink={"https://www.youtube.com/results?search_query=piano " + currentuser.username} deleteUser={this.deleteUser} key={currentuser._id} />;
        })  //these are two 'props'
    }

    removeExercisesWithDeletedUser(userIdToDelete) {
        let promises = [];
        let usernameToDelete = '';
        console.log('http://localhost:5000/users/' + userIdToDelete);
        promises.push(
            axios.get('http://localhost:5000/users/' + userIdToDelete)
                .then(response => {   //we want to get all the fields for exercises. entire JSON object, put into array
                    usernameToDelete = response.data.username;
                    console.log('response.data: ' + JSON.stringify(response.data));

                })
        )

        Promise.all(promises).then(() => {
            console.log('usernameToDelete: ' + usernameToDelete)
            for (const currExercise of this.state.exercises) {

                let currUsername = currExercise.username;
                console.log('currUsername: ' + currUsername);

                if (currUsername === usernameToDelete) {
                    console.log('MATCH!');
                    //detele the exercise entry

                    axios.delete('http://localhost:5000/exercises/' + currExercise._id)
                        .then(response => console.log(response.data)) //will say 'exercise deleted' (from backend)


                }
            }
        });
    }


    render() {
        return (
            <div>
                <h3>Song list</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Song</th>
                            <th>View Logs</th>
                            <th>YouTube link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

