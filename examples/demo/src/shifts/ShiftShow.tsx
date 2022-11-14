import * as React from 'react';
import { FC } from 'react';
import {
    ShowProps,
    Show,
    ShowController,
    SimpleShowLayout,
    TextField,
    NumberField,
    ImageField,
    Datagrid,
    ArrayField,
    SimpleFormIterator,
    TabbedShowLayout,
    RichTextField,
    Tab,
    FieldProps,
    SingleFieldList,
    ChipField,
    ReferenceField,
    ReferenceManyField,
    ReferenceArrayField,
    EmailField,
    List,
    RefreshButton,
} from 'react-admin';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography,
} from '@material-ui/core';
import moment from 'moment';

import Aside from './Aside';
import { ShiftListing, Staff } from '../types';
import { DATE_FORMAT7, TIME_FORMAT5 } from '../constants';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { Fragment } from 'react';
import StaffLinkField from '../staffs/StaffLinkField';
import StaffActionButtons from './StaffActionButtons';

export const styles: Styles<Theme, any> = {
    shift_name: { display: 'inline-block' },
    company: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

// for shift name in shifts list
const ShiftNameField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    return (
        <div style={{ fontSize: 14 }}>
            {record?.role} @ {record?.venue_name}
        </div>
    );
};
ShiftNameField.defaultProps = { addLabel: true, label: 'Role @ Venue' };

// for hourly rate in shifts list
const HourlyRateField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    return <div style={{ fontSize: 14 }}>AED {record?.hourly_rate} / hour</div>;
};
HourlyRateField.defaultProps = { addLabel: true, label: 'Rate' };

// for number of staff in shifts list
const NumberOfStaffField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    return <div style={{ fontSize: 14 }}> {record?.num_of_staff} Staff</div>;
};
NumberOfStaffField.defaultProps = { addLabel: true, label: 'Number Of Staff' };

