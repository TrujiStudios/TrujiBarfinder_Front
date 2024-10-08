import React from 'react';
import { Container, TextField, Grid, Typography, Checkbox, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { signInThemes } from '../../themes/signInThemes';
import { SingIn } from '../../hook/singIng';



const SignIn: React.FC = () => {

  const { Root, FormControl, SubmitButton, LeftColumn, RightColumn, Logo, CheckboxLabel } = signInThemes();

  const { register, handleSubmit, errors, onSubmit } = SingIn();




  // const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  // const onSubmit: SubmitHandler<FormInputs> = (data) => {
  //   console.log(data);
  // };

  return (
    <Container maxWidth="lg">
      <Root elevation={3}>
        <Grid container>
          <LeftColumn item xs={12} md={6}>
            <Box textAlign="center">
              <Logo src="src/assets/logoLogin.png" alt="Loggro Restobar" />
              <Typography variant="h5" gutterBottom>
                Te damos la bienvenida a
              </Typography>
              <Typography variant="h4" color="secondary" gutterBottom>
                Loggro Restobar
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ingresa aquí con tu correo y contraseña designada para acceder a tu cuenta.
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Correo"
                      fullWidth
                      {...register('email', {
                        required: 'Email es requerido',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: 'Email no es válido'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      label="Contraseña"
                      type="password"
                      fullWidth
                      {...register('password', {
                        required: 'Contraseña es requerida',
                        minLength: {
                          value: 6,
                          message: 'Contraseña debe tener al menos 6 caracteres'
                        }
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <CheckboxLabel
                    control={<Checkbox {...register('rememberMe')} />}
                    label="Recordar Contraseña"
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton type="submit" variant="contained" color="primary" fullWidth>
                    Ingresar
                  </SubmitButton>
                </Grid>
              </Grid>
            </form>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                <a href="/forgot-password" style={{ textDecoration: 'underline' }}>Olvidé mi contraseña</a>
              </Typography>
              <Typography variant="body2">
                <a href="/register" style={{ textDecoration: 'underline' }}>Crear una cuenta</a>
              </Typography>
              <Typography variant="body2" mt={2}>
                ¿No tienes cuenta aún? <Link to="/SignUp" style={{ textDecoration: 'underline' }} >Ingresa aquí</Link>.
                {/* ¿No tienes cuenta aún? <a href="/trial" style={{ textDecoration: 'underline' }}>Prueba Loggro Restobar por 7 días, gratis</a>. */}
              </Typography>
              <Typography variant="body2">
                ¿Quieres ir al sitio de Loggro? <a href="https://loggro.com" style={{ textDecoration: 'underline' }}>Clic aquí</a>
              </Typography>
            </Box>
          </LeftColumn>
          <RightColumn item xs={12} md={6}>
            {/* Imagen de fondo se establece en el CSS */}
          </RightColumn>
        </Grid>
      </Root>
    </Container>
  );
};

export default SignIn;
