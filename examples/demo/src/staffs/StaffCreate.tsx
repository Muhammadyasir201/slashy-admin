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
    regex,
    BulkActionProps,
    useNotify,
    useRedirect,
    BooleanInput,
    FileInput,
    FileField,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { ReferenceArrayInput } from 'react-admin';
import { AnyObject, useFormState } from 'react-final-form';

const sexChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
];

export const styles: Styles<Theme, any> = {
    block: { display: 'block' },
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
    doc_terms_of_business: {
        display: 'inline-block',
        width: '300px',
        marginLeft: 30,
        marginRight: 30,
    },
    doc_expiry: { display: 'inline-block', marginLeft: 32, marginRight: 32 },
    pdfDoc: {},
};
const useStyles = makeStyles(styles);

const ExperienceEndDate = (props: any) => {
    const { values } = useFormState();

    const targetExperience = values.experience[props.source.replace(/\D/g, '')];

    if (targetExperience && targetExperience.is_present) {
        return <></>;
    }

    return <DateInput source="end_date" />;
};

const StaffCreate: FC<CreateProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Staff Created Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Create {...props} onSuccess={onSuccess}>
            <SimpleForm>
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
                    validation={{ email: true }}
                    formClassName={classes.email}
                    fullWidth
                    validate={[
                        required(),
                        email('Please provide a valid email'),
                    ]}
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
                    label="Image"
                    accept="image/png,image/jpeg,image/jpg"
                    formClassName={classes.image}
                    validate={required()}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <span className={classes.dimensionsNote}>
                    Note: Recommended dimensions: 360 * 210 pixels
                </span>

                <Separator />
                <Typography variant="h6" gutterBottom>
                    Address
                </Typography>
                <TextInput
                    // validate={validateAddress}
                    source="address"
                    formClassName={classes.address}
                    multiline
                    fullWidth
                    helperText={false}
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
                    validate={requiredValidate}
                >
                    <SelectArrayInput
                        optionText="display_name"
                        optionValue="id"
                        formClassName={classes.certified_roles}
                    />
                </ReferenceArrayInput>

                <Typography variant="h6" gutterBottom>
                    Experience
                </Typography>

                <ArrayInput source="experience">
                    <SimpleFormIterator>
                        <TextInput
                            source="title"
                            formClassName={classes.role}
                            validate={[required(), validateRoleName]}
                        />
                        <TextInput
                            source="company"
                            formClassName={classes.company_name}
                            validate={[required(), validateCompanyName]}
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
                                // val === 'current' ? true : false
                                val === true ? true : false
                            }
                            parse={(val: any) => {
                                return val === true ? true : false;
                                // return val ? 'current' : false;
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
                            <FileField source="src" title="Document" />
                        </FileInput>
                    </SimpleFormIterator>
                </ArrayInput>
                <Separator />
            </SimpleForm>
        </Create>
    );
};

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

export default StaffCreate;
