import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularLoading() {
    return (
        <div>
            <CircularProgress />
            <CircularProgress color="secondary" />
        </div>
    );
}