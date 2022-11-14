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
    BooleanField,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from './Aside';
import FullNameField from './FullNameField';
import { ShiftListing } from '../types';

const InvoiceShow: FC<ShowProps> = props => {
    return (
        <Show
            title="Invoice Listing"
            // aside={<Aside />}
            component="div"
            {...props}
        >
            <SimpleShowLayout>
                <TextField source="id" label="Invoice ID" />
                <TextField source="venue_name" label="Venue Name" />
                <TextField source="total_workers" label="Total Workers" />
                <TextField source="total_workers" label="Total Workers" />
                <TextField source="total_hours" label="Total Hours" />
                <BooleanField source="is_paid" label="Paid" />
            </SimpleShowLayout>
        </Show>
    );
};

// const ShiftListingTitle: FC<FieldProps<ShiftListing>> = ({ record }) =>
//     record ? <FullNameField record={record} size="32" /> : null;

// const ShiftListingForm = (props: any) => {
//     const translate = useTranslate();

//     return (

//             {...props}
//                 <Card>
//                     <form>
//                         <CardContent>
//                             <Box display={{ md: 'block', lg: 'flex' }}>
//                                 <Box flex={2} mr={{ md: 0, lg: '1em' }}>
//                                     <Typography variant="h6" gutterBottom>
//                                         Company Details
//                                     </Typography>
//                                     <Box display={{ xs: 'block', sm: 'flex' }}>
//                                         <TextInput
//                                             source="company.name"
//                                             validate={requiredValidate}
//                                             fullWidth
//                                         />
//                                         <TextInput
//                                             source="company.address"
//                                             multiline
//                                             fullWidth
//                                             helperText={false}
//                                             validate={requiredValidate}
//                                         />

//                                         <NumberInput
//                                             source="company.vat_number"
//                                             disabled
//                                         />
//                                         <ImageInput
//                                             source="company.image"
//                                             label="Image"
//                                             accept="image/*"
//                                         >
//                                             <ImageField
//                                                 source="src"
//                                                 title="title"
//                                             />
//                                         </ImageInput>
//                                     </Box>

//                                     <Typography variant="h6" gutterBottom>
//                                         ShiftListing Details
//                                     </Typography>
//                                     <Box display={{ xs: 'block', sm: 'flex' }}>
//                                         <TextInput
//                                             autoFocus
//                                             source="name"
//                                             validate={requiredValidate}
//                                         />
//                                         <TextInput
//                                             type="email"
//                                             source="email"
//                                             fullWidth
//                                             disabled
//                                         />
//                                         <TextInput
//                                             source="contact"
//                                             validate={requiredValidate}
//                                         />
//                                         <ImageInput
//                                             source="avatar"
//                                             label="Avatar"
//                                             accept="image/*"
//                                         >
//                                             <ImageField
//                                                 source="src"
//                                                 title="title"
//                                             />
//                                         </ImageInput>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </CardContent>
//                         <Toolbar
//                             record={formProps.record}
//                             basePath={formProps.basePath}
//                             undoable={true}
//                             invalid={formProps.invalid}
//                             handleSubmit={formProps.handleSubmit}
//                             saving={formProps.saving}
//                             resource="ShiftListings"
//                         />
//                     </form>
//                 </Card>

//         />
//     );
// };

export default InvoiceShow;
