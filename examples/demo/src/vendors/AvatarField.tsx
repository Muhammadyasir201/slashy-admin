import * as React from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import { FieldProps } from 'react-admin';
import { Vendor } from '../types';

interface Props extends FieldProps<Vendor> {
    className?: string;
    size?: string;
}

function getUserImage(record: any) {
    let data = '';
    if (_.has(record, 'company')) {
        data = record.company.image.src || record.avatar;
    }
    return data;
}

const AvatarField: FC<Props> = ({ record, size = '25', className }) =>
    record ? (
        <Avatar
            src={`${getUserImage(record)}?size=${size}x${size}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;

export default AvatarField;
