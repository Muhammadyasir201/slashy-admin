import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps } from 'react-admin';
import { Vendor } from '../types';
import CompanyImageField from './CompanyImageField';

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

interface Props extends FieldProps<Vendor> {
    size?: string;
}

const FullCompanyNameField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <CompanyImageField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {record.company.name}
        </div>
    ) : null;
};

FullCompanyNameField.defaultProps = {
    source: 'name',
    label: 'Company',
};

export default memo<Props>(FullCompanyNameField);
