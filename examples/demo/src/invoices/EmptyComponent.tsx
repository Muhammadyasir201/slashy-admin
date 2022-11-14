import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CreateButton, useListContext } from 'react-admin';

const EmptyComponent = () => {
    const { basePath, resource } = useListContext();
    console.log(resource);
    return (
        // <Box textAlign="center" m={1}>
        //     <Typography variant="h4" paragraph>
        //         No record available related to this vendor.
        //     </Typography>
        // </Box>
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                No products available
            </Typography>
            <Typography variant="body1">
                Create one or import from a file
            </Typography>
            <CreateButton basePath={basePath} />
            <Button>Import</Button>
        </Box>
    );
};

export default EmptyComponent;
