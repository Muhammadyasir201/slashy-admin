import * as React from 'react';
import { FC } from 'react';
import { Link, FieldProps } from 'react-admin';

import FullNameField from './FullNameField';
import { Staff } from '../types';

const StaffLinkField: FC<FieldProps<Staff>> = props =>
    props.record ? (
        <Link to={`/staffs/${props.record.id}`}>
            <FullNameField {...props} />
        </Link>
    ) : null;

StaffLinkField.defaultProps = {
    source: 'staff_id',
    addLabel: true,
};

export default StaffLinkField;
