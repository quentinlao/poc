import React from 'react';
import Conversation from "./Conversation";

export interface IConversation {
    "username": string,
    "conversationId": number,
    "content": string,
    "createdAt": string
}


export default function Left(props:
    {
        myConv: IConversation []
    }
) {
    const {myConv} = props;
        return (

            <div className="col-5 px-0">
                <div className="bg-white">
                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="h5 mb-0 py-1">Recent</p>
                    </div>
                    <div className="messages-box">
                        <div className="list-group rounded-0">
                            {
                                myConv !== undefined ?
                                    myConv.sort((a:IConversation ,b: IConversation) => {
                                            return Date.parse(b.createdAt as string) - Date.parse(a.createdAt as string);
                                    })
                                        .map((conversation:IConversation, index:number) => {
                                            return  (
                                                <Conversation
                                                        username={conversation.username}
                                                        key={index}
                                                        createdAt={conversation.createdAt}
                                                        conversationId={conversation.conversationId}
                                                        content={conversation.content}
                                            />)
                                        })
                                    : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        );

}

