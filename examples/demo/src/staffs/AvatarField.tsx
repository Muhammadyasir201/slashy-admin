import * as React from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import { FieldProps } from 'react-admin';
import { Staff } from '../types';
import { RoundedCornerRounded } from '@material-ui/icons';

interface Props extends FieldProps<Staff> {
    className?: string;
    size?: string;
}

function getUserImage(record: any) {
    let data = '';
    if (_.has(record, 'avatar') && _.has(record?.avatar, 'src')) {
        data = record?.avatar?.src;
    } else if (_.has(record, 'avatar')) {
        data = record?.avatar;
    }
    return data;
}

const AvatarField: FC<Props> = ({ record, size = '25', className }) => {
    return record ? (
        <Avatar
            src={`${getUserImage(record)}?size=${size}x${size}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;
};

export default AvatarField;
