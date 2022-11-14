import * as React from 'react';
import {
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
    FileInput,
    List,
    ListProps,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    TextField,
    UrlField,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    required,
} from 'react-admin';
import _ from 'lodash';
import { useNotify } from 'ra-core';
import { useMediaQuery, Theme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VendorLinkField from './VendorLinkField';
import MobileGrid from './MobileGrid';
import VendorListAside from './VendorListAside';
import { ReactElement } from 'react';
import { Vendor, Staff, Company } from '../types';
import { FC } from 'react';
import FullCompanyNameField from './FullCompanyNameField';
import { useEffect } from 'react';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import { AnyObject, useFormState } from 'react-final-form';
import DeactivateClientButton from './DeactivateClientButton';

const downloadFiles = (url: string, fileName: string, notify: Function) => {
    var reg = /(.*?)\.(pdf)$/;
    if (!fileName.match(reg)) {
        notify('Invalid file', 'warning');
        return;
    } else {
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
    }
};

const VendorFilter = (props: Omit<FilterProps, 'children'>) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn reference="vendors" />

        <BooleanInput
            source="is_deleted"
            label="In Active"
            optionText="In Active"
            optionValue="is_deleted"
            allowEmpty={false}
            alwaysOn
        />
    </Filter>
);

const DownloadPdfButton = (props: any) => {
    try {
        if (
            _.has(props, 'record') &&
            _.has(props.record, 'company') &&
            _.has(props.record.company, 'tob') &&
            !_.isUndefined(props.record.company.tob) &&
            !_.isNil(props.record.company.tob) &&
            !_.isEqual(props.record.company.tob, 'false')
        ) {
            let url = props.record.company.tob;

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
                        Download TOB
                    </a>
                );
            }
        }
    } catch (e) {
        console.log({ vendorListException: e });
    }

    return <div />;
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

const VendorList = (props: ListProps, record: any): ReactElement => {
    const notify = useNotify();
    useEffect(() => {
        // Update the document title using the browser API
        const elements = document.getElementsByClassName('tob_class');

        for (let index = 0; index < elements.length - 1; index++) {
            const element = elements[index];
            const a = element.getElementsByTagName('a');
            element.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                downloadFiles(a[0].href, a[0].href, notify);
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
            filters={<VendorFilter />}
            // sort={{ field: 'last_seen', order: 'DESC' }}
            // pagination={false}
            exporter={false}
            bulkActionButtons={false}
            // aside={<VendorListAside />}
        >
            {isSmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <TextField source="id" label="Super User ID" />
                    <FullCompanyNameField label="Company Name" />
                    <VendorLinkField />
                    <TextField source="company.vat_number" label="VAT Number" />
                    {/* <FileField
                        className="tob_class"
                        title="Download TOB"
                        label="TOB Document"
                        target="_blank"
                        source="company.tob"
                        download={false}
                    /> */}

                    <DownloadPdfButton record={record.company} />
                    <EditButton />
                    <DeactivateClientButton record={record} />
                </Datagrid>
            )}
        </List>
    );
};

export default VendorList;
