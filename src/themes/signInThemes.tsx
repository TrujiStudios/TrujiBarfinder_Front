
import { Button, Grid, Paper, FormControlLabel, Box } from '@mui/material';
import { styled } from '@mui/system';



export const signInThemes = () => {

    const Root = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        marginTop: theme.spacing(5),
        borderRadius: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const FormControl = styled(Box)(({ theme }) => ({
        marginBottom: theme.spacing(2),
    }));

    const SubmitButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(3),
    }));

    const LeftColumn = styled(Grid)(({ theme }) => ({
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(0),
        },
    }));

    const RightColumn = styled(Grid)(({ theme }) => ({
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(0),
            marginTop: theme.spacing(4),
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url('/src/assets/login.png') no-repeat center center`,
        backgroundSize: 'cover',
        borderRadius: theme.spacing(2),
        height: '100%',
    }));

    const Logo = styled('img')(({ theme }) => ({
        marginBottom: theme.spacing(2),
    }));

    const CheckboxLabel = styled(FormControlLabel)(() => ({
        color: '#000',
    }));

    const Image = styled('img')(({ theme }) => ({
        width: '100%',
        borderRadius: theme.spacing(2),
    }));

    return {
        Root,
        FormControl,
        SubmitButton,
        LeftColumn,
        RightColumn,
        CheckboxLabel,
        Image,
        Logo
    }

}
