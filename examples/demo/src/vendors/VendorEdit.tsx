import * as React from 'react';
import { FC, ReactElement } from 'react';
import moment from 'moment';
import {
    Edit,
    EditProps,
    TextInput,
    Toolbar,
    required,
    FieldProps,
    ImageInput,
    ImageField,
    SaveButton,
    SimpleForm,
    DateField,
    useRedirect,
    useNotify,
    regex,
    FileField,
    FileInput,
    TabbedShowLayout,
    Tab,
    ReferenceArrayField,
    ArrayField,
    Datagrid,
    TextField,
    SingleFieldList,
    ChipField,
    NumberField,
    BooleanField,
    List,
    Resource,
} from 'react-admin';
import MarkAsPaidButton from '../../../demo/src/invoices/PaidButton';
import { getShiftStatusText } from '../shiftsHelper';
import MobileGrid from './MobileGrid';
import _ from 'lodash';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    ListProps,
    useMediaQuery,
} from '@material-ui/core';
import {
    ShiftListing,
    Vendor,
    PayOrderManagement,
    Invoice as InvoiceItem,
    Manager,
} from '../types';
import { DATE_FORMAT7 } from '../constants';
import { useEffect } from 'react';
import Aside from './Aside';
import FullNameField from './FullNameField';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import EmptyComponent from '../invoices/EmptyComponent';
import ChangePassword from '../dashboard/ChangePassword';
import DeactivateManagerButton from './DeactivateManagerButton';
import FullCompanyNameField from './FullCompanyNameField';
import OpenPdfFromLinkButton from '../components/OpenPdfFromLinkButton';

export const styles: Styles<Theme, any> = {
    vendor_name: { display: 'inline-block' },
    email: { width: 544 },
    contact: { display: 'inline-block', marginLeft: 32, width: 544 },
    address: { width: 544 },
    image: { display: 'inline-block', width: 544 },
    doc: { display: 'block', width: 544 },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
};

const CustomNumberField: FC<{
    record: any;
    label: string;
    source: string;
}> = ({ record, source }) => {
    if (record) {
        return (
            <div style={{ fontSize: 14 }}>
                {parseFloat(record[source]).toFixed(2)}
            </div>
        );
    } else {
        return <div></div>;
    }
};

const useStyles = makeStyles(styles);

const VendorEditToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

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
                <GetShiftStatusText record={record} label="Status" />
                {/* <TextField source="status" label="Status" /> */}
            </Datagrid>
        );
    }
};

const ManagersList: FC<FieldProps<Manager>> = props => {
    return (
        <Datagrid optimized>
            <TextField source="id" label="Manager Id" />
            <TextField source="name" label="Name" />
            <TextField source="email" label="Email" />
            <TextField source="contact" label="Contact No" />
            <DeactivateManagerButton record={props} />
        </Datagrid>
    );
};

const VenuesList: FC<FieldProps<Manager>> = props => {
    return (
        <Datagrid optimized>
            <TextField source="id" label="Venue Id" />
            <TextField source="name" label="Name" />
            <TextField source="address" label="Address" />
            <TextField source="contact" label="Contact No" />
        </Datagrid>
    );
};

const PurchaseOrderList: FC<FieldProps<PayOrderManagement>> = props => {
    return (
        <Datagrid optimized>
            <TextField source="id" label="ID" />
            <TextField source="company" label="Company Name" />
            <TextField source="venue.name" label="Venue Name" />
            <NumberField source="payorder" label="Purchase Order" />
            <NumberField source="amount" label="Amount" />
            <FileField
                className="po_class"
                title="Download PO"
                label="PO Document"
                target="_blank"
                source="payorder_doc"
                download={true}
            />
        </Datagrid>
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

const downloadFiles = (url: string, fileName: string) => {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        };
        xhr.send();
    } catch (exception) {
        console.log({ pdfFilesDownloadException: exception });
    }
};

