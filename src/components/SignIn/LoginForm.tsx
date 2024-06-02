// src/components/LoginForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, TextField, Button, Grid, Typography, Paper, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type FormInputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(5),
        borderRadius: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(3),
    },
    leftColumn: {
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(0),
        },
    },
    rightColumn: {
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(0),
            marginTop: theme.spacing(4),
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url('src/assets/login.png') no-repeat center center`,
        // background: `url('/mnt/data/image.png') no-repeat center center`,
        backgroundSize: 'cover',
        borderRadius: theme.spacing(2),
        height: '100%',
    },
    logo: {
        marginBottom: theme.spacing(2),
    },
    checkboxLabel: {
        color: '#000',
    },
    image: {
        width: '100%',
        borderRadius: theme.spacing(2),
    },
}));

const LoginForm: React.FC = () => {
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
                        <Box textAlign="center">
                            <img src="/src/assets/logoLogin.png" alt="Loggro Restobar" className={classes.logo} />
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
                                <Grid item xs={12} className={classes.formControl}>
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
                                <Grid item xs={12} className={classes.formControl}>
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox {...register('rememberMe')} />}
                                        label="Recordar Contraseña"
                                        className={classes.checkboxLabel}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.submitButton}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Ingresar
                                    </Button>
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
                                ¿No tienes cuenta aún? <a href="/trial" style={{ textDecoration: 'underline' }}>Prueba Loggro Restobar por 7 días, gratis</a>.
                            </Typography>
                            <Typography variant="body2">
                                ¿Quieres ir al sitio de Loggro? <a href="https://loggro.com" style={{ textDecoration: 'underline' }}>Clic aquí</a>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.rightColumn}>
                        {/* Imagen de fondo se establece en el CSS */}
                    </Grid>
                </Grid>
                {/* <Box mt={3}>
                    <img src="src\assets\registro.png" alt="Loggro Restobar" className={classes.image} />
                </Box> */}
            </Paper>
        </Container>
    );
};

export default LoginForm;
