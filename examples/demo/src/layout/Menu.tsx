import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';

import vendors from '../vendors';
import staffs from '../staffs';
import shifts from '../shifts';
import SubMenu from './SubMenu';
import { AppState } from '../types';
import roles from '../roles';
import payorders from '../payorders';
import payrolls from '../payrolls';
import invoices from '../invoices';
import industries from '../industries';

type MenuName =
    | 'menuCatalog'
    | 'menuSales'
    | 'menuCustomers'
    | 'menuStaffs'
    | 'menuVendors';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
        menuStaffs: true,
        menuVendors: true,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box mt={1}>
            {' '}
            {/* <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} /> */}
            {/* {* staff menu *} */}
            <SubMenu
                handleToggle={() => handleToggle('menuStaffs')}
                isOpen={state.menuStaffs}
                sidebarIsOpen={open}
                name="pos.menu.staffs"
                icon={<staffs.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/staffs`}
                    primaryText={translate(`resources.staffs.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<staffs.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />

                <MenuItemLink
                    to={`/roles`}
                    primaryText={translate(`resources.roles.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<roles.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />

                <MenuItemLink
                    to={`/category`}
                    primaryText={'Industries'}
                    leftIcon={<industries.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {/* {* vendor menu *} */}
            <MenuItemLink
                to={`/vendors`}
                primaryText={'Clients'}
                leftIcon={<vendors.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {/* {* shifts menu *} */}
            <MenuItemLink
                to={`/shift-listing`}
                primaryText={'Shift List'}
                leftIcon={<shifts.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {/* {* payorders menu *} */}
            <MenuItemLink
                to={`/payorders`}
                primaryText={'Purchase Orders'}
                leftIcon={<payorders.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {/* {* invoices menu *} */}
            <MenuItemLink
                to={`/invoices`}
                primaryText={'Invoices'}
                leftIcon={<invoices.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/payroll`}
                primaryText={'Payrolls'}
                leftIcon={<payrolls.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/notifications`}
                primaryText={'Notifications'}
                leftIcon={<vendors.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;
