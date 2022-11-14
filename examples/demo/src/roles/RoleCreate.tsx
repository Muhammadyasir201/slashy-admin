import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    CreateProps,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    ImageInput,
    ImageField,
    useNotify,
    useRedirect,
    SelectArrayInput,
    regex,
} from 'react-admin';
import { AnyObject } from 'react-final-form';
import { Typography, Box } from '@material-ui/core';
import { ReferenceArrayInput } from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = theme => ({
    role_name: {
        display: 'block',
        width: 544,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: 0,
        },
    },
    image: {
        width: 544,
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    industry: { display: 'inline-block', marginLeft: 32, width: 544 },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
});
const useStyles = makeStyles(styles);

const RoleCreate: FC<CreateProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Role Created Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };

    return (
        <Create {...props} onSuccess={onSuccess}>
            <SimpleForm>
                <Typography variant="h6" gutterBottom>
                    Industry
                </Typography>
                <ReferenceArrayInput
                    source="category"
                    reference="category"
                    validate={requiredValidate}
                >
                    <SelectArrayInput
                        optionText="name"
                        optionValue="id"
                        formClassName={classes.industry}
                    />
                </ReferenceArrayInput>

                <Typography variant="h6" gutterBottom>
                    Role Details
                </Typography>
                <Separator />
                <TextInput
                    autoFocus
                    label="Role Name"
                    source="display_name"
                    formClassName={classes.role_name}
                    validate={[required(), validateName]}
                />

                <ImageInput
                    source="image"
                    formClassName={classes.image}
                    label="Role Image"
                    accept="image/png,image/jpeg,image/jpg"
                    validate={requiredValidate}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <span className={classes.dimensionsNote}>
                    Note: Recommended dimensions: 60 * 60 pixels
                </span>
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

/* name validation */
const validateName = regex(/[a-zA-Z\/]+/, 'Please provide valid name');

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default RoleCreate;
