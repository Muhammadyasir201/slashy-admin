import * as React from 'react';
import { FC } from 'react';
import {
    Create,
    EditButton,
    List,
    ListProps,
    useListContext,
} from 'react-admin';
import inflection from 'inflection';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core';

import Link from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import LinkToRelatedStaffs from './LinkToRelatedStaffs';
import { Role } from '../types';

const useStyles = makeStyles({
    root: {
        marginTop: '1em',
    },
    media: {
        height: 140,
    },
    title: {
        paddingBottom: '0.5em',
    },
    actionSpacer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});

const RoleGrid: FC = props => {
    const classes = useStyles(props);
    const { data, ids } = useListContext<Role>();
    return ids ? (
        <>
            <Grid container spacing={2} className={classes.root}>
                {ids.map(id => (
                    <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                        <Card>
                            <CardMedia
                                image={data[id].image}
                                className={classes.media}
                            />
                            <CardContent className={classes.title}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    align="center"
                                >
                                    {data[id].display_name}
                                </Typography>
                            </CardContent>
                            <CardActions
                                classes={{ spacing: classes.actionSpacer }}
                            >
                                {/* {/* <LinkToRelatedStaffs record={data[id]} /> */}
                                <EditButton
                                    basePath="/roles"
                                    record={data[id]}
                                />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    ) : null;
};

const RoleList: FC<ListProps> = props => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        pagination={false}
        exporter={false}
        component="div"
    >
        <RoleGrid />
    </List>
);

export default RoleList;
