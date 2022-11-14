import * as React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';
import { Vendor } from '../types';

const AddressField: FC<FieldProps<Vendor>> = ({ record }) =>
    record ? <span>{record.address}</span> : null;

export default AddressField;
