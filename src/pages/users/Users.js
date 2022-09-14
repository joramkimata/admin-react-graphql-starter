import { Group, Key, Save } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { Space, } from 'antd'
import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



import './User.css';
import ModalFooter from '../../components/modal-footer/ModalFooter';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import DataTableUi from '../../components/data-table/DataTableUi';
import TitleBoxUi from '../../components/title-box/TitleBoxUi';
import ModalContainerUi from '../../components/modal-container/ModalContainerUi';
import ActionBtn from '../../components/action-btn/ActionBtn';
import { ACTIVATE_USER, BLOCK_USER, CREATE_USERS, DELETE_USER, GET_ALL_USERS, UPDATE_USER } from './graphQL';
import useGraphQLMutator from '../../hooks/useGraphQLMutator';
import { isLoading } from '../../store/cache';
import { promptBox } from '../../utils/helpers';
import ChangePasswordUi from '../../components/change-password/ChangePasswordUi';
import { useNavigate } from 'react-router-dom';




const Users = () => {


    const [visiblePass, setVisiblePass] = useState(false)

    const [modalTitle, setModalTitle] = useState('Add User');

    const navigate = useNavigate();

    const { mutation: createUser, submiting, visible, setVisible, setSubmitting, setEditing, editing, setUuid, uuid, stopLoading } = useGraphQLMutator(CREATE_USERS, 'createUser', [GET_ALL_USERS]);

    let formSchema;

    if (!editing) {
        formSchema = Yup.object().shape({
            fullName: Yup.string()
                .required('Full Name is required'),
            email: Yup.string()
                .required('Email is required')
                .email('Invalid Email provided'),
            userType: Yup.string()
                .required('User Type is required')
                .default('STUDENT'),
            password: Yup.string()
                .required('Password is required'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password')], 'Passwords does not match'),
        })
    } else {
        formSchema = Yup.object().shape({
            fullName: Yup.string()
                .required('Full Name is required'),
            email: Yup.string()
                .required('Email is required')
                .email('Invalid Email provided'),
            userType: Yup.string()
                .required('User Type is required')
                .default('STUDENT'),
        })
    }

    const formOptions = { resolver: yupResolver(formSchema) }
    const { control, setValue, register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);

    const { mutation: updateUser } = useGraphQLMutator(UPDATE_USER, "updateUser", [GET_ALL_USERS], () => {
        setVisible(false);
        isLoading(false);
    })

    const { mutation: deleteUserMutation } = useGraphQLMutator(DELETE_USER, "deleteUser", [GET_ALL_USERS], () => {
        isLoading(false);
    }, `Successfully deleted!`);


    const { mutation: blockUserMutation } = useGraphQLMutator(BLOCK_USER, "blockUser", [GET_ALL_USERS], () => {
        isLoading(false);
    }, `Successfully blocked!`);

    const { mutation: activateUserMutation } = useGraphQLMutator(ACTIVATE_USER, "activateUser", [GET_ALL_USERS], () => {
        isLoading(false);
    }, `Successfully activated!`);

    // Mutation

    const showModal = () => {
        setVisible(true);
        setEditing(false);
        reset();
        stopLoading();
        setModalTitle(`Add User`)
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        if (editing) {
            updateUser({
                variables: {
                    uuid: uuid,
                    input: {
                        ...data
                    }
                }
            });
        } else {
            createUser({
                variables: {
                    input: { ...data }
                }
            })
        }
    }

    const editUser = async ({ id, __typename, uuid, active, createdAt, ...user }) => {
        setVisible(true)
        setModalTitle('Edit User');
        setEditing(true);
        setUuid(uuid);
        stopLoading();
        Object.keys(user).forEach(k => {
            setValue(k, user[k]);
        });
    }

    const deleteUser = (uuid) => {
        promptBox(() => {
            isLoading(true)
            deleteUserMutation({
                variables: {
                    uuid
                }
            })
        });
    }

    const blockUser = (uuid) => {
        promptBox(() => {
            isLoading(true)
            blockUserMutation({
                variables: {
                    uuid
                }
            });
        }, 'User will be blocked');
    }

    const activateUser = (uuid) => {
        promptBox(() => {
            isLoading(true)
            activateUserMutation({
                variables: {
                    uuid
                }
            });
        }, 'User will be activated');
    }

    const changePassword = (uuid) => {
        setVisiblePass(true);
        setUuid(uuid)
    }

    const viewUserDetail = (uuid) => {
        navigate(`/users/${uuid}/view`)
    }



    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Type',
            dataIndex: 'userType',
            key: 'userType',
        },
        {
            title: 'Joined',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">

                    <ActionBtn title='Edit User Detail' onClickIcon={() => editUser(record)} icon={<EditIcon color='info' fontSize="inherit" />} />

                    <ActionBtn title="Delete User Detail" onClickIcon={() => deleteUser(record.uuid)} icon={<DeleteIcon color='error' fontSize="inherit" />} />

                    {
                        record.active ? (
                            <ActionBtn onClickIcon={() => blockUser(record.uuid)} icon={<LockOpenIcon color='success' fontSize="inherit" />} title="Block User" />
                        ) : (
                            <ActionBtn onClickIcon={() => activateUser(record.uuid)} icon={<LockIcon color='secondary' fontSize="inherit" />} title='Activate User' />
                        )
                    }

                    <ActionBtn onClickIcon={() => viewUserDetail(record.uuid)} icon={<RemoveRedEyeIcon color='success' fontSize="inherit" />} title="View User Detail" />

                    <ActionBtn onClickIcon={() => changePassword(record.uuid)} icon={<Key color='warning' fontSize="inherit" />} title="Change User Password" />


                </Space>
            ),
        },
    ];



    return (
        <>


            <TitleBoxUi title='Manage Users' icon={<Group />}>
                <Button onClick={showModal} variant='contained' sx={{ background: '#434670' }} startIcon={<Save />}>Add Users</Button>
            </TitleBoxUi>

            <Paper sx={{
                mt: 2,
                padding: 2
            }}>
                <ModalContainerUi
                    title={modalTitle}
                    visible={visible}
                    onCancel={() => { setVisible(false); reset(); }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            {...register("fullName")}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName?.message}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            {...register("email")}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />

                        <Controller
                            name="userType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth sx={{ mt: 2 }} error={Boolean(errors.userType)}>
                                    <InputLabel >User Type</InputLabel>
                                    <Select
                                        name='userType'
                                        label="User Type"
                                        {...field}
                                    >
                                        <MenuItem value={`ADMIN`}>ADMIN</MenuItem>
                                        <MenuItem value={`STUDENT`}>STUDENT</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.userType?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />

                        {
                            editing ? null : (<>
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
                            </>)
                        }



                        <ModalFooter loading={submiting} onCancel={() => { setVisible(false); reset(); }} />



                    </form>

                </ModalContainerUi>

                <ChangePasswordUi uuid={uuid} visiblePass={visiblePass} onCancel={(reset) => { setVisiblePass(false); reset(); }} />


                <DataTableUi columns={columns} query={GET_ALL_USERS} queryName='getAllUsers' />

            </Paper>
        </>
    )
}

export default Users
