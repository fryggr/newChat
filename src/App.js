import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    Button,
    Icon,
    Row,
    Col,
    Collection,
    CollectionItem,
    Badge,
    Input
} from "react-materialize";

class App extends Component {
    render() {
        return (
            <div className="App container Chat">
                <Row>
                    <Col s={4} className="grid-example">
                        <Collection>
                            <CollectionItem href="#!">
                                User <Badge>1</Badge>
                            </CollectionItem>
                            <CollectionItem href="#!">
                                User <Badge newIcon>4</Badge>
                            </CollectionItem>
                            <CollectionItem href="#!">User</CollectionItem>
                            <CollectionItem href="#!">
                                User <Badge>14</Badge>
                            </CollectionItem>
                        </Collection>
                    </Col>
                    <Col s={8} className="grid-example">
                        <div className="Chat__body row">
                            <Col s={12} className="Chat__header">
                                <div className="Chat__header-icon">
                                    <img src="img/img.jpg"/>
                                </div>
                                <div className="Chat__header-username">user</div>
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
