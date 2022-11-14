import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    EditButton,
    EmailField,
    FieldProps,
    FileField,
    Filter,
    FilterProps,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    TextField,
    UrlField,
} from 'react-admin';
import _ from 'lodash';
import { useMediaQuery, Theme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StaffLinkField from './VendorLinkField';
import MobileGrid from './MobileGrid';
import VendorListAside from './VendorListAside';
import { ReactElement } from 'react';
import { PayOrderManagement } from '../types';
import { FC } from 'react';
import { useEffect } from 'react';

const downloadFiles = (url: string, fileName: string) => {
    // url = 'https://cors-anywhere.herokuapp.com/' + url; //todo
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        };
        xhr.send();
    } catch (exception) {
        console.log({ pdfFilesDownloadException: exception });
    }
};

const PayOrderFilter = (props: Omit<FilterProps, 'children'>) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" defaultValue />
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

const DownloadPdfButton = (props: any) => {
    if (
        _.has(props, 'record') &&
        _.has(props.record, 'payorder_doc') &&
        !_.isUndefined(props.record.payorder_doc) &&
        !_.isNil(props.record.payorder_doc) &&
        !_.isEqual(props.record.payorder_doc, 'false')
    ) {
        let url = props.record.payorder_doc;
        const lastDot = url.lastIndexOf('.');
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
                    Download PO
                </a>
            );
        }
    }
    return <div />;
};

const PayOrderList = (props: ListProps): ReactElement => {
    useEffect(() => {
        // Update the document title using the browser API
        const elements = document.getElementsByClassName('po_class');

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const a = element.getElementsByTagName('a');
            element.addEventListener('click', function (event) {
                event.preventDefault();
                downloadFiles(a[0].href, a[0].href);
            });
        }
    });
    const classes = useStyles();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            // filters={<PayOrderFilter />}
            // sort={{ field: 'last_seen', order: 'DESC' }}
            pagination={false}
            exporter={false}
            bulkActionButtons={false}
            // aside={<VendorListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized>
                    <TextField source="id" label="ID" />
                    <DateField source="createdAt" label="Date" />
                    <TextField source="company" label="Company Name" />
                    <TextField source="venue.name" label="Venue Name" />
                    <NumberField source="payorder" label="Purchase Order" />
                    <NumberField source="amount" label="Amount" />
                    {/* <FileField
                        className="po_class"
                        title="Download PO"
                        label="PO Document"
                        target="_blank"
                        source="payorder_doc"
                        download={true}
                    /> */}
                    <DownloadPdfButton />
                </Datagrid>
            )}
        </List>
    );
};

export default PayOrderList;
