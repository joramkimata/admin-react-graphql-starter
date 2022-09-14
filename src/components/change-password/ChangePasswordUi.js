import React, { useEffect } from 'react'
import ModalContainerUi from '../modal-container/ModalContainerUi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import ModalFooter from '../modal-footer/ModalFooter';
import useGraphQLMutator from '../../hooks/useGraphQLMutator';
import { CHANGE_PASSWORD, GET_ALL_USERS } from '../../pages/users/graphQL';

const ChangePasswordUi = ({ uuid, visiblePass, onCancel, }) => {

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);

    useEffect(() => {
        reset();
    }, [reset])

    const { mutation: changePassword, submiting, setSubmitting } = useGraphQLMutator(CHANGE_PASSWORD, 'changeUserPassword', [GET_ALL_USERS], () => {
        onCancel(reset);
    }, `Successfully Password Changed`);

    const onSubmit = (data) => {
        setSubmitting(true);
        changePassword({
            variables: {
                uuid,
                ...data
            }
        })
    }


    return (
        <>
            <ModalContainerUi
                title='Change Password'
                visible={visiblePass}
                onCancel={() => { onCancel(reset) }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        {...register("password")}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        {...register("confirmPassword")}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword?.message}
                    />

                    <ModalFooter loading={submiting} onCancel={() => { onCancel(reset) }} />

                </form>

            </ModalContainerUi>
        </>
    )
}

export default ChangePasswordUi
