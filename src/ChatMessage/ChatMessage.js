import React from "react";

export const ChatMessage = props => {
    props.persons.map(el =>{
        if(el.key === props.userId) console.log('so good');
    })
    return (
        props.persons.map(el =>{
            return(
                (el.key === props.idmessage)
                    ?
                    <div className="Chat__message-wrap">
                        <div className="Chat__message-user-info">
                            <div className="Chat__message-user-icon Chat__list">
                                <img src={el.img} alt="message-user-icon" className="Chat__list-usericon"/>
                            </div>
                            <div className="Chat__message-user-name">{el.name}</div>
                        </div>
                        <div className="Chat__message">{props.message} </div>
                    </div>
                    : ""
            )
            }
        )
    )
}
