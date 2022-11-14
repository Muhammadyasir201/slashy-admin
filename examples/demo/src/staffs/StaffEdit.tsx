import * as React from 'react';
import { FC } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Icon from '@material-ui/icons/Stars';
import {
    DateInput,
    Edit,
    DateField,
    EditProps,
    BooleanField,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    required,
    email,
    ArrayField,
    FieldProps,
    ImageInput,
    SelectArrayInput,
    ReferenceInput,
    EditView,
    SelectInput,
    ImageField,
    ArrayInput,
    SimpleFormIterator,
    ReferenceArrayInput,
    SimpleForm,
    SaveButton,
    useNotify,
    useRedirect,
    regex,
    BooleanInput,
    FileInput,
    FileField,
    TabbedShowLayout,
    Tab,
    ReferenceArrayField,
    Datagrid,
    TextField,
    SingleFieldList,
    ChipField,
    NumberField,
    RecordContext,
} from 'react-admin';
import MarkAsPaidButton from '../payrolls/PaidButton';
import { getShiftStatusText } from '../shiftsHelper';
import { Box, Card, CardContent, Typography, Chip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Aside from './Aside';
import FullNameField from './FullNameField';
import { Staff, ShiftListing, PayRolls, Reviews } from '../types';
import { Styles } from '@material-ui/core/styles/withStyles';
import { useFormState } from 'react-final-form';
import DeactivateStaffBtn from './DeactivateBtn';
import ActivateStaffBtn from './ActivateBtn';
import { DATE_FORMAT7 } from '../constants';
import StarRatingField from '../reviews/StarRatingField';
import OpenPdfFromLinkButton from '../components/OpenPdfFromLinkButton';

const sexChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
];

const StaffEditToolbar = (props: any) => (
    <Toolbar {...props}>
        <DeactivateStaffBtn record={props} />
        <ActivateStaffBtn record={props} />
        <SaveButton />
    </Toolbar>
);

export const styles: Styles<Theme, any> = {
    inline_block: { display: 'inline-block' },
    staff_name: { display: 'inline-block' },
    nick_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { width: 544 },
    description: { display: 'inline-block', width: 544 },
    contact: { width: 544 },
    image: { width: 544 },
    gender: { display: 'inline-block', width: 544 },
    certified_roles: { display: 'inline-block', marginLeft: 32, width: 544 },
    info: { display: 'inline-block' },
    exp_date: { display: 'inline-block', marginLeft: 32, width: 544 },
    role: { display: 'inline-block' },
    company_name: { display: 'inline-block', marginLeft: 32, width: 544 },
    start_date: { display: 'inline-block' },
    end_date: { display: 'inline-block', marginLeft: 32, width: 544 },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
    doc: { display: 'inline-block', width: '500px' },
    doc_expiry: { display: 'inline-block', marginLeft: 32, marginRight: 32 },
    doc_name: { display: 'inline-block' },
};

const CustomNumberField: FC<{
    record: any;
    label: string;
    source: string;
}> = ({ record, source }) => {
    return (
        <div style={{ fontSize: 14 }}>
            {record && parseFloat(record[source]).toFixed(2)}
        </div>
    );
};

const useStyles = makeStyles(styles);

const ExperienceEndDate = (props: any) => {
    const { values } = useFormState();

    const targetExperience = values.experience[props.source.replace(/\D/g, '')];

    const currentlyWorking =
        // (targetExperience && targetExperience.is_present === 'current') ||
        // (props && props.record && props.record.is_present === 'current');
        (targetExperience && targetExperience.is_present === true) ||
        (props && props.record && props.record.is_present === true);

    if (currentlyWorking) {
        return <></>;
    }

    return <DateInput source="end_date" />;
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

const ShiftListItem: FC<FieldProps<ShiftListing>> = ({ record }) => {
    const array = record || {};
    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
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
                <NumberField source="num_of_staff" label="Number Of Staff" />
                {/* <TextField source="status" label="Status" /> */}
                <GetShiftStatusText record={record} label="Status" />
            </Datagrid>
        );
    }
};

const RenderMarkAsPaidButton = (data: any) => {
    if (typeof data.record === 'undefined' || data.record === null) {
        return <div />;
    } else {
        return <MarkAsPaidButton record={data.record} />;
    }
};

const DownloadPdfButton = (props: any) => {
    try {
        if (_.has(props, 'record') && _.has(props.record, 'pdf')) {
            return (
                <OpenPdfFromLinkButton
                    record={props.record}
                    text={'Download Payslip'}
                    isInVoice={false}
                />
            );
        }
    } catch (e) {
        console.log({ InvoiceListException: e });
    }

    return <div />;
};

