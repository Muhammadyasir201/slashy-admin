import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps } from 'react-admin';
import AvatarField from './AvatarField';
import { Staff } from '../types';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

interface Props extends FieldProps<Staff> {
    size?: string;
}

const FullNameField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {record.username}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'name',
    label: 'Staff',
};

export default memo<Props>(FullNameField);
