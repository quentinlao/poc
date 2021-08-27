import React from 'react';
import {Link} from "react-router-dom";
import {IConversation} from "./Left"

export default function Conversation (props: IConversation) {

        return (
            <Link to={"/conversation/"} className="list-group-item list-group-item-action rounded-0">
                <div className="media">
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user"
                         width="50" className="rounded-circle"/>
                    <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0"></h6>
                            {props.username}
                            <small
                                className="small font-weight-bold">{new Date(props.createdAt as string).toLocaleDateString()}</small>
                        </div>
                        <p className="font-italic mb-0 text-small"> {props.content}</p>
                    </div>
                </div>
            </Link>
        );

}

