import * as React from 'react';
import { FC } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Edit,
    EditProps,
    FieldProps,
    SimpleForm,
    TextInput,
    useTranslate,
    ImageField,
    ImageInput,
    required,
    useNotify,
    useRedirect,
    regex,
} from 'react-admin';

import { Styles } from '@material-ui/styles/withStyles';
import { Industry } from '../types';

const IndustryTitle: FC<FieldProps<Industry>> = ({ record }) => {
    const translate = useTranslate();
    return record ? <span>{record.name}</span> : null;
};

export const styles: Styles<Theme, any> = theme => ({
    industry_id: { display: 'inline-block' },
    industry_name: {
        display: 'inline-block',
        marginLeft: 32,
        width: 544,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: 0,
        },
    },
    image: {
        width: 544,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
});

const useStyles = makeStyles(styles);

const IndustryEdit: FC<EditProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Industry Edited Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };
    return (
        <Edit
            title={<IndustryTitle />}
            {...props}
            undoable={false}
            onSuccess={onSuccess}
        >
            <SimpleForm>
                <Typography variant="h6" gutterBottom>
                    Industry Details
                </Typography>
                <TextInput
                    source="id"
                    disabled
                    formClassName={classes.industry_id}
                />
                <TextInput
                    source="name"
                    label="Industry Name"
                    formClassName={classes.industry_name}
                    validate={[required(), validateName]}
                />

                <ImageInput
                    source="image"
                    label="Industry Image"
                    formClassName={classes.image}
                    accept="image/png,image/jpeg,image/jpg"
                    validate={requiredValidate}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <span className={classes.dimensionsNote}>
                    Note: Recommended dimensions: 60 * 60 pixels
                </span>
            </SimpleForm>
        </Edit>
    );
};

const requiredValidate = [required()];

/* name validation */
const validateName = regex(/[a-zA-Z\/]+/, 'Please provide valid name');

export default IndustryEdit;
