import React from "react";
import {Col} from "react-materialize";

export const ChatHeader = props => {
    return (
        <Col s={12} className="Chat__header">
            <div className="Chat__header-icon">
                <img src={props.onPersonView.roomImg} alt="img" className="Chat__avatar"/>
            </div>
            <div className="Chat__header-username"><b>{props.onPersonView.roomName}</b></div>
        </Col>
    )
}
