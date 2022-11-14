import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    useNotify,
    useRedirect,
    fetchStart,
    fetchEnd,
    useRefresh,
} from 'react-admin';
import { FC } from 'react';
import { Staff, Vendor } from '../types';
import { BASE_URL } from '../constants';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

const DeactivateManagerButton: FC<{ record: any }> = ({ record }) => {
    const dispatch = useDispatch();
    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');
    const redirect = useRedirect();
    const refresh = useRefresh();

    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const handleActivateButtonClick = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = { id: record.id };
        fetch(`${BASE_URL}/vendor/activate`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                refresh();
                if (response.status == 200) {
                    notify('Manager Activated', 'info');
                } else {
                    response.json().then(function (data) {
                        notify(`${data.message}`, 'error');
                    });
                }
            })
            .catch(e => {})
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };

    const handleDeActivateButtonClick = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = { id: record.id };
        fetch(`${BASE_URL}/vendor/deactivate`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                refresh();
                if (response.status == 200) {
                    notify('Manager Deactivated', 'info');
                } else {
                    response.json().then(function (data) {
                        notify(`${data.message}`, 'error');
                    });
                }
            })
            .catch(e => {})
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    return record.is_deleted == false ? (
        <Button
            color="secondary"
            size="small"
            onClick={handleDeActivateButtonClick}
            style={{ color: 'red' }}
            startIcon={<BlockIcon />}
        >
            Deactivate
        </Button>
    ) : (
        <Button
            color="secondary"
            size="small"
            onClick={handleActivateButtonClick}
            style={{ color: 'blue' }}
            startIcon={<BlockIcon />}
        >
            Activate
        </Button>
    );
};

export default DeactivateManagerButton;
