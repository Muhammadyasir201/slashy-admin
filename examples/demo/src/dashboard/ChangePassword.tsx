import React, { Component, Fragment, ReactElement } from 'react';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    required,
    Toolbar,
    SaveButton,
    CardActions,
    ListProps,
    PasswordInput,
    useRedirect,
    fetchStart,
    fetchEnd,
    useRefresh,
    useNotify,
} from 'react-admin';
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';
import { Field, Form } from 'react-final-form';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constants';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const useStyles = makeStyles(
    (theme: Theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginForm' }
);

const ChangePassword = (props: ListProps, record: any): ReactElement => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPopUp, setPopUpVisibility] = useState(false);
    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');

    const refresh = useRefresh();
    const notify = useNotify();

    const handleSubmitClick = (passObj: any) => {
        if (!_.has(passObj, 'oldPassword')) return;

        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = {
            oldPassword: passObj.oldPassword,
            newPassword: passObj.newPassword,
        };
        console.log({ updatedRecord: JSON.stringify(updatedRecord) });
        fetch(`${BASE_URL}/change-password`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                console.log({ response: response.body });

                if (response.status == 200) {
                    notify('Password Changed Successfully', 'info');
                    setPopUpVisibility(false);
                    refresh();
                } else {
                    notify('Something went wrong', 'error');
                }
            })
            .catch(e => {
                notify('Something went wrong', 'error');
            })
            .finally(() => {
                setLoading(false);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };

    const classes = useStyles(props);
    return (
        <Fragment>
            <li
                onClick={() => {
                    setPopUpVisibility(true);
                }}
                className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root  MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button"
                role="menuitem"
                aria-disabled="false"
            >
                <div style={{ display: 'flex', marginRight: 15 }}>
                    <RotateLeftIcon />
                </div>
                Change Password
            </li>

            <Dialog open={showPopUp} onClose={() => setPopUpVisibility(false)}>
                <div>
                    <CardActions>
                        <Form
                            onSubmit={handleSubmitClick}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className={classes.form}>
                                        <div className={classes.input}>
                                            <PasswordInput
                                                source="oldPassword"
                                                validate={requiredValidate}
                                            />
                                        </div>
                                        <div className={classes.input}>
                                            <PasswordInput
                                                source="newPassword"
                                                validate={requiredValidate}
                                            />
                                        </div>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            className={classes.button}
                                        >
                                            {loading && (
                                                <CircularProgress
                                                    color="inherit"
                                                    className={classes.icon}
                                                    size={18}
                                                    thickness={2}
                                                />
                                            )}
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                    </CardActions>
                </div>
            </Dialog>
        </Fragment>
    );
    // }
};
const requiredValidate = [required()];

export default ChangePassword;
