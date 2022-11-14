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

const StaffShow: FC<ShowProps> = props => {
    return (
        <Show
            title="Staff Listing"
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <SimpleShowLayout>
                <NumberField source="id" label="Staff ID" />
                <TextField source="name" label="Staff Name" />
                <EmailField source="email" label="Email" />
                <TextField source="contact" label="Phone Number" />
                <TextField source="description" label="Description" />
                <ImageField source="avatar" label="Image" />
                <TextField source="address" label="Address" />

                <ReferenceArrayField reference="roles" source="role_id">
                    <Datagrid>
                        <TextField source="display_name" />
                    </Datagrid>
                </ReferenceArrayField>
                <ArrayField label="Experience" source="experience">
                    <Datagrid>
                        <TextField source="title" label="Role" />
                        <TextField source="company" label="Company" />

                        <DateField source="start_date" />
                        <DateField source="end_date" />
                    </Datagrid>
                </ArrayField>

                <SelectField source="gender" choices={sexChoices} />

                {/* <TextField
                    source="noc_pass_visa_info"
                    label="Passport/NOC/Visa Information"
                />

                <TextField
                    source="noc_pass_visa_expdate"
                    label="Passport/NOC/Visa Expiry Date"
                /> */}
            </SimpleShowLayout>
        </Show>
    );
};

export default StaffShow;
