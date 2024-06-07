import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { PaletteMode, Card as MuiCard } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import getSignUpTheme from './getSignUpTheme';
import ToggleColorMode from './ToggleColorMode';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { reqResApi } from '../../../api/reqRes';
import { SingUpInterface } from '../../../interface/singUpInterface';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { style } from '../../../themes/tableTheme';



interface ToggleCustomThemeProps {
  showCustomTheme: boolean;
  toggleCustomTheme: () => void;
}

// function ToggleCustomTheme({
//   showCustomTheme,
//   toggleCustomTheme,
// }: ToggleCustomThemeProps) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100dvw',
//         position: 'fixed',
//         bottom: 24,
//       }}
//     >
//       {/* <ToggleButtonGroup
//         color="primary"
//         exclusive
//         value={showCustomTheme}
//         onChange={toggleCustomTheme}
//         aria-label="Toggle design language"
//         sx={{
//           backgroundColor: 'background.default',
//           '& .Mui-selected': {
//             pointerEvents: 'none',
//           },
//         }}
//       >
//         <ToggleButton value>
//           <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
//           Custom theme
//         </ToggleButton>
//         <ToggleButton value={false}>Material Design 2</ToggleButton>
//       </ToggleButtonGroup> */}
//     </Box>
//   );
// }

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(4),
  width: '100%',
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px'
      : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  padingBottom: theme.spacing(12),
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
      : 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: 0,
    height: '100dvh',
  },
}));

