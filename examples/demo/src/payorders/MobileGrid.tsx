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
} from 'react-admin';

import AvatarField from './AvatarField';

import { PayOrderManagement } from '../types';

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
    data?: { [key: string]: PayOrderManagement };
    basePath?: string;
}

const MobileGrid: FC<Props> = ({ ids, data, basePath }) => {
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
                                <h2>PayOrder Details</h2>
                            </div>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            Company Name &nbsp;:&nbsp;
                            <TextField record={data[id]} source="company" />
                        </div>

                        <div>
                            Venue Name &nbsp;:&nbsp;
                            <TextField record={data[id]} source="venue.name" />
                        </div>

                        <div>
                            Payorder Number &nbsp;:&nbsp;
                            <TextField record={data[id]} source="payorder" />
                        </div>

                        <div>
                            Amount &nbsp;:&nbsp;
                            <TextField record={data[id]} source="amount" />
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
