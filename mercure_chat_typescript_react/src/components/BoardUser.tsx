import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';
import Left, { IConversation } from './Left/Left';
import { Route, Switch } from 'react-router-dom';
import Blank from './Right/Blank';
import Right from './Right/Right';
import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';

const BoardUser = () => {
    const username = JSON.parse(
        localStorage.getItem('username') as string,
    );
    const prout: IConversation = {
        username: '',
        createdAt: '',
        content: '',
        conversationId: 0,
    };
    const [conv, setConv] = useState<IConversation[]>([]);

    const myConv = [prout, prout];

    useEffect(() => {

        if (conv.length > 0 && username) {
            let url = new URL(
                'http://localhost:8001/.well-known/mercure',
            );

            url.searchParams.append(
                'topic',
                `/conversations/${username}`,
            );
            // @ts-ignore
            const eventSource = new EventSource(url, {
                withCredentials: true,
            });
            eventSource.onmessage = function (event) {
                const data = JSON.parse(event.data);

                let newContent: IConversation[] = [];
                if (conv.length > 0)
                    conv.forEach(
                        (
                            conversation: IConversation,
                            index: number,
                        ) => {
                            if (
                                conversation.conversationId ===
                                data.conversation.id
                            ) {
                                data.username = conversation.username;
                                newContent.push(data);
                            } else if (newContent)
                                newContent.push(conversation);
                        },
                    );
                if (newContent) setConv(newContent);
            };
        }
    }, [conv]);

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setConv(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setConv(_content);
            },
        );
    }, []);
    return (
        <div className="container py-5 px-4">
            <div className="row rounded-lg overflow-hidden shadow">
                {conv ? <Left key={0} myConv={conv} /> : ''}

                <Switch>
                    <Route path="/" component={Blank} exact />
                    <Right />
                </Switch>
            </div>
        </div>
    );
};

export default BoardUser;
