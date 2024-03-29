import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">PianoTrack</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/logged-exercises/ALL/" className="nav-link">All Logs</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users-list" className="nav-link">Song list</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Add Song</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}