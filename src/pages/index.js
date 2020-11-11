import Container from '@material-ui/core/Container';
import Head from 'next/head'
import SignIn from '../pages/auth/login';

export default function Home() {
    return (
        <Container component="main" maxWidth="xs">
            <Head>
                <title>Login App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <SignIn></SignIn>
            </main>
        </Container>
    )
};
