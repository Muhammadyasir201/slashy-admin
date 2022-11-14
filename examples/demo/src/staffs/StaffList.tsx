import * as React from 'react';
import {
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    EditButton,
    EmailField,
    Filter,
    FilterProps,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ArrayField,
    ReferenceArrayField,
    ReferenceField,
    SearchInput,
    SelectField,
    SingleFieldList,
    TextField,
} from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StaffLinkField from './StaffLinkField';
import MobileGrid from './MobileGrid';
import StaffListAside from './StaffListAside';
import { ReactElement } from 'react';
import DeactivateStaffBtn from './DeactivateBtn';
import ActivateStaffBtn from './ActivateBtn';

const StaffFilter = (props: Omit<FilterProps, 'children'>) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn reference="staffs" />
        {/* <DateInput source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" defaultValue /> */}
    </Filter>
);

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const StaffList = (props: ListProps, record: any): ReactElement => {
    const classes = useStyles();

    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={<StaffFilter />}
            // sort={{ field: 'last_seen', order: 'DESC' }}
            bulkActionButtons={false}
            // pagination={false}
            exporter={false}
            // aside={<StaffListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized>
                    <TextField label="Staff ID" source="id" />
                    <StaffLinkField />
                    <TextField label="Nick Name" source="name" />
                    <EmailField source="email" label="Email Address" />

                    <ArrayField label="Roles" source="role_id">
                        <SingleFieldList linkType={false}>
                            <ChipField source="display_name" size="small" />
                        </SingleFieldList>
                    </ArrayField>

                    <NumberField source="contact" label="Phone Number" />
                    <EditButton />
                    {/* <DeleteButton undoable={false} /> */}
                </Datagrid>
            )}
        </List>
    );
};

export default StaffList;
