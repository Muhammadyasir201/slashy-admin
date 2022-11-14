import * as React from 'react';
import { FC } from 'react';
import axios from 'axios';
import {
    Create,
    CreateProps,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    required,
    email,
    ImageInput,
    SelectArrayInput,
    ReferenceInput,
    ImageField,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    ReferenceArrayInput,
    choices,
    useNotify,
    useRedirect,
    FileInput,
    FileField,
    regex,
    AutocompleteInput,
} from 'react-admin';
import { AnyObject, useFormState } from 'react-final-form';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { Vendor } from '../types';

export const styles: Styles<Theme, any> = theme => ({
    payorder: {
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    amount: {
        display: 'inline-block',
        marginLeft: 32,
        width: 544,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: 0,
        },
    },
    venue: {
        display: 'inline-block',
        marginLeft: 32,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: 0,
        },
    },
    doc: { display: 'block', width: 544 },
});

const useStyles = makeStyles(styles);

const VenuesInput = (props: any) => {
    const { values } = useFormState();

    if (values.id && props.choices) {
        const selectedVendor = props.choices.find(
            (vendor: any) => vendor.id === values.id
        );

        return (
            <SelectInput
                label="Select Venues"
                source="venue"
                choices={selectedVendor.venues}
                validate={required()}
            />
        );
    }

    return <SelectInput label="Select Venues" source="vendors" />;
};

const PayOrderCreate: FC<CreateProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Payorder Created Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Create {...props} onSuccess={onSuccess}>
            <SimpleForm>
                <Typography variant="h6" gutterBottom>
                    Purchase Order Details
                </Typography>
                <TextInput
                    source="payorder"
                    label="Payorder Number"
                    formClassName={classes.payorder}
                    validate={[required(), validatePayOrderNumber]}
                />
                <TextInput
                    source="amount"
                    formClassName={classes.amount}
                    validate={[required(), validateAmount]}
                />
                <FileInput
                    source="payorder_doc"
                    label="Payorder Document"
                    accept="application/pdf"
                    validate={required()}
                    formClassName={classes.doc}
                >
                    <FileField source="src" title="title" />
                </FileInput>

                <Separator />

                <Typography variant="h6" gutterBottom>
                    Client Details
                </Typography>

                <ReferenceInput
                    label="Select Client"
                    source="id"
                    reference="vendors"
                    formClassName={classes.payorder}
                    page={1}
                    perPage={1000}
                    filter={{ is_deleted: false }}
                >
                    <AutocompleteInput
                        optionText={(choice: Vendor) =>
                            choice.id && // the empty choice is { id: '' }
                            `${choice.company.name}`
                        }
                        validate={required()}
                    />
                </ReferenceInput>

                <ReferenceArrayInput
                    label="Select Venue"
                    source="venue_id"
                    reference="vendors"
                    formClassName={classes.venue}
                    page={1}
                    perPage={1000}
                    filter={{ is_deleted: false }}
                >
                    <VenuesInput />
                </ReferenceArrayInput>
            </SimpleForm>
        </Create>
    );
};

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

/* staff address validation */
const validatePayOrderNumber = regex(
    /^\+?(0|[1-9]\d*)$/,
    'Please provide a valid Number'
);

/* staff address validation */
const validateAmount = regex(
    /^\+?(0|[1-9]\d*)$/,
    'Please provide a valid Number'
);

const Separator = () => <Box pt="1em" />;

export default PayOrderCreate;
