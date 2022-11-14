import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {
    useNotify,
    useRedirect,
    fetchStart,
    fetchEnd,
    useRefresh,
} from 'react-admin';
import { FC } from 'react';
import { ShiftListing, Staff } from '../types';
import { BASE_URL } from '../constants';
import Button from '@material-ui/core/Button';
// import PaymentIcon from '@material-ui/icons/Payment';

const StaffButton: FC<{
    record: Staff;
    shiftId: string;
    status: string;
}> = ({ record, shiftId, status }) => {
    const dispatch = useDispatch();

    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');
    const redirect = useRedirect();
    const refresh = useRefresh();

    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = {
            staff_id: record.id,
            status: status,
            shift_id: shiftId,
        };

        fetch(`${BASE_URL}/respond-application`, {
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
                    notify('Action performed Successfully', 'info');
                } else {
                    notify('Something went wrong', 'error');
                }
            })
            .catch(e => {
                notify('Something went wrong', 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };

    const handleMarkAsBookedClick = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = {
            staff: record.id,
            shift: shiftId,
        };

        fetch(`${BASE_URL}/book-staff`, {
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
                    notify('Action performed Successfully', 'info');
                }
            })
            .catch(e => {
                notify('Something went wrong', 'error');
            })
            .finally(() => {
                setLoading(true);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };

    const getData = () => {
        let mStatusAccept: string = 'accept';
        let mStatusCancel: string = 'cancel';
        let mStatusDecline: string = 'decline';
        let mStatusMarkAsBooked: string = 'mark_as_booked';

        if (status === mStatusAccept) {
            return (
                <Button color="secondary" size="small" onClick={handleClick}>
                    Accept
                </Button>
            );
        }
        if (status === mStatusCancel) {
            return (
                <Button color="secondary" size="small" onClick={handleClick}>
                    Cancel Invite
                </Button>
            );
        }
        if (status === mStatusDecline) {
            return (
                <Button color="secondary" size="small" onClick={handleClick}>
                    Decline
                </Button>
            );
        }
        if (status === mStatusMarkAsBooked) {
            return (
                <Button
                    color="secondary"
                    size="small"
                    onClick={handleMarkAsBookedClick}
                >
                    Mark As Booked
                </Button>
            );
        }
        return <></>;
    };

    return getData();
};

export default StaffButton;
