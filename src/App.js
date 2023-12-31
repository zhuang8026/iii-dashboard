import React, { Fragment, Suspense, useState, useEffect, useContext, useRef } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { AreaChartOutlined, HistoryOutlined } from '@ant-design/icons';

// DesignSystem
import NoMatch from 'components/DesignSystem/NoMatch';
import Menu from 'components/DesignSystem/LeftMenu';
import Footer from 'components/DesignSystem/Footer';
import { withFullWindowProvider, FullPopWindow } from 'components/DesignSystem/FullWindow';
import { withPopWindowProvider, PopWindow } from 'components/DesignSystem/PopWindow';

// config
import routes from 'config/routes';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App({ match, location, history }) {
    const nodeRef = useRef(null);
    const [menuList, setMenuList] = useState([
        {
            name: '即時數據分析',
            path: '/main',
            icon: <AreaChartOutlined />
        },
        // version 2
        // {
        //     name: '歷史資料',
        //     path: '/history',
        //     icon: <HistoryOutlined />
        // }
    ]);
    // all route
    const Routes = () => {
        return routes.map((route, key) => (
            <Route
                key={`route_${key}`}
                path={`${route.path}`}
                exact={route.exact}
                sensitive
                render={() => {
                    document.title = `III | ${route.title}`;
                    return <route.component localeMatch={match} routeData={route} />;
                }}
            />
        ));
    };

    return (
        <div className={cx('App')}>
            {/* <header className="App-header"></header> */}
            {/* Menu */}
            <Suspense fallback={<></>}>
                <Menu menuList={menuList} />
            </Suspense>

            {/* body */}
            <div className={cx('main')}>
                {/* 路由頁面 */}
                <Suspense fallback={<></>}>
                    <Switch location={location}>
                        <Route exact path="/">
                            <Redirect to="/main" />
                        </Route>
                        {Routes()}
                        <Route component={NoMatch} />
                    </Switch>
                </Suspense>
                {/* Footer */}
                <Suspense fallback={<></>}>
                    <Footer />
                </Suspense>
            </div>

            {/**
             * 可隨意添加 comment
             */}
            <FullPopWindow />
            <PopWindow />
        </div>
    );
}
export default withRouter(withFullWindowProvider(withPopWindowProvider(App)));
