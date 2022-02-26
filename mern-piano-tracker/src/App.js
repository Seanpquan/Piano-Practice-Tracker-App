import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UsersList from "./components/users-list.component";
import LoggedExercises from "./components/logged-exercises.component";
import IntroductionPage from "./components/introduction-page.component";
import EditUser from "./components/edit-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={IntroductionPage} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
        <Route path="/users-list" component={UsersList} />
        <Route path="/logged-exercises/:username" component={LoggedExercises} />
        <Route path="/edit-user/:id" component={EditUser} />
      </div>
    </Router>
  );
}

export default App;