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
import { Staff } from '../types';
import { BASE_URL } from '../constants';
import Button from '@material-ui/core/Button';
import BlockIcon from '@material-ui/icons/Block';

const DeactivateStaffBtn: FC<{ record: Staff }> = ({ record }) => {
    const dispatch = useDispatch();
    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');
    const redirect = useRedirect();
    const refresh = useRefresh();

    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = { id: record.id };
        fetch(`${BASE_URL}/staffs/deactivate`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                response.json().then(function (data) {
                    if (data.status) {
                        refresh();
                        notify('Staff Deactivated', 'info');
                    } else {
                        notify(`${data.message}`, 'error');
                    }
                });
            })
            .catch(e => {
                notify(`Can't Deactivate `, 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    return record.deletedAt == null ? (
        <Button
            color="secondary"
            size="small"
            onClick={handleClick}
            style={{ color: 'red', marginRight: 'auto' }}
            startIcon={<BlockIcon />}
        >
            Deactivate
        </Button>
    ) : null;
};

export default DeactivateStaffBtn;
