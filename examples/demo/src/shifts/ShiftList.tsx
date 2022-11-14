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
import { useMediaQuery, Theme, Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { ShiftListing, Vendor, Reviews, Status } from '../types';
import MobileGrid from './MobileGrid';
import { FC } from 'react';
import { DATE_FORMAT7 } from '../constants';
import ShiftDetailButton from './ShiftDetailButton';
import { getShiftStatusText } from '../shiftsHelper';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});
const ShiftFilter = (props: Omit<FilterProps, 'children'>) => {
    const classes = useFilterStyles();
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <ReferenceArrayInput
                label="Super User's Company"
                source="vendor_id"
                reference="vendors"
            >
                <SelectInput
                    optionText={(choice: Vendor) =>
                        choice.id && // the empty choice is { id: '' }
                        `${choice.company.name}`
                    }
                />
            </ReferenceArrayInput>
            <SelectInput
                source="status"
                choices={[
                    { id: 'browse', name: 'Browse' },
                    { id: 'upcoming', name: 'Upcoming' },
                    { id: 'ongoing', name: 'Ongoing' },
                    { id: 'review_pending', name: 'Review Pending' },
                    { id: 'past', name: 'Past' },
                ]}
                className={classes.status}
            />
        </Filter>
    );
};

// for slots array in shiftslisting list
const SlotsArrayField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    const array = record?.slots;
    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <>
                {array.map(item => (
                    <Chip
                        label={moment(item.day).format(DATE_FORMAT7)}
                        key={moment(item.day).format(DATE_FORMAT7)}
                        style={{ margin: 4 }}
                    />
                ))}
            </>
        );
    }
};
SlotsArrayField.defaultProps = { addLabel: true, label: 'Date' };

// for slots array in shiftslisting list
const GetShiftStatusText: FC<FieldProps<ShiftListing>> = ({ record }) => {
    const data = record?.status;
    if (typeof data === 'undefined' || data === null) {
        return <div />;
    } else {
        let numOfStaff = record?.num_of_staff;
        let bookedStaffCount = record?.booked_staff_count;
        let data = getShiftStatusText(record?.status, {
            totalNoOfStaff: numOfStaff,
            noOfBookedStaff: bookedStaffCount,
        });
        return <TextField emptyText={data} label="Status" />;
    }
};

const ShiftList = (props: ListProps, record: any): ReactElement => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            bulkActionButtons={false}
            {...props}
            // filters={<ShiftFilter />}
            exporter={false}
            // aside={<VendorListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="show">
                    <TextField source="id" label="Shift ID" />
                    <TextField source="role" label="Role Name" />
                    <TextField source="company.name" label="Company Name" />
                    <TextField source="venue_name" label="Venue Name" />
                    <SlotsArrayField source="slots">
                        <SingleFieldList linkType={false}>
                            <ChipField source="day" size="medium" />
                        </SingleFieldList>
                    </SlotsArrayField>
                    <NumberField source="hourly_rate" label="Hourly Rate" />
                    <NumberField
                        source="num_of_staff"
                        label="Number Of Staff"
                    />
                    {/* <TextField source="status" label="Status" /> */}
                    {/* <ShiftDetailButton record={record} /> */}
                    <GetShiftStatusText record={record} label="Status" />
                </Datagrid>
            )}
        </List>
    );
};

export default ShiftList;
