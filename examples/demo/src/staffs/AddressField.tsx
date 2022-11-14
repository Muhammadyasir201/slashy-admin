import * as React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';
import { Staff } from '../types';

const AddressField: FC<FieldProps<Staff>> = ({ record }) =>
    record ? <span>{record.address}</span> : null;

export default AddressField;