export default function SignUp() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const [LastNameError, setLastNameError] = React.useState(false);
  const [LastNameErrorMessage, setLastNameErrorMessage] = React.useState('');

  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');

  const [BusinessNameError, setBusinessNameError] = React.useState(false);
  const [BusinessNameErrorMessage, setBusinessNameErrorMessage] = React.useState('');

  const [countryError, setCountryError] = React.useState(false);
  const [countryErrorMessage, setCountryErrorMessage] = React.useState('');

  const [businessTypeError, setBusinessTypeError] = React.useState(false);
  const [businessTypeErrorMessage, setBusinessTypeErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const validateInputs = () => {

    const name = document.getElementById('name') as HTMLInputElement;
    const LastName = document.getElementById('LastName') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const businessName = document.getElementById('businessName') as HTMLInputElement;
    const country = document.getElementById('country') as HTMLInputElement;
    const businessType = document.getElementById('businessType') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;


    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    //Name
    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Nombre es requerido.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    //LastName
    if (!LastName.value || LastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Apellido es requerido.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }
    //Phone
    if (!phone.value || phone.value.length < 1) {
      setPhoneError(true);
      setPhoneErrorMessage('Telefono es requerido.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }
    //BusinessName
    if (!businessName.value || businessName.value.length < 1) {
      setBusinessNameError(true);
      setBusinessNameErrorMessage('business es requerido.');
      isValid = false;
    } else {
      setBusinessNameError(false);
      setBusinessNameErrorMessage('');
    }

    //Country
    if (!country.value || country.value.length < 1) {
      setCountryError(true);
      setCountryErrorMessage('Ciudad es requerido.');
      isValid = false;
    } else {
      setCountryError(false);
      setCountryErrorMessage('');
    }
    //BusinessType
    if (!businessType.value || businessType.value.length < 1) {
      setBusinessTypeError(true);
      setBusinessTypeErrorMessage('Tipo de negocio es requerido.');
      isValid = false;
    } else {
      setBusinessTypeError(false);
      setBusinessTypeErrorMessage('');
    }


    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // const toggleCustomTheme = () => {
  //   setShowCustomTheme((prev) => !prev);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get('name'),
    //   LastName: data.get('LastName'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   phone: data.get('phone'),
    //   businessName: data.get('businessName'),
    //   country: data.get('country'),
    //   businessType: data.get('businessType'),

    // });
    if (validateInputs()) {

      const dataSignUp = {
        name: data.get('name'),
        LastName: data.get('LastName'),
        email: data.get('email'),
        password: data.get('password'),
        phone: data.get('phone'),
        businessName: data.get('businessName'),
        country: data.get('country'),
        businessType: data.get('businessType'),
      }

      try {

        const resp = await reqResApi.post<SingUpInterface>('/auth/signup', dataSignUp);
        console.log('resp <>', resp)
        Swal.fire({
          title: '¡Registro exitoso!!!',
          text: '¡Bienvenido a Barfinder360!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        navigate('/signIn');

      } catch (error: unknown) {
        console.log('error <>', error)
        const errorResponse = error as {
          response: {
            data: {
              [x: string]: string | undefined; error: string
            }
          }
        };
        Swal.fire({
          title: '¡Error en el registro!',
          text: errorResponse.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      }




    }

  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: { xs: 'static', sm: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 }, // esta 
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/"
          >
            Back
          </Button>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack
          justifyContent="center"
          sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
        >

          <Card>
            <SitemarkIcon />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              style={{ overflowY: 'auto', maxHeight: '100vh' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {/* Nombre y apellidos */}

              <Grid container spacing={2} style={{}}>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="name">Nombre completo</FormLabel>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      placeholder="Diego Alejandro"
                      error={nameError}
                      helperText={nameErrorMessage}
                      color={nameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="LastName">Apellido completo</FormLabel>
                    <TextField
                      autoComplete="LastName"
                      name="LastName"
                      required
                      fullWidth
                      id="LastName"
                      placeholder="Maradona Franco"
                      error={LastNameError}
                      helperText={LastNameErrorMessage}
                      color={LastNameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* Fin */}

              {/* inicio con phone y  businessName*/}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="phone">Telefono</FormLabel>
                    <TextField
                      autoComplete="phone"
                      name="phone"
                      required
                      fullWidth
                      id="phone"
                      placeholder="3001234567"
                      error={phoneError}
                      helperText={phoneErrorMessage}
                      color={phoneError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="businessName">Nombre del negocio</FormLabel>
                    <TextField
                      autoComplete="businessName"
                      name="businessName"
                      required
                      fullWidth
                      id="businessName"
                      placeholder="Mi negocio"
                      error={BusinessNameError}
                      helperText={BusinessNameErrorMessage}
                      color={BusinessNameError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* Fin */}

              {/* Inicio de ciudad y typo de negocio */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="country">Pais</FormLabel>
                    <TextField
                      autoComplete="country"
                      name="country"
                      required
                      fullWidth
                      id="country"
                      placeholder="Ciudad"
                      error={countryError}
                      helperText={countryErrorMessage}
                      color={countryError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="businessName">Tipo de negocio</FormLabel>
                    <TextField
                      autoComplete="businessType"
                      name="businessType"
                      required
                      fullWidth
                      id="businessType"
                      placeholder="Tipo de negocio"
                      error={businessTypeError}
                      helperText={businessTypeErrorMessage}
                      color={businessTypeError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* Fin */}

              {/* Email y password */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      placeholder="your@email.com"
                      name="email"
                      autoComplete="email"
                      variant="outlined"
                      error={emailError}
                      helperText={emailErrorMessage}
                      color={passwordError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      placeholder="••••••"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
                      error={passwordError}
                      helperText={passwordErrorMessage}
                      color={passwordError ? 'error' : 'primary'}
                    />
                  </FormControl>
                </Grid>
              </Grid>




              {/*  Fin*/}



              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Link
                to="/signIn"
              // variant="body2"
              // sx={{ alignSelf: 'center' }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
            <Divider>
              <Typography color="text.secondary">or</Typography>
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign up with Google')}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign up with Facebook')}
                startIcon={<FacebookIcon />}
              >
                Sign up with Facebook
              </Button>
            </Box>
          </Card>

        </Stack>
      </SignUpContainer>
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
    </ThemeProvider>
  );
}
