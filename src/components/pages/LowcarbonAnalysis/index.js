import React, { Fragment, Suspense, useState, useEffect, useContext, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { DatePicker } from 'antd';
// import { LeftCircleOutlined } from '@ant-design/icons';

import moment from 'moment';

// DesignSystem
import { FullWindowAnimateStorage } from 'components/DesignSystem/FullWindow';
import { PopWindowAnimateStorage } from 'components/DesignSystem/PopWindow';
import UiButton from 'components/DesignSystem/Button';
import Message from 'components/DesignSystem/Message';
import Loading from 'components/DesignSystem/Loading';

// API
import { getLowcarbon001API } from 'api/api';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const LowcarbonAnalysis = ({ history }) => {
    const [step, setStep] = useState({});

    // const [lastTime, setLastTime] = useState('20234/02/15 14:41:29');
    // const [editingKey, setEditingKey] = useState('');

    const { closeAnimate, openAnimate } = useContext(FullWindowAnimateStorage);
    const { closeDialog, openDialog } = useContext(PopWindowAnimateStorage);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        asyncAllAPI(dateString);
    };

    // open loading
    const openLoading = () => {
        openAnimate({
            component: <Loading />
        });
    };

    // close loading
    const closeLoading = () => closeAnimate();

    const openMessage = (code, msg) => {
        openDialog({
            component: <Message code={code} msg={msg} closeMessage={closeMessage} />
        });
    };

    const closeMessage = () => closeDialog();

    // get API Lowcarbon001API
    const GETLowcarbonStatus001API = async (stepNumber, date) => {
        openLoading();
        const res = await getLowcarbon001API(stepNumber, date);
        if (res.status === 'ok') {
            closeLoading();
            return res.data;
        } else {
            console.log('[ERROR] API Lowcarbon001API:', res);
        }
        closeLoading();
    };

    const asyncAllAPI = async date => {
        try {
            const stepTitles = ['用戶管理', '日常用電追蹤', '家庭能源報告', '管理用電', '客戶服務'];
            const step_all = await Promise.all(
                [1, 2, 3, 4, 5].map(async index => {
                    const content = await GETLowcarbonStatus001API(index, date);
                    return {
                        title: `Step${index}. ${stepTitles[index - 1]}`,
                        content,
                        key: index
                    };
                })
            );
            console.log(step_all);
            setStep(step_all);
        } catch (error) {
            console.error('API 调用出错：', error);
        }
    };

    useEffect(() => {
        const date = moment().format('YYYY-MM-DD');
        asyncAllAPI(date);
    }, []);

    return (
        <div className={cx('energyAnalysis')}>
            <div className={cx('d_header')}>
                <h1 className={cx('title')}>新北市健康度檢視結果</h1>
            </div>
            <div className={cx('d_header')}>
                <DatePicker onChange={onChange} picker="date" defaultValue={moment()} />
            </div>
            <div className={cx('chart', 'margin_top')}>
                <div className={cx('chart_bg')}>
                    {step.length > 0 &&
                        step.map(item => {
                            return (
                                <div className={cx('group')} key={item.key}>
                                    <h2>{item.title}</h2>
                                    <div className={cx('inner')}>
                                        {item.content && item.content.length > 0
                                            ? item.content.map(el => {
                                                  return (
                                                      <div className={cx('card')}>
                                                          <h3>{el.pathName}</h3>
                                                          <div className={cx('result')}>
                                                              <p>{el.status}</p>
                                                              <div className={cx('status', el.status)} />
                                                          </div>
                                                      </div>
                                                  );
                                              })
                                            : '暫無資料'}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default withRouter(LowcarbonAnalysis);
