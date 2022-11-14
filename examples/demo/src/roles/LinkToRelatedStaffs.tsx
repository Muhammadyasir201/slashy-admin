import * as React from 'react';
import { FC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate, FieldProps } from 'react-admin';
import { stringify } from 'query-string';

import staffs from '../staffs';
import { Role } from '../types';

const useStyles = makeStyles({
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
});

const LinkToRelatedStaffs: FC<FieldProps<Role>> = ({ record }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: '/staffs',
                search: stringify({
                    filter: JSON.stringify({ role_id: record.id }),
                }),
            }}
            className={classes.link}
        >
            <staffs.icon className={classes.icon} />
            {translate('resources.roles.fields.staffs')}
        </Button>
    ) : null;
};

export default LinkToRelatedStaffs;
