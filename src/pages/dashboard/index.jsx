import Container from '@material-ui/core/Container';
import Head from 'next/head'
import React, {Component} from 'react';

class DashBoard extends Component{

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Head>
                    <title>DashBoard</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <h1>Welcome to Horeca PlateForm</h1>
                </main>
            </Container>
        )
    }
};

export default DashBoard;
