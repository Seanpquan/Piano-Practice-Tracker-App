import React, { Component } from 'react';
import picture from '../images/picture.jpg';
export default class IntroductionPage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to PianoTrack </h1>
                <h3> What is this app for?</h3>
                <p>
                    PianoTrack tracks your piano practice progress in an easy-to-use app.
                </p>
                <h3>How to use this app</h3>
                <ul>
                    <li>"All Logs" shows data for all songs</li>
                    <li>"Song List" shows data for a specific song</li>
                    <li>"Add Log" and "Add Song" are self-explanatory</li>
                    <li>"PianoTrack" can be clicked at any time to see this instruction page</li>
                </ul>
                <h3>Info about the creator of this app</h3>
                <p>
                    Self-driven, eager to learn, and passionate about computer science.
                    2ndth year computer science major, loves programming, and always looking for opportunities!
                    Hello! I'm a 2nd year computer science student at UBC, from Vancouver, Canada.
                    Ever since I started programming in high school, I was always striving to explore
                    new tools and technologies, from individual technical endeavours, to collaborative
                    hackathon projects, to work experience in industry. Feel free to check out my resume, and if you have any
                    questions, or just want to chat, don't hesitate to add me on LinkedIn. Thanks for visiting!
                </p>
                <img src={picture} alt="alternatetext"></img>
            </div>

        )
    }
}

