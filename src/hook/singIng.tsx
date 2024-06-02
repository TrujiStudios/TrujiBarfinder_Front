/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from 'react-hook-form';
import { reqResApi } from '../api/reqRes';
import { SingIng } from '../interface/sigIngInterface';
import { FormInputs } from '../types/signInTypes';
import Swal from 'sweetalert2'
// import { useHistory } from 'react-router-dom';



export const SingIn = () => {
    // const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

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

                // history.push('/dashboard');


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