const PaySlipListItem: FC<FieldProps<PayRolls>> = ({ record }) => {
    const array = record || {};
    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <Datagrid optimized>
                <TextField source="id" label="Payroll ID" />
                <DateField source="createdAt" label="Date" />
                <TextField source="staff.name" label="Staff Name" />
                <TextField source="company.name" label="Company Name" />
                <TextField source="role.display_name" label="Role" />
                <CustomNumberField
                    source="hours_worked"
                    record={record}
                    label="Working Hours"
                />
                <CustomNumberField
                    source="amount"
                    record={record}
                    label="Amount"
                />
                <BooleanField source="is_paid" label="Paid" />
                <DownloadPdfButton record={record} />
                <RenderMarkAsPaidButton data={record} />
            </Datagrid>
        );
    }
};

const ReviewsListItem: FC<FieldProps<Reviews>> = ({ record }) => {
    const array = record || {};
    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <Datagrid optimized>
                <StarRatingField />
                <TextField source="review" label="Review" />
                <TextField source="role" label="Role" />
                <TextField source="venue" label="Venue" />
            </Datagrid>
        );
    }
};

const downloadPdfDocument = () => {};

const StaffEdit: FC<EditProps> = props => {
    const classes = useStyles(props);

    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Staff Edited Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Edit title={<StaffTitle />} {...props} undoable={false}>
            <TabbedShowLayout>
                <Tab label="Staff Details">
                    <Edit
                        title={' '}
                        component="div"
                        {...props}
                        undoable={false}
                        onSuccess={() => onSuccess()}
                    >
                        <SimpleForm toolbar={<StaffEditToolbar />}>
                            <Typography variant="h6" gutterBottom>
                                Identity
                            </Typography>
                            <TextInput
                                autoFocus
                                label="Full Name"
                                source="username"
                                formClassName={classes.staff_name}
                                validate={[required(), validateName]}
                            />
                            <TextInput
                                label="Nick Name"
                                source="name"
                                formClassName={classes.nick_name}
                                validate={[required(), validateNickName]}
                            />
                            <TextInput
                                type="email"
                                source="email"
                                disabled
                                fullWidth
                                formClassName={classes.email}
                                validate={[required(), email()]}
                            />
                            <TextInput
                                fullWidth
                                multiline
                                source="description"
                                formClassName={classes.description}
                                validate={validateDesc}
                            />

                            <TextInput
                                source="contact"
                                formClassName={classes.contact}
                                validate={[required(), validateStaffContactNum]}
                            />

                            <ImageInput
                                source="avatar"
                                label="Avatar"
                                accept="image/png,image/jpeg,image/jpg"
                                formClassName={classes.image}
                            >
                                <ImageField title="title" source="src" />
                            </ImageInput>
                            <span className={classes.dimensionsNote}>
                                Note: Recommended dimensions: 360 * 210 pixels
                            </span>
                            <Separator />
                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>
                            <TextInput
                                source="address"
                                formClassName={classes.address}
                                multiline
                                fullWidth
                                helperText={false}
                                // validate={validateAddress}
                            />

                            <Separator />

                            <Typography variant="h6" gutterBottom>
                                Gender
                            </Typography>
                            <SelectInput
                                source="gender"
                                formClassName={classes.gender}
                                choices={sexChoices}
                                validate={requiredValidate}
                            />

                            <Typography variant="h6" gutterBottom>
                                Certified Roles
                            </Typography>
                            <ReferenceArrayInput
                                source="role_id"
                                reference="roles"
                            >
                                <SelectArrayInput
                                    optionText="display_name"
                                    optionValue="id"
                                    formClassName={classes.certified_roles}
                                    validate={requiredValidate}
                                />
                            </ReferenceArrayInput>

                            <Typography variant="h6" gutterBottom>
                                Experience
                            </Typography>

                            <ArrayInput resource="staffs" source="experience">
                                <SimpleFormIterator>
                                    <TextInput
                                        source="title"
                                        formClassName={classes.role}
                                        validate={[
                                            required(),
                                            validateRoleName,
                                        ]}
                                    />
                                    <TextInput
                                        source="company"
                                        formClassName={classes.company_name}
                                        validate={[
                                            required(),
                                            validateCompanyName,
                                        ]}
                                    />
                                    <Typography variant="h6" gutterBottom>
                                        Duration
                                    </Typography>
                                    <DateInput
                                        formClassName={classes.start_date}
                                        source="start_date"
                                        validate={[required()]}
                                    />
                                    <DateInput
                                        formClassName={classes.end_date}
                                        source="end_date"
                                    />
                                    <BooleanInput
                                        label="Currently works here"
                                        source="is_present"
                                        format={(val: any) =>
                                            val === 'current' ? true : false
                                        }
                                        parse={(val: any) => {
                                            return val ? true : false;
                                        }}
                                    />
                                </SimpleFormIterator>
                            </ArrayInput>
                            <Separator />
                            <Typography variant="h6" gutterBottom>
                                Documents
                            </Typography>

                            <ArrayInput resource="staffs" source="documents">
                                <SimpleFormIterator>
                                    <TextInput
                                        label={'Document Name'}
                                        source="doc_name"
                                        formClassName={[
                                            classes.doc_name,
                                            classes.inline_block,
                                        ]}
                                        validate={requiredValidate}
                                    />
                                    <DateInput
                                        formClassName={[
                                            classes.doc_expiry,
                                            classes.inline_block,
                                        ]}
                                        label={'Expiry Date'}
                                        source="expiry"
                                        validate={requiredValidate}
                                    />

                                    <FileInput
                                        source="pdf"
                                        label="Document(Terms Of Business)"
                                        placeholder="Drop a file to upload, or click to select it."
                                        accept="application/pdf"
                                        formClassName={[
                                            classes.pdfDoc,
                                            classes.inline_block,
                                        ]}
                                        validate={requiredValidate}
                                    >
                                        <FileField
                                            source="src"
                                            title="Document"
                                        />
                                    </FileInput>
                                </SimpleFormIterator>
                            </ArrayInput>
                            <Separator />

                            {/* document section end */}
                            <Typography variant="h6">Password</Typography>

                            <PasswordInput
                                label="Password"
                                source="staff_password"
                                validate={validatePassword}
                            />
                        </SimpleForm>
                    </Edit>
                </Tab>
                <Tab label="Shifts">
                    <ReferenceArrayField
                        label="Ongoing Shifts"
                        reference="shift-listing"
                        source="ongoing_shifts"
                    >
                        <ShiftListItem />
                    </ReferenceArrayField>
                    <ReferenceArrayField
                        label="Upcoming Shifts"
                        reference="shift-listing"
                        source="upcoming_shifts"
                    >
                        <ShiftListItem />
                    </ReferenceArrayField>
                    <ReferenceArrayField
                        label="Past Shifts"
                        reference="shift-listing"
                        source="past_shifts"
                    >
                        <ShiftListItem />
                    </ReferenceArrayField>
                    <ArrayField label="Reviews" source="reviews">
                        <ReviewsListItem />
                    </ArrayField>
                </Tab>

                <Tab label="Pay Slips">
                    <ReferenceArrayField
                        label="Paid Slips"
                        reference="payroll"
                        source="paid_payslips"
                    >
                        <PaySlipListItem />
                    </ReferenceArrayField>
                    <ReferenceArrayField
                        label="Unpaid Slips"
                        reference="payroll"
                        source="unpaid_payslips"
                    >
                        <PaySlipListItem />
                    </ReferenceArrayField>
                </Tab>
            </TabbedShowLayout>
        </Edit>
    );
};
const StaffTitle: FC<FieldProps<Staff>> = ({ record }) =>
    record ? <FullNameField record={record} size="32" /> : null;

const requiredValidate = [required()];

/* staff name validation */
const validateName = regex(
    /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
    'Please provide a valid name'
);

/* staff nickname validation */
const validateNickName = regex(/^[^0-9][^@#]+$/, 'Please provide a valid name');

/* staff address validation */
const validateAddress = regex(
    /^[a-zA-Z0-9\s,'-]*$/,
    'Please provide a valid Address'
);

/* staff Password validation */
const validatePassword = regex(
    /^(?=(.*[A-Z]){1,}).{6,}$/,
    `Password should contain one capital letter & Password length should be greater than 5`
);

/* staff description validation */
const validateDesc = regex(
    /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
    'Please provide valid description'
);

/* contact number validation */
const validateStaffContactNum = regex(
    /^(?:\+971)\d{9}$/,
    'Please provide a valid contact no.'
);
/* company name validation */
const validateCompanyName = regex(
    /^(?:[A-Za-z]+)(?:[A-Za-z0-9 @_:-]*)$/,
    'Please provide a valid company name'
);

/* staff role name in experience validation */
const validateRoleName = regex(
    /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
    'Please provide a valid role'
);

const Separator = () => <Box pt="1em" />;

export default StaffEdit;
