import React, { Component } from "react";
import "./App.css";
import {
    Button,
    Icon,
    Row,
    Col,
    CollectionItem,
    Badge,
    Input
} from "react-materialize";
import svidetel from "./img.png";
import { PersonList } from "./PersonList/PersonList.js";

let PERSONS = [
  {
    "id": 1,
    "name": "Witness",
    "img": "../img.png",
  },
  {
    "id": 2,
    "name": "Anton Uralskiy",
    "img": "../anton.jpg",
  },
  {
    "id": 3,
    "name": "Kot",
    "img": "../kot.jpg",
  },
  {
    "id": 4,
    "name": "Remove Kebab",
    "img": "../remove-kebab.jpg",
  }
];

class App extends Component {

    constructor(props){
        super(props)

        this.state = { persons: [PERSONS] };

    }

    render() {
        return (
            <div className="App container Chat">
                <Row>
                    <Col s={4} className="grid-example">
                        <PersonList />
                    </Col>
                    <Col s={8} className="grid-example">
                        <div className="Chat__body row">
                            <Col s={12} className="Chat__header">
                                <div className="Chat__header-icon">
                                    <img src={svidetel} alt="img" className="Chat__avatar"/>
                                </div>
                                <div className="Chat__header-username"><b>Svidetel</b></div>
                            </Col>
                            <Col s={12} className="Chat__input">
                                <Input s={11} label="Text message..." />
                                <Icon s={1} className="Chat__icon-send">
                                    send
                                </Icon>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
