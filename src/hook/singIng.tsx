/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from 'react-hook-form';
import { reqResApi } from '../api/reqRes';
import { SingIng } from '../interface/sigIngInterface';
import { FormInputs } from '../types/signInTypes';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';



export const SingIn = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const { login } = useAuth();
    try {

        const onSubmit: SubmitHandler<FormInputs> = async (data) => {

            try {

                const resp = await reqResApi.post<SingIng>('/auth/login', data)
                console.log('resp <>', resp)
                Swal.fire({
                    title: resp.data.message,
                    text: `¡Bienvenido a Loggro! ${resp.data.company.name} ${resp.data.company.lastName}`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });

                // Marca el usuario como autenticado
                login();

                // Redirige al dashboard
                navigate('/dashboard');


            } catch (error: any) {
                Swal.fire({
                    title: '¡Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

        }

        return {
            register,
            handleSubmit,
            errors,
            onSubmit
        }
    } catch (error: unknown) {
        console.log('error <>', error)
    }
}
