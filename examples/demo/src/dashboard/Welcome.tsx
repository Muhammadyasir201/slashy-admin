import * as React from 'react';
import { FC } from 'react';
import { Box, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import Logo from '../assets/images/Logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#722cae',
        color: '#fff',
        padding: 20,
        marginTop: theme.spacing(2),
        marginBottom: '1em',
    },
    media: {
        background: `url(${Logo}) center / contain no-repeat`,
        marginRight: 'auto',
    },
    actions: {
        [theme.breakpoints.down('md')]: {
            padding: 0,
            flexWrap: 'wrap',
            '& a': {
                marginTop: '1em',
                marginLeft: '0!important',
                marginRight: '1em',
            },
        },
    },
}));

const Welcome: FC = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box display="flex">
                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    className={classes.media}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
            <Box flex="1">
                <Typography variant="h5" component="h2" gutterBottom>
                    {translate('pos.dashboard.welcome.title')}
                </Typography>
                <Box maxWidth="40em">
                    <Typography variant="body1" component="p" gutterBottom>
                        {translate('pos.dashboard.welcome.subtitle')}
                    </Typography>
                </Box>
                {/* <CardActions className={classes.actions}>
                        <Button
                            variant="contained"
                            href="https://marmelab.com/react-admin"
                            startIcon={<HomeIcon />}
                        >
                            {translate('pos.dashboard.welcome.ra_button')}
                        </Button>
                        <Button
                            variant="contained"
                            href="https://github.com/marmelab/react-admin/tree/master/examples/demo"
                            startIcon={<CodeIcon />}
                        >
                            {translate('pos.dashboard.welcome.demo_button')}
                        </Button>
                    </CardActions> */}
            </Box>
        </Card>
    );
};

export default Welcome;
