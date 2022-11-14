// in src/comments.js
import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    EditButton,
    useTranslate,
    NumberField,
    Identifier,
} from 'react-admin';

import AvatarField from './AvatarField';

import { Vendor } from '../types';
import CompanyImageField from './CompanyImageField';
import { Typography } from '@material-ui/core';

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
    data?: { [key: string]: Vendor };
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
                    <Typography
                        style={{
                            margin: '20px auto 0',
                            textDecoration: 'underline',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        Super User Name
                    </Typography>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>{data[id].name}</h2>
                                <EditButton
                                    resource="vendors"
                                    basePath={basePath}
                                    record={data[id]}
                                />
                            </div>
                        }
                        avatar={<AvatarField record={data[id]} size="45" />}
                    />

                    <CardContent className={classes.cardContent}>
                        <div>
                            Super User's Email &nbsp;:&nbsp;
                            <TextField record={data[id]} source="email" />
                        </div>
                    </CardContent>

                    <Typography
                        style={{
                            margin: '20px auto 0',
                            textDecoration: 'underline',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        Company Name
                    </Typography>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>{data[id].company.name}</h2>
                            </div>
                        }
                        avatar={
                            <CompanyImageField record={data[id]} size="45" />
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            Company VAT Number &nbsp;:&nbsp;
                            <TextField
                                record={data[id]}
                                source="company.vat_number"
                            />
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
