// import * as React from 'react';
// import { FC } from 'react';
// import { ReferenceField, ReferenceFieldProps } from 'react-admin';

// import FullNameField from './FullNameField';

// const StaffReferenceField: FC<
//     Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
//         source?: string;
//     }
// > = props => (
//     <ReferenceField source="staff_id" reference="staffs" {...props}>
//         <FullNameField />
//     </ReferenceField>
// );

// StaffReferenceField.defaultProps = {
//     source: 'staff_id',
//     addLabel: true,
// };

// export default StaffReferenceField;

import * as React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FieldProps } from 'react-admin';
import { Staff } from '../types';

const StaffReferenceField: FC<FieldProps<Staff>> = ({ record }) =>
    record ? <Link to={`staffs/${record.id}`}>{record.reference}</Link> : null;

StaffReferenceField.defaultProps = {
    source: 'id',
    label: 'Staff',
};

export default StaffReferenceField;
