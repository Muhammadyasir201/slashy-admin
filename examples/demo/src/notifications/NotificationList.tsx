import * as React from 'react';
import moment from 'moment';
import {
    Datagrid,
    Filter,
    FilterProps,
    List,
    ListProps,
    NumberField,
    SearchInput,
    TextField,
    SelectInput,
    ReferenceArrayInput,
    FieldProps,
    SingleFieldList,
    ChipField,
} from 'react-admin';
import { useMediaQuery, Theme, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { FC } from 'react';
import { DATE_FORMAT7 } from '../constants';
import ShiftList from '../shifts/ShiftList';
import notificationKeys from './NotificationhelperFile';
import { Notification } from '../types';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});

const notificationNavigation = (record: any) => {
    try {
        switch (record.type) {
            case notificationKeys.STAFF_REVIEWED:
            case notificationKeys.EARLY_PAYMENT: {
                const mData = JSON.parse(record.data);
                return `staffs/${mData.staff.id}`;
            }
            case notificationKeys.DOCUMENT_ABOUT_TO_EXPIRE: {
                const mData = JSON.parse(record.data);
                return `staffs/${mData.staff.id}`;
            }
            case notificationKeys.STAFF_DID_NOT_ACCEPTED_CHANGES:
            case notificationKeys.STAFF_CANCELLED_SHIFT:
            case notificationKeys.SHIFT_CREATED:
            case notificationKeys.SHIFT_UPDATED:
            case notificationKeys.STAFF_DID_NOT_TIME_IN:
            case notificationKeys.STAFF_DID_NOT_TIME_OUT:
            case notificationKeys.MARKED_NO_SHOW: {
                const mData = JSON.parse(record.data);
                return `shift-listing/${mData.shift.id}/show`;
            }
            case notificationKeys.CREDITS_ALERT: {
                const mData = JSON.parse(record.data);
                return `vendors/${mData.vendor.id}`;
            }
            default: {
                return '';
            }
        }
    } catch (e) {
        console.log({ notificationClickException: e });
    }
    return '';
};

const GetNotificationArrivalTime: FC<FieldProps<Notification>> = ({
    record,
}) => {
    const data = record?.createdAt;
    if (typeof data === 'undefined' || data === null) {
        return <div />;
    } else {
        return <TextField emptyText={moment(data).fromNow()} />;
    }
};

const NotificationList = (
    props: ListProps,
    record: Notification
): ReactElement => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );

    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List bulkActionButtons={false} {...props} exporter={false}>
            <Datagrid
                optimized
                rowClick={(id, basePath, record) => {
                    return notificationNavigation(record);
                }}
            >
                <TextField sortable={false} source="id" label="ID" />
                <TextField sortable={false} source="title" label="Title" />
                <TextField sortable={false} source="body" label="Description" />
                <GetNotificationArrivalTime record={record} label="Time" />
            </Datagrid>
        </List>
    );
};

export default NotificationList;
