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
import { Invoice } from '../types';
import { BASE_URL } from '../constants';
import Button from '@material-ui/core/Button';
import PaymentIcon from '@material-ui/icons/Payment';

const MarkAsPaidButton: FC<{ record: Invoice }> = ({ record }) => {
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
        fetch(`${BASE_URL}/mark-as-paid`, {
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
                    notify('Mark As Paid', 'info');
                }
            })
            .catch(e => {
                notify('Not Mark As Paid', 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    return record.is_paid === false ? (
        <Button
            color="secondary"
            size="small"
            onClick={handleClick}
            startIcon={<PaymentIcon />}
        >
            Mark As Paid
        </Button>
    ) : null;
};

export default MarkAsPaidButton;
