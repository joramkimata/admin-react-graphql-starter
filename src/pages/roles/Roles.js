import { yupResolver } from '@hookform/resolvers/yup';
import { Delete, Edit, FactCheck, RemoveRedEye, Save } from '@mui/icons-material';
import { Button, Paper, TextField } from '@mui/material';
import { Space } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import ActionBtn from '../../components/action-btn/ActionBtn';
import DataTableUi from '../../components/data-table/DataTableUi';
import ModalContainerUi from '../../components/modal-container/ModalContainerUi';
import ModalFooter from '../../components/modal-footer/ModalFooter';
import TitleBoxUi from '../../components/title-box/TitleBoxUi';
import useGraphQLMutator from '../../hooks/useGraphQLMutator';
import { isLoading } from '../../store/cache';
import { promptBox } from '../../utils/helpers';
import { CREATE_ROLE, DELETE_ROLE, GET_ALL_ROLES, UPDATE_ROLE } from './graphQL';

const Roles = () => {

    const navigate = useNavigate();

    const [modalTitle, setModalTitle] = useState('Add Role');

    const { mutation: createRole, submiting, visible, setVisible, setSubmitting, setEditing, editing, setUuid, uuid, stopLoading } = useGraphQLMutator(CREATE_ROLE, 'createRole', [GET_ALL_ROLES]);


    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        displayName: Yup.string()
            .required('Display Name is required'),
    })


    const formOptions = { resolver: yupResolver(formSchema) }
    const { setValue, register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);

    const { mutation: deleteRoleMutation } = useGraphQLMutator(DELETE_ROLE, "deleteRole", [GET_ALL_ROLES], () => {
        isLoading(false);
    }, `Successfully deleted!`);

    const { mutation: updateRole } = useGraphQLMutator(UPDATE_ROLE, "updateRole", [GET_ALL_ROLES], () => {
        setVisible(false);
        isLoading(false);
    })

    const showModal = () => {
        setVisible(true);
    };

    const deleteRole = (uuid) => {
        promptBox(() => {
            isLoading(true)
            deleteRoleMutation({
                variables: {
                    uuid
                }
            })
        });
    }

    const editRole = ({ id, __typename, uuid, ...role }) => {
        setVisible(true)
        setModalTitle('Edit Role');
        setEditing(true);
        setUuid(uuid);
        stopLoading();
        Object.keys(role).forEach(k => {
            setValue(k, role[k]);
        });
    }
    const viewRole = (uuid) => {
        navigate(`/roles/${uuid}/view`)
    }

    const onSubmit = async (data) => {
        setSubmitting(true);
        if (editing) {
            updateRole({
                variables: {
                    uuid: uuid,
                    input: {
                        ...data
                    }
                }
            });
        } else {
            createRole({
                variables: {
                    input: { ...data }
                }
            })
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Display Name',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <ActionBtn title='Edit Role Detail' onClickIcon={() => editRole(record)} icon={<Edit color='info' fontSize="inherit" />} />
                    <ActionBtn onClickIcon={() => viewRole(record.uuid)} icon={<RemoveRedEye color='success' fontSize="inherit" />} title="View User Detail" />
                    <ActionBtn title="Delete User Detail" onClickIcon={() => deleteRole(record.uuid)} icon={<Delete color='error' fontSize="inherit" />} />
                </Space>
            ),
        },
    ]

    return (
        <>
            <TitleBoxUi title='Manage Roles' icon={<FactCheck />}>
                <Button onClick={showModal} variant='contained' sx={{ background: '#434670' }} startIcon={<Save />}>Add Roles</Button>
            </TitleBoxUi>

            <Paper sx={{
                mt: 2,
                padding: 2
            }}>
                <ModalContainerUi
                    title={modalTitle}
                    visible={visible}
                    onCancel={() => { setVisible(false); /*reset();*/ }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Name"
                            name="name"
                            {...register("name")}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Display Name"
                            name="displayName"
                            {...register("displayName")}
                            error={Boolean(errors.displayName)}
                            helperText={errors.displayName?.message}
                        />

                        <ModalFooter loading={submiting} onCancel={() => { setVisible(false); reset(); }} />

                    </form>

                </ModalContainerUi>

                <DataTableUi columns={columns} query={GET_ALL_ROLES} queryName='getRoles' />

            </Paper>
        </>
    )
}

export default Roles
