import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import staffs from './staffs';
import vendors from './vendors';
import roles from './roles';
import shifts from './shifts';
import payorders from './payorders';
import invoices from './invoices';
import payrolls from './payrolls';
import dataProvider from './customDataProvider';
import industries from './industries';
import notifications from './notifications';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => {
    return (
        <Admin
            title=""
            dataProvider={dataProvider}
            customRoutes={customRoutes}
            authProvider={authProvider}
            // dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
        >
            <Resource name="staffs" {...staffs} />
            <Resource name="roles" {...roles} />
            <Resource name="vendors" {...vendors} />
            <Resource name="shift-listing" {...shifts} />
            <Resource name="payorders" {...payorders} />
            <Resource name="invoices" {...invoices} />
            <Resource name="payroll" {...payrolls} />
            <Resource name="category" {...industries} />
            <Resource name="notifications" {...notifications} />
        </Admin>
    );
};

export default App;
