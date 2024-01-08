import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { setCookie } from 'utils/cookie';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Login = ({ history }) => {
    const [info, setInfo] = useState({
        user: '',
        pwd: '',
        token: '0987654321poiuytrewqlkjhgfdsamnbvcxz'
    });

    const setAdminInfo = (type, value) => {
        setInfo({ ...info, [type]: value });
    };

    const loginin = () => {
        setCookie('iii_token', info.token); // 設定cookie
        history.replace('/main');
    };

    return (
        <div className={cx('login')}>
            <div className={cx('left')}>
                <div className={cx('introduce')}>
                    <div className={cx('title')}>Welcome to III Dashboard</div>
                    <div className={cx('inner')}>
                        Visualization tools to centrally display and monitor key business indicators (KPIs) and data. It
                        is usually presented in the form of charts, graphs, tables and other visual elements to help
                        users quickly understand and analyze relevant information.
                    </div>

                    <img src={require('images/loginin.png')} alt="iii" />
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('login-page')}>
                    <div className={cx('title')}>Login</div>
                    <div className={cx('form')}>
                        <div className={cx('login-form')}>
                            <p className={cx('login-title')}>Account</p>
                            <input
                                type="text"
                                placeholder="username"
                                onChange={e => setAdminInfo('user', e.target.value)}
                            />

                            <p className={cx('login-title')}> Password</p>
                            <input
                                type="password"
                                placeholder="password"
                                onChange={e => setAdminInfo('pwd', e.target.value)}
                            />
                            <button onClick={() => loginin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);