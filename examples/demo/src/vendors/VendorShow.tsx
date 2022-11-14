import * as React from 'react';
import { FC } from 'react';
import {
    ShowProps,
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    ImageField,
    ArrayField,
    SimpleFormIterator,
    EmailField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    DateField,
    UrlField,
    Datagrid,
    SelectField,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from './Aside';
import FullNameField from './FullNameField';
import { ShiftListing } from '../types';

const sexChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
];

const VendorShow: FC<ShowProps> = props => {
    return (
        <Show
            title="Staff Listing"
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <SimpleShowLayout>
                <Typography variant="h6" gutterBottom>
                    Company Details
                </Typography>
                <TextField source="company.name" label="Company Name" />
                <TextField source="company.address" label="Address" />
                <NumberField source="company.vat_number" label="VAT Number" />
                <ImageField source="company.image" label="Image" />

                <Typography variant="h6" gutterBottom>
                    Super User Details
                </Typography>
                <NumberField source="id" label="Super User ID" />
                <TextField source="name" label="Super User Name" />
                <EmailField source="email" label="Email Address" />
                <NumberField source="contact" label="Contact Number" />
                <ImageField source="avatar" label="Image" />
            </SimpleShowLayout>
        </Show>
    );
};

export default VendorShow;
