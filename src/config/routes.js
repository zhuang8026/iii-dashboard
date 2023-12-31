import React, { lazy } from 'react';
// import { getBooleanFromENV } from 'components/utils';

import Home from 'components/pages/Home';
import EventDetail from 'components/pages/EventDetail';
import History from 'components/pages/History';

const routes = [
    {
        path: '/main',
        title: 'Home',
        component: Home,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },
    {
        path: '/main/event-detail/:id?',
        title: 'Event Detail',
        component: EventDetail,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },

    // version 2
    {
        path: '/history',
        title: 'History',
        component: History,
        exact: true,
        authRequired: false,
        layouts: ['']
    }
];

export default routes;
