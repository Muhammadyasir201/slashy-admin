import * as React from 'react';
import { FC } from 'react';
import { Link, FieldProps } from 'react-admin';

import FullNameField from './FullNameField';
import { Vendor } from '../types';

const VendorLinkField: FC<FieldProps<Vendor>> = props =>
    props.record ? (
        <Link to={`/vendors/${props.record.id}`}>
            {/* <FullNameField {...props} /> */}
        </Link>
    ) : null;

VendorLinkField.defaultProps = {
    source: 'vendor_id',
    addLabel: true,
};

export default VendorLinkField;
