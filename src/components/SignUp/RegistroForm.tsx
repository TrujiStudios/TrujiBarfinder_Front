// src/components/RegistroForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Grid, Typography, MenuItem, Paper, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type FormInputs = {
    name: string;
    lastName: string;
    phone: string;
    businessName: string;
    country: string;
    businessType: string;
    email: string;
    password: string;
    acceptTerms: boolean;
    preloadProducts: boolean;
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(5),
        borderRadius: theme.spacing(2),
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
    image: {
        width: '100%',
        borderRadius: theme.spacing(2),
    },
    leftColumn: {
        paddingRight: theme.spacing(2),
    },
    rightColumn: {
        paddingLeft: theme.spacing(2),
        background: `url('/assets/registro.png') no-repeat center center`,
        backgroundSize: 'cover',
        color: '#fff',
    },
    checkboxLabel: {
        color: '#000',
    },
}));

const RegistroForm: React.FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
    };

    return (
        <Container maxWidth="lg">
            <Paper className={classes.root} elevation={3}>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.leftColumn}>
                        <Typography variant="h4" align="center" gutterBottom>
                            ¡Comienza tu experiencia Loggro!
                        </Typography>
                        <Typography variant="subtitle1" align="center" gutterBottom>
                            Pruébalo gratis por 7 días
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
                                    <TextField
                                        label="Nombre"
                                        fullWidth
                                        {...register('name', { required: 'Nombre es requerido' })}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
                                    <TextField
                                        label="Apellido"
                                        fullWidth
                                        {...register('lastName', { required: 'Apellido es requerido' })}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
                                    <TextField
                                        label="Número telefónico"
                                        fullWidth
                                        {...register('phone', { required: 'Teléfono es requerido' })}
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
                                    <TextField
                                        label="Nombre del negocio"
                                        fullWidth
                                        {...register('businessName', { required: 'Nombre del negocio es requerido' })}
                                        error={!!errors.businessName}
                                        helperText={errors.businessName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
                                    <TextField
                                        label="País"
                                        fullWidth
                                        {...register('country', { required: 'País es requerido' })}
                                        error={!!errors.country}
                                        helperText={errors.country?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
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
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
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
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.formControl}>
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
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={<Checkbox {...register('preloadProducts')} />}
                                        label="Productos Precargados"
                                        className={classes.checkboxLabel}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={<Checkbox {...register('acceptTerms', { required: 'Debe aceptar los términos y condiciones' })} />}
                                        label="He leído y acepto la política de tratamiento de datos"
                                        className={classes.checkboxLabel}
                                    />
                                    {errors.acceptTerms && <Typography color="error">{errors.acceptTerms.message}</Typography>}
                                </Grid>
                                <Grid item xs={12} className={classes.submitButton}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Registrarme
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.rightColumn}>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" textAlign="center">
                            <Typography style={{ color: 'black' }} variant="h4" gutterBottom>
                                <strong>¡Bienvenido a <strong style={{ color: 'red' }}>Loggro Restobar!</strong> </strong>
                            </Typography>
                            <Typography style={{ color: 'black' }} variant="body1">
                                ¿Ya tienes una cuenta? <a href="/SignIn" style={{ color: 'black', textDecoration: 'underline' }}>Ingresa aquí</a>
                            </Typography>
                        </Box>
                        TrujiStudiso
                        {/* <Box mt={3}>
                            <img src="src\assets\registro.png" alt="Loggro Restobar" className={classes.image} />
                        </Box> */}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default RegistroForm;
