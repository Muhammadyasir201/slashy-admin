import * as React from 'react';
import { FC } from 'react';
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
    useNotify,
    useRedirect,
    regex,
    FileInput,
    FileField,
} from 'react-admin';
import { AnyObject } from 'react-final-form';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    vendor_name: { display: 'inline-block' },
    email: { width: 544 },
    contact: { display: 'inline-block', marginLeft: 32, width: 544 },
    address: { width: 544 },
    image: { display: 'inline-block', width: 544 },
    doc: { display: 'block', width: 544 },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
};

const useStyles = makeStyles(styles);

const VendorCreate: FC<CreateProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Super User Created Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Create {...props} onSuccess={onSuccess}>
            <SimpleForm>
                <Typography variant="h6" gutterBottom>
                    Client Details
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
                    validation={{ email: true }}
                    fullWidth
                    formClassName={classes.email}
                    validate={[
                        required(),
                        email('Please provide a valid email'),
                    ]}
                />
                <ImageInput
                    source="avatar"
                    label="Image"
                    accept="image/png,image/jpeg,image/jpg"
                    validate={required()}
                    formClassName={classes.image}
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
                    validate={[required(), validateVAT]}
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
                    validate={required()}
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
        </Create>
    );
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
    /^\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*/,
    'Please provide a valid Address'
);
/* VAT validation */
const validateVAT = regex(/^[A-Za-z0-9_-]*$/, 'Please provide valid VAT');

const Separator = () => <Box pt="1em" />;

export default VendorCreate;
