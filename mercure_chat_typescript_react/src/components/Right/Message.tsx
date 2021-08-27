import React from 'react';


class Message extends React.Component {


    render() {
        let img = <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />;


        return (
            <div className={`media w-50 mb-3`} >
                {img}
                <div className="media-body ml-3">
                    <div className={`rounded py-2 px-3 mb-2`}>
                        <p className={`text-small mb-0`}>message.content</p>
                    </div>
                    <p className="small text-muted">message.createdAt</p>
                </div>
            </div>
        );
    }
}

export default Message;