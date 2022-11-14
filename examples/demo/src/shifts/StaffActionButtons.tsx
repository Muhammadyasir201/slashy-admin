import * as React from 'react';
import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import ThumbUp from '@material-ui/icons/ThumbUp';
import {
    useTranslate,
    useUpdate,
    useNotify,
    useRedirect,
    FieldProps,
    fetchStart,
    useRefresh,
    fetchEnd,
} from 'react-admin';
import { BASE_URL } from '../constants';
import { Review, Staff } from './../types';

const isPastShift = (data: any) => {
    if (_.isUndefined(data)) return;

    const { record } = data;

    return _.isEqual(record.status, 'past');
};

const StaffActionButtons: FC<{
    record: Staff;
    shiftId: any;
    status: any;
    controllerProps: any;
}> = ({ record, shiftId, status, controllerProps }) => {
    // const StaffActionButtons: FC<{ record: Staff }> = ({ record }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');

    const refresh = useRefresh();
    const notify = useNotify();
    const redirectTo = useRedirect();
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
                    notify('This action can not be performed', 'error');
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
                    console.log({ response });

                    notify('Action performed Successfully', 'info');
                } else {
                    response.json().then(function (data) {
                        notify(`${data.message}`, 'error');
                    });
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
        if (isPastShift(controllerProps)) return <></>;
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
                    Cancel
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

StaffActionButtons.propTypes = {
    record: PropTypes.any,
};

export default StaffActionButtons;
