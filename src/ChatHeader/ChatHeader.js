import React from "react";
import {Col} from "react-materialize";

export const ChatHeader = props => {
    return (
        <Col s={12} className="Chat__header">
            <div className="Chat__header-icon">
                <img src={props.onPersonView.img} alt="img" className="Chat__avatar"/>
            </div>
            <div className="Chat__header-username"><b>{props.onPersonView.name}</b></div>
        </Col>
    )
}
