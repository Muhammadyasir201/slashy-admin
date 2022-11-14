import * as React from 'react';
import { Fragment } from 'react';
import _ from 'lodash';
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
    ListActions,
    ArrayField,
    ChipField,
    SingleFieldList,
    FieldProps,
    BulkActionProps,
} from 'react-admin';
import { useMediaQuery, Theme, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ReactElement } from 'react';
import InvoiceShow from './InvoiceShow';
import { Invoice, Vendor } from '../types';
import EmptyComponent from './EmptyComponent';
import MobileGrid from './MobileGrid';
import MarkAsPaidButton from './PaidButton';
import { FC } from 'react';
import OpenPdfFromLinkButton from '../components/OpenPdfFromLinkButton';

const InvoicesFilter = (props: Omit<FilterProps, 'children'>) => {
    return (
        <Filter {...props}>
            <ReferenceInput
                source="vendor"
                label="Super User"
                reference="vendors"
                alwaysOn
                allowEmpty={false}
                perPage={2000}
            >
                <SelectInput
                    source="vendors"
                    optionText="company.name"
                    optionValue="id"
                    allowEmpty={false}
                />
            </ReferenceInput>
        </Filter>
    );
};

const SendInvoiceReminder = (props: BulkActionProps) => <Fragment></Fragment>;

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

// for role array in invoices list
const TextArrayField: FC<FieldProps<Invoice>> = ({ record }) => {
    const array = record?.role;
    if (typeof array === 'undefined' || array === null || array.length === 0) {
        return <div />;
    } else {
        return (
            <>
                {array.map((item: any) => (
                    <Chip label={item} key={item} />
                ))}
            </>
        );
    }
};
TextArrayField.defaultProps = { addLabel: true };

const oldOneDownloadPdfButton = (props: any) => {
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
                            console.log({ e });
                            e.stopPropagation();
                        }}
                    >
                        Download Invoice
                    </a>
                );
            }
        }
    } catch (e) {
        console.log({ InvoiceListException: e });
    }

    return <div />;
};

const InvoiceList = (props: ListProps, record: any): ReactElement => {
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            actions={<ListActions hasCreate={false} />}
            empty={<EmptyComponent />}
            bulkActionButtons={false}
            // bulkActionButtons={<SendInvoiceReminder />}
            {...props}
            filters={<InvoicesFilter />}
            pagination={false}
            exporter={false}
            // aside={<VendorListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid
                    optimized
                    // expand={<InvoiceShow />}
                >
                    <TextField source="id" label="Invoice ID" />
                    <DateField source="date" />
                    <TextField source="company.name" label="Company Name" />
                    <TextArrayField source="role">
                        <SingleFieldList>
                            <ChipField source="id" size="small" />
                        </SingleFieldList>
                    </TextArrayField>
                    <TextField source="total_workers" label="Total Workers" />
                    <CustomNumberField
                        source="total_hours"
                        record={record}
                        label="Total Hours"
                    />
                    <CustomNumberField
                        source="total_amount"
                        record={record}
                        label="Total Amount"
                    />
                    <BooleanField source="is_paid" label="Paid" />
                    <OpenPdfFromLinkButton
                        record={record}
                        text="Download Invoice"
                        isInVoice={true}
                    />
                    {/* <DownloadPdfButton
                        record={record}
                        label={'Download Invoice'}
                    /> */}
                    <MarkAsPaidButton record={record} />
                </Datagrid>
            )}
        </List>
    );
};

export default InvoiceList;