// for shift_unifrom array in shifts list
const StaffUniformField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    return (
        <>
            <div style={{ fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Male: </span>
                {record?.uniform.male}
            </div>
            <div style={{ fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Female: </span>
                {record?.uniform.female}
            </div>
        </>
    );
};

const StaffAction: FC<FieldProps<Staff>> = ({ source, record }) => {
    return <div>Test</div>;
};

StaffUniformField.defaultProps = { addLabel: true, label: 'Uniform' };

// for slots array in shifts list
const SlotsArrayField: FC<FieldProps<ShiftListing>> = ({ record }) => {
    const array = record?.slots;
    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <ul
                style={{
                    padding: '0 0 0 16px',
                    margin: 0,
                }}
            >
                {array &&
                    array.map(item => (
                        <li
                            key={item.day}
                            style={{
                                fontSize: 14,
                                marginTop: 3,
                                padding: 0,
                            }}
                        >
                            {item.times.map(times => (
                                <li
                                    key={times.from}
                                    style={{
                                        marginTop: 3,
                                        padding: '3px 0',
                                    }}
                                >
                                    {moment(item.day).format(DATE_FORMAT7)} @{' '}
                                    {moment(times.from).format(TIME_FORMAT5)} -{' '}
                                    {moment(times.to).format(TIME_FORMAT5)}
                                </li>
                            ))}
                        </li>
                    ))}
            </ul>
        );
    }
};
SlotsArrayField.defaultProps = { addLabel: true, label: 'Slots' };

const ActionsRefresh = (props: any) => <CardActions>{}</CardActions>;

const ShiftShow: FC<ShowProps> = (props, record: any) => {
    const { id } = props;

    let mShiftId: string = id ? id : '';

    let mStatusAccept: string = 'accept';
    let mStatusCancel: string = 'cancel';
    let mStatusDecline: string = 'decline';
    let mStatusMarkAsBooked: string = 'mark_as_booked';
    let ada = false;
    const classes = useStyles(props);

    return (
        <ShowController {...props}>
            {controllerProps => (
                <Show {...props} {...controllerProps}>
                    <TabbedShowLayout>
                        <Tab label="Shift Info">
                            <TextField source="id" label="Shift ID" />
                            <TextField source="status" label="Status" />
                            <HourlyRateField />
                            <NumberOfStaffField />
                            <ShiftNameField />
                            <TextField
                                source="company.name"
                                label="Company Name"
                            />
                            <TextField
                                source="job_description"
                                label="Job Desription"
                            />
                            <StaffUniformField />
                            <SlotsArrayField />
                        </Tab>

                        <Tab label="Staff List">
                            <ReferenceArrayField
                                label="Booked Staff"
                                reference="staffs"
                                source="booked_staff"
                            >
                                <Datagrid>
                                    <TextField label="Staff ID" source="id" />
                                    <StaffLinkField />
                                    <TextField
                                        label="Nick Name"
                                        source="name"
                                    />
                                    <EmailField
                                        source="email"
                                        label="Email Address"
                                    />

                                    <ArrayField label="Roles" source="role_id">
                                        <SingleFieldList linkType={false}>
                                            <ChipField
                                                source="display_name"
                                                size="small"
                                            />
                                        </SingleFieldList>
                                    </ArrayField>
                                    <NumberField
                                        source="contact"
                                        label="Phone Number"
                                    />
                                    <StaffActionButtons
                                        record={record}
                                        shiftId={mShiftId}
                                        status={mStatusCancel}
                                        controllerProps={controllerProps}
                                    />
                                    {/* <StaffAction source="id" /> */}
                                </Datagrid>
                            </ReferenceArrayField>

                            <ReferenceArrayField
                                label="Pending Staff"
                                reference="staffs"
                                source="pending_staff"
                            >
                                <Datagrid>
                                    <TextField label="Staff ID" source="id" />
                                    <StaffLinkField />
                                    <TextField
                                        label="Nick Name"
                                        source="name"
                                    />
                                    <EmailField
                                        source="email"
                                        label="Email Address"
                                    />

                                    <ArrayField label="Roles" source="role_id">
                                        <SingleFieldList linkType={false}>
                                            <ChipField
                                                source="display_name"
                                                size="small"
                                            />
                                        </SingleFieldList>
                                    </ArrayField>
                                    <NumberField
                                        source="contact"
                                        label="Phone Number"
                                    />

                                    <StaffActionButtons
                                        record={record}
                                        shiftId={mShiftId}
                                        status={mStatusCancel}
                                        controllerProps={controllerProps}
                                    />

                                    {/* <StaffAction source="id" /> */}
                                </Datagrid>
                            </ReferenceArrayField>

                            <ReferenceArrayField
                                label="Interested Staff"
                                reference="staffs"
                                source="interested_staff"
                            >
                                <Datagrid>
                                    <TextField label="Staff ID" source="id" />
                                    <StaffLinkField />
                                    <TextField
                                        label="Nick Name"
                                        source="name"
                                    />
                                    <EmailField
                                        source="email"
                                        label="Email Address"
                                    />

                                    <ArrayField label="Roles" source="role_id">
                                        <SingleFieldList linkType={false}>
                                            <ChipField
                                                source="display_name"
                                                size="small"
                                            />
                                        </SingleFieldList>
                                    </ArrayField>
                                    <NumberField
                                        source="contact"
                                        label="Phone Number"
                                    />
                                    {/* <div> */}
                                    <StaffActionButtons
                                        record={record}
                                        shiftId={mShiftId}
                                        status={mStatusAccept}
                                        controllerProps={controllerProps}
                                    />
                                    <StaffActionButtons
                                        record={record}
                                        shiftId={mShiftId}
                                        status={mStatusDecline}
                                        controllerProps={controllerProps}
                                    />
                                    {/* </div> */}
                                    {/* <StaffAction source="id" /> */}
                                </Datagrid>
                            </ReferenceArrayField>

                            <ReferenceArrayField
                                label="Other Available Staff"
                                reference="staffs"
                                source="other_staff"
                            >
                                <Datagrid>
                                    <TextField label="Staff ID" source="id" />
                                    <StaffLinkField />
                                    <TextField
                                        label="Nick Name"
                                        source="name"
                                    />
                                    <EmailField
                                        source="email"
                                        label="Email Address"
                                    />

                                    <ArrayField label="Roles" source="role_id">
                                        <SingleFieldList linkType={false}>
                                            <ChipField
                                                source="display_name"
                                                size="small"
                                            />
                                        </SingleFieldList>
                                    </ArrayField>
                                    <NumberField
                                        source="contact"
                                        label="Phone Number"
                                    />
                                    <StaffActionButtons
                                        record={record}
                                        shiftId={mShiftId}
                                        status={mStatusMarkAsBooked}
                                        controllerProps={controllerProps}
                                    />
                                    {/* <StaffAction source="id" shift_id={mShift} /> */}
                                </Datagrid>
                            </ReferenceArrayField>
                        </Tab>
                    </TabbedShowLayout>
                </Show>
            )}
        </ShowController>
    );
};

export default ShiftShow;
