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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const ActivateStaffBtn: FC<{ record: Staff }> = ({ record }) => {
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
        fetch(`${BASE_URL}/staffs/activate`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                console.log(response);
                refresh();
                if (response.status == 200) {
                    notify('Staff Activated', 'info');
                }
            })
            .catch(e => {
                notify(`Can't Active `, 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    return record.deletedAt != null ? (
        <Button
            color="secondary"
            size="small"
            style={{ marginRight: 'auto' }}
            onClick={handleClick}
            startIcon={<CheckCircleOutlineIcon />}
        >
            Activate
        </Button>
    ) : null;
};

export default ActivateStaffBtn;
