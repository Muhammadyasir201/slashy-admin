import * as React from 'react';
import { FC } from 'react';
import {
    EditButton,
    List,
    ListProps,
    useListContext,
    DeleteButton,
} from 'react-admin';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Industry } from '../types';
import _ from 'lodash';

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
    actionButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

const IndustryGrid: FC = props => {
    const classes = useStyles(props);
    const { data, ids } = useListContext<Industry>();

    return ids ? (
        <>
            <Grid container spacing={2} className={classes.root}>
                {ids.map(id => (
                    <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                        <Card>
                            <CardMedia
                                image={data[id]?.image}
                                className={classes.media}
                            />
                            <CardContent className={classes.title}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    align="center"
                                >
                                    {_.has(data[id], 'name') && data[id].name}
                                </Typography>
                            </CardContent>
                            <div className={classes.actionButton}>
                                <CardActions
                                    classes={{ spacing: classes.actionSpacer }}
                                >
                                    <EditButton
                                        basePath="/category"
                                        record={data[id]}
                                    />
                                </CardActions>
                                <CardActions
                                    classes={{ spacing: classes.actionSpacer }}
                                >
                                    {/* <DeleteButton
                                        basePath="/category"
                                        record={data[id]}
                                    /> */}
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    ) : null;
};

const IndustryList: FC<ListProps> = props => (
    <List
        {...props}
        sort={{ field: 'name', order: 'ASC' }}
        pagination={false}
        exporter={false}
        component="div"
    >
        <IndustryGrid />
    </List>
);

export default IndustryList;
