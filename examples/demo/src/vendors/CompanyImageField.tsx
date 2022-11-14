import * as React from 'react';
import { FC } from 'react';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import { FieldProps } from 'react-admin';
import { Vendor } from '../types';

interface Props extends FieldProps<Vendor> {
    className?: string;
    size?: string;
}

function getUserImage(record: any) {
    console.log({ ali: record });

    let data = '';
    if (_.has(record, 'company')) {
        data = record.company.image.src || record.company.image;
    }
    return data;
}

const CompanyImageField: FC<Props> = ({ record, size = '25', className }) =>
    record ? (
        <Avatar
            src={`${getUserImage(record)}?size=${size}x${size}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;

export default CompanyImageField;
