import React, {useEffect} from 'react';
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
import { emailValidator, passwordValidator } from '../util/validators';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import {setCurrentUser} from '../slicers/userSlice'



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={`${process.env.REACT_APP_DEV_URL}${process.env.REACT_APP_CLIENT_PORT}`}>
        BagBuilder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', password: '', verifyPass: '' });
  const [validInputs, setValidInputs] = React.useState(false);
  const [validFields, setValidFields] = React.useState({ validEmail: true, validPassword: true })
  const BASE_URL = process.env.REACT_APP_DEV_URL;
  const PORT = process.env.REACT_APP_NODE_PORT;


  const handleSubmit = async (event) => {
    // console.log({formData});
    event.preventDefault();
    const response = await axios.post(`${BASE_URL}${PORT}/auth/signup`, formData);
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

  useEffect (() => {
    if (formValidation()) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
    }
  },[formData])

  const formValidation = () => {
    const { firstName, lastName, email, password, verifyPass } = formData;
    let isValid = ( emailValidator(email) && passwordValidator(password)
      && firstName.length > 0 && lastName.length > 0
      && password === verifyPass );
      return isValid;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setValidFields({ ...validFields, validEmail: emailValidator(value) })
    }
    if (name === 'password') {
      setValidFields({ ...validFields, validPassword: passwordValidator(value) })
    }
    setFormData({ ...formData, [name]: value });
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate
            sx={{
              mt: 1,
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextField
                value={formData.firstName}
                onChange={(e) => { handleChange(e) }}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
              />
              <TextField
                value={formData.lastName}
                onChange={(e) => { handleChange(e) }}
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                sx={{ ml: .5 }}
              />
            </Box>
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
            />
            {!validFields.validEmail &&
              <strong className="invalidEmailText">
                Please enter a valid email
              </strong>}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
                <TextField
                  value={formData.password}
                  onChange={(e) => { handleChange(e) }}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                />
              <TextField
                value={formData.verifyPass}
                onChange={(e) => { handleChange(e) }}
                margin="normal"
                required
                fullWidth
                name="verifyPass"
                label="Verify Password"
                type="password"
                id="verifyPass"
                autoComplete="password"
                sx={{ ml: .5 }}
                />
            </Box>
                {!validFields.validPassword &&
                  <div className="invalidPasswordText">
                    <strong>
                      Password must contain the following:
                    </strong>
                    <ul>
                      <li>At least 8 characters </li>
                      <li>Must contain at least 1 uppercase letter,<br /> 1 lowercase letter, and 1 number</li>
                    </ul>
                  </div>
                }
                {formData.password !== formData.verifyPass &&
                <strong className="noPassMatch">
                  Passwords must match!
                </strong>
                }
          </Box>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validInputs}
          >
            Sign Up
          </Button>
          {/* <Grid container> */}
          {/* <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
              </Grid> */}
          {/* <Grid item> */}
          <Link href="/login" variant="body2">
            {"Already have an account? Login"}
          </Link>
          {/* </Grid>
            </Grid> */}
          <Button
            onClick={() => navigate("/guest")}
            type="submit"
            fullWidth
            variant="text"
            sx={{ mt: 7, mb: 2 }}
          >
            Continue as a guest
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}