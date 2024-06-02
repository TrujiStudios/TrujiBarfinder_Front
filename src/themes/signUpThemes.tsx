
import { Button, Grid, Paper, FormControlLabel, Box } from '@mui/material';
import { styled } from '@mui/system';


export const signUpThemes = () => {

    const Root = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        marginTop: theme.spacing(5),
        borderRadius: theme.spacing(2),
    }));

    const FormControl = styled(Box)(({ theme }) => ({
        marginBottom: theme.spacing(2),
    }));

    const SubmitButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(3),
    }));

    const Image = styled('img')(({ theme }) => ({
        width: '100%',
        borderRadius: theme.spacing(2),
    }));

    const LeftColumn = styled(Grid)(({ theme }) => ({
        paddingRight: theme.spacing(2),
    }));

    const RightColumn = styled(Grid)(({ theme }) => ({
        paddingLeft: theme.spacing(6),
        // background: `url('src/assets/nuestra.jpg') no-repeat center center`,
        backgroundSize: 'cover',
        color: 'black',
        opacity: 0.6,

    }));

    const CheckboxLabel = styled(FormControlLabel)(({ theme }) => ({
        color: '#000',
    }));


    return {
        Root,
        FormControl,
        SubmitButton,
        Image,
        LeftColumn,
        RightColumn,
        CheckboxLabel
    }



}
