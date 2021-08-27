import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';
const Profile = () => {
    const { user: currentUser } = useSelector(
        (state: any) => state.auth,
    );
    console.log(
        '🚀 ~ file: Profile.tsx ~ line 7 ~ Profile ~ currentUser',
        currentUser,
    );

    /*if (!currentUser) {
        return <Redirect to="/login" />;
    }*/
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Profile</h3>
                {JSON.stringify(currentUser)}
            </header>
            <p></p>
        </div>
    );
};

export default Profile;
