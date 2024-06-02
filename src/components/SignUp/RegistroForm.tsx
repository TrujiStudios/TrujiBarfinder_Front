import React from 'react';
import { Container, TextField, Grid, Typography, MenuItem, Checkbox, Box, Hidden } from '@mui/material';
// import { styled } from '@mui/system';

import { Link } from 'react-router-dom';
import { SignUpForm } from '../../hook/singUp';
import { signUpThemes } from '../../themes/signUpThemes';



const RegistroForm: React.FC = () => {

    const { register, handleSubmit, errors, onSubmit, watch } = SignUpForm();

    const { Root, FormControl, LeftColumn, RightColumn, CheckboxLabel, SubmitButton } = signUpThemes();

    return (
        <Container maxWidth="lg">
            <Root elevation={3}>
                <Grid container>
                    <LeftColumn item xs={12} md={6}>
                        <Typography variant="h4" align="center" gutterBottom>
                            ¡Comienza tu experiencia Loggro!
                        </Typography>
                        <Typography variant="subtitle1" align="center" gutterBottom>
                            Pruébalo gratis por 7 días
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            label="Nombre"
                                            fullWidth
                                            {...register('name', { required: 'Nombre es requerido' })}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            label="Apellido"
                                            fullWidth
                                            {...register('lastName', { required: 'Apellido es requerido' })}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            label="Número telefónico"
                                            fullWidth
                                            {...register('phone', { required: 'Teléfono es requerido' })}
                                            error={!!errors.phone}
                                            helperText={errors.phone?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            label="Nombre del negocio"
                                            fullWidth
                                            {...register('businessName', { required: 'Nombre del negocio es requerido' })}
                                            error={!!errors.businessName}
                                            helperText={errors.businessName?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            label="País"
                                            fullWidth
                                            {...register('country', { required: 'País es requerido' })}
                                            error={!!errors.country}
                                            helperText={errors.country?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <TextField
                                            select
                                            label="Tipo de negocio"
                                            fullWidth
                                            {...register('businessType', { required: 'Tipo de negocio es requerido' })}
                                            error={!!errors.businessType}
                                            helperText={errors.businessType?.message}
                                        >
                                            <MenuItem value="Restaurante">Restaurante</MenuItem>
                                            <MenuItem value="Tienda">Tienda</MenuItem>
                                            <MenuItem value="Servicio">Servicio</MenuItem>
                                            <MenuItem value="Otro">Otro</MenuItem>
                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <CheckboxLabel
                                        control={<Checkbox {...register('preloadProducts')} />}
                                        label="Productos Precargados"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CheckboxLabel
                                        control={
                                            <Checkbox
                                                {...register('acceptTerms', { required: 'Debe aceptar los términos y condiciones' })}
                                                checked={watch('acceptTerms')}
                                            />
                                        }
                                        label="He leído y acepto la política de tratamiento de datos"
                                    />
                                    {errors.acceptTerms && <Typography color="error">{errors.acceptTerms.message}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <SubmitButton type="submit" variant="contained" color="primary" fullWidth>
                                        Registrarme
                                    </SubmitButton>
                                </Grid>
                            </Grid>
                        </form>
                    </LeftColumn>

                    <Hidden smDown>
                        <RightColumn item xs={12} md={6}>
                            <Box display="flex" justifyContent="center" alignItems="end" height="100%" flexDirection="column" textAlign="center">
                                <Typography style={{ marginTop: '30px', textAlign: 'center' }} variant="h4" gutterBottom>
                                    <strong>¡Bienvenido a <strong style={{ color: 'red' }}>Loggro Restobar!</strong> </strong>
                                </Typography>
                                <Typography style={{ marginRight: '100px' }} variant="body1">
                                    {/* ¿Ya tienes una cuenta? <a href="/SignIn" style={{ color: 'red', textDecoration: 'underline' }}>Ingresa aquí</a> */}
                                    ¿Ya tienes una cuenta? <Link to="/SignIn" style={{ color: 'red', textDecoration: 'underline' }}>Ingresa aquí</Link>
                                </Typography>
                            </Box>
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mt={3}>
                                {/* <Image style={{ height: '80px', width: '200px', marginTop: '50px', }} src="/assets/logoLogin.png" alt="Loggro Restobar" /> */}
                            </Box>
                        </RightColumn>
                    </Hidden>
                </Grid>
            </Root>
        </Container>
    );
};

export default RegistroForm;
