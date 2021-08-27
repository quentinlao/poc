import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// @ts-ignore
import Form from 'react-validation/build/form';
// @ts-ignore
import Input from 'react-validation/build/input';
// @ts-ignore
import CheckButton from 'react-validation/build/button';

import { login } from '../actions/auth';
import { IRootState } from '../reducers';

const required = (value: any) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props: any) => {
    const form = useRef<HTMLFormElement>(null);
    const checkBtn = useRef<HTMLButtonElement>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(
        (state: IRootState) => state.auth,
    );
    /* const { message } = useSelector(
        (state: IRootState) => state.message,
    ); */

    const dispatch = useDispatch();

    const onChangeUsername = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setLoading(true);

        // @ts-ignore
        form.current.validateAll();

        // @ts-ignore
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password));
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {/* {message && (
                        <div className="form-group">
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )} */}
                    <CheckButton
                        style={{ display: 'none' }}
                        ref={checkBtn}
                    />
                </Form>
            </div>
        </div>
    );
};

export default Login;
