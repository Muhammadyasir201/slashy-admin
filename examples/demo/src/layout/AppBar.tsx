import * as React from 'react';
import { AppBar, UserMenu } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import myImg from '../assets/images/logo.svg';
import ChangePassword from '../dashboard/ChangePassword';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const CustomUserMenu = (props: any) => (
    <UserMenu children={<ChangePassword />} {...props} />
);

const CustomAppBar = (props: any) => {
    const classes = useStyles();
    return (
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <img src={myImg} alt="Logo" />
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;
