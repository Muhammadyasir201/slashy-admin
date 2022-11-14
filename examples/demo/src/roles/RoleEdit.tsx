import * as React from 'react';
import { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditProps,
    EditButton,
    FieldProps,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    TextField,
    useTranslate,
    ImageField,
    ImageInput,
    SaveButton,
    required,
    useNotify,
    useRedirect,
    regex,
    useRefresh,
    ReferenceArrayInput,
    SelectArrayInput,
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import StaffRefField from '../staffs/StaffReferenceField';
import { Role } from '../types';
import StaffReferenceField from '../staffs/StaffReferenceField';
import AvatarField from '../staffs/AvatarField';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

const RoleTitle: FC<FieldProps<Role>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.roles.name', { smart_count: 1 })} &quot;
            {record.display_name}&quot;
        </span>
    ) : null;
};

// const RoleEditToolbar = (props: any) => (
//     <Toolbar {...props}>
//         <SaveButton />
//     </Toolbar>
// );

export const styles: Styles<Theme, any> = theme => ({
    role_id: { display: 'inline-block' },
    role_name: {
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
    industry: { display: 'inline-block', marginLeft: 32, width: 544 },
    dimensionsNote: { fontSize: 12, fontStyle: 'italic', color: 'red' },
});

const useStyles = makeStyles(styles);

const RoleEdit: FC<EditProps> = props => {
    const classes = useStyles(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Roles Edited Successfully'); // default message is 'ra.notification.updated'
        redirect('list', props.basePath);
    };
    return (
        <Edit
            title={<RoleTitle />}
            {...props}
            undoable={false}
            onSuccess={onSuccess}
        >
            <SimpleForm>
                <Typography variant="h6" gutterBottom>
                    Industry
                </Typography>
                <ReferenceArrayInput source="category_id" reference="category">
                    <SelectArrayInput
                        optionText="name"
                        optionValue="id"
                        formClassName={classes.industry}
                        validate={requiredValidate}
                    />
                </ReferenceArrayInput>

                <Typography variant="h6" gutterBottom>
                    Role Details
                </Typography>
                <TextInput
                    source="id"
                    disabled
                    formClassName={classes.role_id}
                />
                <TextInput
                    source="display_name"
                    label="Role Name"
                    formClassName={classes.role_name}
                    validate={[required(), validateName]}
                />

                <ImageInput
                    source="image"
                    label="Role Image"
                    formClassName={classes.image}
                    accept="image/png,image/jpeg,image/jpg"
                    validate={requiredValidate}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <span className={classes.dimensionsNote}>
                    Note: Recommended dimensions: 60 * 60 pixels
                </span>
                {/* <ReferenceManyField
                reference="staffs"
                target="role_id"
                label="Staffs"
                perPage={20}
                fullWidth
            >
                <Datagrid>
                    <AvatarField />
                    <StaffReferenceField source="reference" />
                    <TextField source="name" />
                    <TextField source="email" />
                    <NumberField source="contact" />
                    <TextField source="noc_pass_visa_expdate" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField> */}
            </SimpleForm>
        </Edit>
    );
};

const requiredValidate = [required()];

/* name validation */
const validateName = regex(/[a-zA-Z\/]+/, 'Please provide valid name');

export default RoleEdit;
