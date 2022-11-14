// in src/comments.js
import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import {
    DateField,
    EditButton,
    useTranslate,
    NumberField,
    Identifier,
    TextField,
    BooleanField,
} from 'react-admin';

import AvatarField from './AvatarField';

import { PayRolls } from '../types';
import MarkAsPaidButton from './PaidButton';

const useStyles = makeStyles(theme => ({
    root: { margin: '1em' },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: {
        ...theme.typography.body1,
        display: 'flex',
        flexDirection: 'column',
    },
}));

interface Props {
    ids?: Identifier[];
    data?: { [key: string]: PayRolls };
    basePath?: string;
}

const MobileGrid: FC<Props> = ({ ids, data, basePath }, record: any) => {
    const translate = useTranslate();
    const classes = useStyles();

    if (!ids || !data) {
        return null;
    }

    return (
        <div className={classes.root}>
            {ids.map(id => (
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>Payroll Details</h2>
                            </div>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            Staff Count &nbsp;:&nbsp;
                            <TextField record={data[id]} source="staff" />
                        </div>

                        <div>
                            Working Hours &nbsp;:&nbsp;
                            <TextField
                                record={data[id]}
                                source="hours_worked"
                            />
                        </div>

                        <div>
                            Amount &nbsp;:&nbsp;
                            <TextField record={data[id]} source="amount" />
                        </div>

                        <div>
                            Paid &nbsp;:&nbsp;
                            <BooleanField record={data[id]} source="is_paid" />
                            <MarkAsPaidButton record={data[id]} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
