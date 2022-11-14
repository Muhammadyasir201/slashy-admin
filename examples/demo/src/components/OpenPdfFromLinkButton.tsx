import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { FC } from 'react';
import _ from 'lodash';
import { useNotify, fetchStart, fetchEnd, useRefresh } from 'react-admin';
import { Invoice } from '../types';
import { BASE_URL } from '../constants';

const OpenPdfFromLinkButton: FC<{
    record: any;
    text: any;
    isInVoice: Boolean;
}> = ({ record, text, isInVoice }) => {
    const dispatch = useDispatch();
    const { access_token } = JSON.parse(localStorage.getItem('auth') || '{}');
    const refresh = useRefresh();

    const notify = useNotify();
    const [loading, setLoading] = useState(false);
    const { pdf } = record;

    const getPdfLinkFromServer = () => {
        setLoading(true);
        dispatch(fetchStart()); // start the global loading indicator
        const updatedRecord = { invoice: record.id, payslip: record.id };
        fetch(`${BASE_URL}/${isInVoice ? 'invoice-data' : 'payslip-data'}`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            method: 'POST',
            body: JSON.stringify(updatedRecord),
        })
            .then(response => {
                refresh();

                if (response.status == 200) {
                    response.json().then(function (data) {
                        const lastDot =
                            !_.isNil(data) && !_.isEmpty(data)
                                ? data.lastIndexOf('.')
                                : data.lastIndexOf('.');
                        const ext = data.substring(lastDot + 1);
                        if (_.isEqual(ext, 'pdf')) {
                            window.open(data.pdf, '_blank');
                        } else {
                            notify('Invlalid file url', 'error');
                        }
                    });
                } else {
                    response.json().then(function (data) {
                        notify(data.message, 'error');
                    });
                }
            })
            .catch(e => {
                notify('Unable to open this file', 'error');
            })
            .finally(() => {
                setLoading(false);
                dispatch(fetchEnd()); // stop the global loading indicator
            });
    };
    try {
        let ext: any = null;

        if (!_.isNil(pdf)) {
            const lastDot = _.has(pdf, 'src')
                ? pdf.src.lastIndexOf('.')
                : pdf.lastIndexOf('.');
            ext = pdf.substring(lastDot + 1);
        }

        return (
            <Typography
                onClick={() => {
                    if (_.isEqual(ext, 'pdf')) {
                        window.open(pdf, '_blank');
                    } else {
                        getPdfLinkFromServer();
                    }
                }}
                style={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                }}
                variant="body2"
                gutterBottom
            >
                {loading ? (
                    <CircularProgress
                        color="inherit"
                        size={15}
                        thickness={4}
                        style={{
                            marginLeft: 20,
                        }}
                    />
                ) : (
                    text
                )}
            </Typography>
        );
    } catch (e) {
        console.log({ OpenPdfFromLinkButtonException: e });
    }
    return <></>;
};

export default OpenPdfFromLinkButton;
