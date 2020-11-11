import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Container, Button, Grid, Box, Link, withStyles} from '@material-ui/core';
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Copyright from '../../components/partials/Copyright';
import {login,getToken} from '../../api/accounts/authenticationService';
import Router from "next/router";
const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        const token = getToken();
        if(token !== null){
            Router.push("/dashboard");
        }
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };


    onSubmitHandler = async (e) => {
        e.preventDefault();
        let {username, password} = this.state;
        if (username && password) {
            await login(this.state.username, this.state.password)
                .then((res) => {
                    if (res.access_token) {
                        Router.push("/dashboard");
                    } else {
                        alert(res.errors.message)
                    }
                });

        } else {
            alert("invalid username or password")
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={this.onSubmitHandler}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={this.handleUsernameChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Box>
                        <Copyright/>
                    </Box>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(SignIn);