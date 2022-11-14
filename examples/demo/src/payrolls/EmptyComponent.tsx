import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useListContext } from 'react-admin';

const EmptyComponent = () => {
    const { basePath, resource } = useListContext();
    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                No record available related to this vendor.
            </Typography>
        </Box>
    );
};

export default EmptyComponent;
