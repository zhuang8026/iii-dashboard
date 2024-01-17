import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { setCookie } from 'utils/cookie';

// DesignSystem
import { FullWindowAnimateStorage } from 'components/DesignSystem/FullWindow';
import Loading from 'components/DesignSystem/Loading';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Login = ({ history }) => {
    const { closeAnimate, openAnimate } = useContext(FullWindowAnimateStorage);
    const [seeType, setSeeType] = useState('password');
    const [info, setInfo] = useState({
        user: '',
        pwd: '',
        token: '0987654321poiuytrewqlkjhgfdsamnbvcxz'
    });

    const setAdminInfo = (type, value) => {
        setInfo({ ...info, [type]: value });
    };

    const loginin = () => {
        openLoading();

        setTimeout(() => {
            // testing, must wirte to API
            setCookie('iii_token', info.token); // 設定cookie
            history.replace('/main');
            closeLoading();
        }, 1000);
    };

    // open loading
    const openLoading = () => {
        openAnimate({
            component: <Loading text="Login..." />
        });
    };

    // close loading
    const closeLoading = () => closeAnimate();

    const seePassword = () => {
        if (seeType === 'password') {
            setSeeType('text');
        } else {
            setSeeType('password');
        }
    };

    return (
        <div className={cx('login')}>
            <div className={cx('left')}>
                <div className={cx('introduce')}>
                    <div className={cx('title')}>Welcome to III PDM</div>
                    <div className={cx('inner')}>
                        Prognostic and Data Quality Management visualization tools centrally display and monitor key
                        business indicators (KPIs) and data. It usually uses visual elements such as charts, graphs,
                        tables, etc. to help users quickly understand and analyze relevant content information.
                    </div>

                    <img src={require('assets/images/loginin.png')} alt="iii" />
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
                                type={seeType}
                                placeholder="password"
                                onChange={e => setAdminInfo('pwd', e.target.value)}
                            />
                            <p className={cx('seePassword')} onClick={e => seePassword()}>
                                see password
                            </p>

                            <button onClick={() => loginin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
