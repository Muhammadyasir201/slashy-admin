import * as React from 'react';
import { FC } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    EmailField,
    Filter,
    FilterProps,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    SearchInput,
    TextField,
    SelectInput,
    ReferenceArrayInput,
    choices,
    FunctionField,
    FieldProps,
} from 'react-admin';
import _ from 'lodash';
import { useMediaQuery, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ReactElement } from 'react';
import PayrollShow from './PayrollShow';
import { PayRolls, Vendor } from '../types';
import EmptyComponent from './EmptyComponent';
import MobileGrid from './MobileGrid';
import MarkAsPaidButton from './PaidButton';
import OpenPdfFromLinkButton from '../components/OpenPdfFromLinkButton';

const PayrollsFilter = (props: Omit<FilterProps, 'children'>) => {
    return (
        <Filter {...props}>
            {/* <ReferenceInput label="Vendors" source="id" reference="vendors">
                <SelectInput
                    optionText={(choice: Vendor) =>
                        choice.id && // the empty choice is { id: '' }
                        `${choice.name}`
                    }
                    optionValue="id"
                    allowEmpty={false}
                />
            </ReferenceInput> */}
            <ReferenceArrayInput
                source="vendor"
                label="Super User"
                reference="vendors"
            >
                <SelectInput
                    options={(choice: Vendor) =>
                        choice.id && // the empty choice is { id: '' }
                        `${choice.name}`
                    }
                    allowEmpty={false}
                    defaultValue={(choice: Vendor) =>
                        choice.id && // the empty choice is { id: '' }
                        `${choice.name}`
                    }
                />
            </ReferenceArrayInput>
        </Filter>
    );
};

const CustomNumberField: FC<{
    record: any;
    label: string;
    source: string;
}> = ({ record, source }) => {
    return (
        <div style={{ fontSize: 14 }}>
            {parseFloat(record[source]).toFixed(2)}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    nb_commands: { color: 'purple' },
    hiddenOnSmallScreens: {
        display: 'table-cell',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

const DownloadPdfButton01 = (props: any) => {
    try {
        if (_.has(props, 'record') && _.has(props.record, 'pdf')) {
            let url = props.record.pdf;

            const lastDot = _.has(url, 'src')
                ? url.src.lastIndexOf('.')
                : url.lastIndexOf('.');
            const ext = url.substring(lastDot + 1);

            if (_.isEqual(ext, 'pdf')) {
                return (
                    <a
                        href={url}
                        title="Presentation"
                        target="_blank"
                        download
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        Download Payslip
                    </a>
                );
            }
        }
    } catch (e) {
        console.log({ InvoiceListException: e });
    }

    return <div />;
};

const PayrollList = (props: ListProps, record: any): ReactElement => {
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            // empty={<EmptyComponent />}
            bulkActionButtons={false}
            {...props}
            // filters={<PayrollsFilter />}
            pagination={false}
            exporter={false}
            // aside={<VendorListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid
                    optimized
                    // expand={<PayrollShow />}
                >
                    <TextField source="id" label="Payroll ID" />
                    <DateField source="createdAt" label="Date" />
                    <TextField source="staff.name" label="Staff Name" />
                    <TextField source="company.name" label="Company Name" />
                    <TextField source="role.display_name" label="Role" />
                    <CustomNumberField
                        source="hours_worked"
                        record={record}
                        label="Working Hours"
                    />
                    <CustomNumberField
                        source="amount"
                        record={record}
                        label="Amount"
                    />
                    <BooleanField source="is_paid" label="Paid" />
                    <OpenPdfFromLinkButton
                        record={record}
                        text="Download Payslip"
                        isInVoice={false}
                    />
                    <MarkAsPaidButton record={record} />
                </Datagrid>
            )}
        </List>
    );
};

export default PayrollList;
