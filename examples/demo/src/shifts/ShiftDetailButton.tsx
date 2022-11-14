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
import { ShiftListing } from '../types';
import { BASE_URL } from '../constants';
import Button from '@material-ui/core/Button';
import { Visibility } from '@material-ui/icons';

const ShiftDetailButton: FC<{ record: ShiftListing }> = ({ record }) => {
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
        fetch(`${BASE_URL}/shift-detail`, {
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
                    // notify('Mark As Paid', 'info');
                    redirect(`/shift-listing/${record.id}/show`);
                }
            })
            .catch(e => {
                // notify('Not Mark As Paid', 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    return (
        <Button
            color="secondary"
            size="small"
            onClick={handleClick}
            startIcon={<Visibility />}
        >
            Show
        </Button>
    );
};

export default ShiftDetailButton;
