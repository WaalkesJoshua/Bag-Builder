import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../slicers/userSlice';
import { emailValidator, passwordValidator } from '../util/validators';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={`${process.env.REACT_APP_DEV_URL}${process.env.REACT_APP_CLIENT_PORT}`}>
        BabBuilder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [validInputs, setValidInputs] = React.useState(false);
  const [validFields, setValidFields] = React.useState({ validEmail: true, validPassword: true })
  const BASE_URL = process.env.REACT_APP_DEV_URL;
  const PORT = process.env.REACT_APP_NODE_PORT;


  const handleSubmit = async (event) => {
    // console.log({formData});
    event.preventDefault();
    const response = await axios.post(`${BASE_URL}${PORT}/auth/login`, formData);
    if (response.status === 201) {
      console.log(response.data);
      if (signIn(
        {
          tokentoken: response.data.token,
          expiresIn: response.data.expiresIn,
          tokenType: "Bearer",
          authState: response.data.authUserState
        }
      )) {
        const user = response.data.authUserState;
        console.log(user);
        dispatch(setCurrentUser({user}));
        navigate('/user');
      }
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === 'email') {
      setValidFields({...validFields, validEmail: emailValidator(value)})
    }
    if (name === 'password') {
      setValidFields({...validFields, validPassword: passwordValidator(value)})
    }
    setFormData({ ...formData, [name]: value })
    const {email, password} = formData;
    if(emailValidator(email) && passwordValidator(password)) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              value={formData.email}
              onChange={(e) => { handleChange(e) }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {!validFields.validEmail &&
              <strong className="invalidEmailText">
                Please enter a valid email
              </strong>}
            <TextField
              value={formData.password}
              onChange={(e) => { handleChange(e) }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!validFields.validPassword &&
              <div className="invalidPasswordText">
              <strong>
                Password must contain the following:
              </strong>
              <ul>
                <li>At least 8 characters </li>
                <li>Must contain at least 1 uppercase letter,<br/> 1 lowercase letter, and 1 number</li>
                <li>Can contain special characters, but not required</li>
              </ul>
              </div>
              }
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validInputs}
            >
              Sign In
            </Button>
          </Box>
          {/* <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item> */}
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
          {/* </Grid>
            </Grid> */}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}