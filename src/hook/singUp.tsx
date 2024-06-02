import { useForm, SubmitHandler } from 'react-hook-form';
import { SingUpInterface } from '../interface/singUpInterface';
import { reqResApi } from '../api/reqRes';
// import axios from 'axios';
import Swal from 'sweetalert2'
import { useState } from 'react';


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

export const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [form, setForm] = useState<SingUpInterface>({
        name: '',
        lastName: '',
        phone: '',
        businessName: '',
        country: '',
        businessType: '',
        email: '',
        password: '',
        acceptTerms: false,
        preloadProducts: false
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const resp = await reqResApi.post<SingUpInterface>('/auth/signup', data);
        console.log('RESPONSE <>', resp);
        setForm({
            name: '',
            lastName: '',
            phone: '',
            businessName: '',
            country: '',
            businessType: '',
            email: '',
            password: '',
            acceptTerms: false,
            preloadProducts: false
        });
        Swal.fire({
            title: '¡Registro exitoso!!!',
            text: '¡Bienvenido a Loggro!',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        //limpiar formulario despues de enviar los datos



    }


    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    }
};