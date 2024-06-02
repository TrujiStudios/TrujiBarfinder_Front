import { useForm, SubmitHandler } from 'react-hook-form';
import { SingUpInterface } from '../interface/singUpInterface';
import { reqResApi } from '../api/reqRes';
import Swal from 'sweetalert2'
// import { useState } from 'react';


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

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
    // const [form, setForm] = useState<SingUpInterface>({
    //     name: '',
    //     lastName: '',
    //     phone: '',
    //     businessName: '',
    //     country: '',
    //     businessType: '',
    //     email: '',
    //     password: '',
    //     acceptTerms: false,
    //     preloadProducts: false
    // });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const resp = await reqResApi.post<SingUpInterface>('/auth/signup', data);
        console.log('handleSubmit <>', handleSubmit)
        console.log('resp <>', resp)
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
        onSubmit,
        watch
    }
};