const DownloadPdfButton = (props: any) => {
    if (
        _.has(props, 'record') &&
        _.has(props.record, 'payorder_doc') &&
        !_.isUndefined(props.record.payorder_doc) &&
        !_.isNil(props.record.payorder_doc) &&
        !_.isEqual(props.record.payorder_doc, 'false')
    ) {
        let url = props.record.payorder_doc;
        const lastDot = url.lastIndexOf('.');
        const ext = url.substring(lastDot + 1);

        if (_.isEqual(ext, 'pdf')) {
            return (
                <a
                    href={url}
                    title="Presentation"
                    target="_blank"
                    download
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    Download PO
                </a>
            );
        }
    }
    return <div />;
};

const DownloadInvoicePdfButton = (props: any) => {
    try {
        {
            if (_.has(props, 'record') && _.has(props.record, 'pdf')) {
                return (
                    <OpenPdfFromLinkButton
                        record={props.record}
                        text={'Download Invoice'}
                        isInVoice={true}
                    />
                );
            }
        }
    } catch (e) {
        console.log({ vendorEditDownloadInvoicePdfButtonException: e });
    }

    return <div />;
};

const PayOrdersListItem: FC<FieldProps<PayOrderManagement>> = ({ record }) => {
    useEffect(() => {
        // Update the document title using the browser API
        const elements = document.getElementsByClassName('po_class');

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const a = element.getElementsByTagName('a');
            element.addEventListener('click', function (event) {
                event.preventDefault();
                downloadFiles(a[0].href, a[0].href);
            });
        }
    });

    const array = record || {};

    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <Datagrid optimized>
                <TextField source="id" label="ID" />
                <DateField source="createdAt" label="Date" />
                <TextField source="company" label="Company Name" />
                <TextField source="venue.name" label="Venue Name" />
                <NumberField source="payorder" label="Pay Order" />
                <NumberField source="amount" label="Amount" />
                {/* <FileField
                    className="po_class"
                    title="Download PO"
                    label="PO Document"
                    target="_blank"
                    source="payorder_doc"
                    download={true}
                /> */}
                <DownloadPdfButton />
            </Datagrid>
        );
    }
};

// for role array in invoices list
const TextArrayField: FC<FieldProps<InvoiceItem>> = ({ record }) => {
    const array = record?.role;
    if (typeof array === 'undefined' || array === null || array.length === 0) {
        return <div />;
    } else {
        return (
            <>
                {array.map((item: any) => (
                    <Chip label={item} key={item} />
                ))}
            </>
        );
    }
};
TextArrayField.defaultProps = { addLabel: true };

const RenderMarkAsPaidButton = (data: any) => {
    if (typeof data.record === 'undefined' || data.record === null) {
        return <div />;
    } else {
        return <MarkAsPaidButton record={data.record} />;
    }
};

const InvoicesListItem: FC<FieldProps<InvoiceItem>> = ({ record }) => {
    const array = record || {};

    if (typeof array === 'undefined' || array === null) {
        return <div />;
    } else {
        return (
            <Datagrid optimized>
                <TextField source="id" label="Invoice ID" />
                <DateField source="date" />
                <TextField source="company.name" label="Company Name" />
                <TextArrayField source="role">
                    <SingleFieldList>
                        <ChipField source="id" size="small" />
                    </SingleFieldList>
                </TextArrayField>
                <CustomNumberField
                    source="total_hours"
                    record={record}
                    label="Total Hours"
                />
                <CustomNumberField
                    source="total_amount"
                    record={record}
                    label="Total Amount"
                />
                <TextField source="total_amount" label="Total Amount" />
                <BooleanField source="is_paid" label="Paid" />
                {/* {!_.isNil(record) && (
                    <OpenPdfFromLinkButton
                        record={record}
                        label={'Download Invoice'}
                    />
                )} */}
                <DownloadInvoicePdfButton
                    record={record}
                    // label={'Download Invoice'}
                />
                <RenderMarkAsPaidButton data={record} />
            </Datagrid>
        );
    }
};

const ManagerList: FC<ListProps> = props => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
            </Datagrid>
        </List>
    );
};

