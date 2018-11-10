import React from "react";

export const ChatMessage = props => {
    return (
            <div className="Chat__message-wrap">
                <div className="Chat__message-user-info">
                    <div className="Chat__message-user-icon Chat__list">
                        <img src={props.img} alt="message-user-icon" className="Chat__list-usericon"/>
                    </div>
                    <div className="Chat__message-user-name">{props.name}</div>
                </div>
                <div className="Chat__message">{props.message} </div>
            </div>
    )
}