const VendorEdit: FC<EditProps> = props => {
    const classes = useStyles(props);
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Client Edited Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Edit title={<VendorTitle />} {...props} undoable={false}>
            <TabbedShowLayout>
                <Tab label="Client Details">
                    <Edit
                        {...props}
                        undoable={false}
                        onSuccess={() => onSuccess()}
                        title={' '}
                    >
                        <SimpleForm toolbar={<VendorEditToolbar />}>
                            <Typography variant="h6" gutterBottom>
                                Super User Details
                            </Typography>

                            <TextInput
                                autoFocus
                                source="name"
                                formClassName={classes.vendor_name}
                                validate={[required(), validateName]}
                            />
                            <TextInput
                                source="contact"
                                formClassName={classes.contact}
                                validate={[required(), validateContactNum]}
                            />
                            <TextInput
                                type="email"
                                source="email"
                                fullWidth
                                formClassName={classes.email}
                            />
                            <ImageInput
                                source="avatar"
                                formClassName={classes.image}
                                label="Image"
                                accept="image/png,image/jpeg,image/jpg"
                            >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                            <span className={classes.dimensionsNote}>
                                Note: Recommended dimensions: 140 * 140 pixels
                            </span>

                            <Separator />
                            <Separator />
                            {/* company details */}
                            <Typography variant="h6" gutterBottom>
                                Company Details
                            </Typography>
                            <TextInput
                                source="company.name"
                                formClassName={classes.vendor_name}
                                validate={[required(), validateCompanyName]}
                            />
                            <TextInput
                                source="company.vat_number"
                                formClassName={classes.contact}
                                disabled
                            />
                            <TextInput
                                source="company.address"
                                formClassName={classes.address}
                                multiline={true}
                                fullWidth
                                helperText={false}
                                validate={required()}
                            />
                            <ImageInput
                                source="company.image"
                                formClassName={classes.image}
                                label="Image"
                                accept="image/png,image/jpeg,image/jpg"
                            >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                            <span className={classes.dimensionsNote}>
                                Note: Recommended dimensions: 140 * 140 pixels
                            </span>

                            <FileInput
                                source="company.tob"
                                label="TOB Document(Terms Of Business)"
                                accept="application/pdf"
                                formClassName={classes.doc}
                            >
                                <FileField source="src" title="TOB Document" />
                            </FileInput>
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
                </Tab>
                <Tab label="Purchase Orders">
                    <ReferenceArrayField
                        label="Purchase Orders"
                        reference="payorders"
                        source="pay_orders"
                    >
                        <PayOrdersListItem />
                    </ReferenceArrayField>
                </Tab>
                <Tab label="Invoices">
                    <ReferenceArrayField
                        label="Invoices"
                        reference="invoices"
                        source="invoices_id"
                    >
                        <InvoicesListItem />
                    </ReferenceArrayField>
                </Tab>
                <Tab label="Managers">
                    <ArrayField label="Managers" source="managers">
                        <ManagersList />
                    </ArrayField>
                </Tab>
                <Tab label="Venues">
                    <ArrayField label="Venues" source="venues">
                        <VenuesList />
                    </ArrayField>
                </Tab>
            </TabbedShowLayout>
        </Edit>
    );
};

const VendorTitle: FC<FieldProps<Vendor>> = ({ record }) => {
    // return record ? <FullNameField record={record} size="32" /> : null;
    return record ? <FullCompanyNameField record={record} size="32" /> : null;
};

/* name validation */
const validateName = regex(
    /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
    'Please provide a valid name'
);

/* contact number validation */
const validateContactNum = regex(
    /^(?:\+971)\d{9}$/,
    'Please provide a valid contact no.'
);

/* company name validation */
const validateCompanyName = regex(
    /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @&$-_,]*)?$/,
    'Please provide a valid Company name'
);

/* address validation */
const validateAddress = regex(
    /^[a-zA-Z0-9\s,'-]*$/,
    'Please provide a valid Address'
);

const Separator = () => <Box pt="1em" />;

export default VendorEdit;
