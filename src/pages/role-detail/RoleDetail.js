

import { useQuery } from '@apollo/client';
import { ArrowBack, PlaylistAddCheck, Save } from '@mui/icons-material';
import { Divider, Fab, IconButton, Paper, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RolesManagerUi from '../../components/roles-manager/RolesManagerUi';
import TitleBoxUi from '../../components/title-box/TitleBoxUi';
import useGraphQLMutator from '../../hooks/useGraphQLMutator';
import { isLoading } from '../../store/cache';
import { ASSIGN_PERMISSIONS, GET_ROLE } from '../roles/graphQL';

const RoleDetail = () => {

    const parms = useParams();
    const navigate = useNavigate();

    const [permx, setPermx] = useState([])

    const { loading, data } = useQuery(GET_ROLE, {
        variables: {
            uuid: parms.uuid
        },

    });

    const { mutation: assignRoleToPermissions } = useGraphQLMutator(ASSIGN_PERMISSIONS, 'assignPermissions', [GET_ROLE], () => isLoading(false))

    useEffect(() => {
        isLoading(loading)
    }, [loading]);

    const assignPermissions = () => {
        isLoading(true)
        assignRoleToPermissions({
            variables: {
                input: {
                    roleUUID: parms.uuid,
                    permissionUUIDs: permx
                }
            }
        })
    }

    const getPermissions = (data) => {
        setPermx(data)
    }

    return (
        <>
            {
                data && (
                    <>

                        <TitleBoxUi title={`ROLE NAME: ${data.getRole.name}`} icon={<PlaylistAddCheck />}>
                            <IconButton onClick={() => navigate(-1)} color='primary'>
                                <ArrowBack />
                            </IconButton>
                        </TitleBoxUi>

                        <Divider sx={{ mt: 1, mb: 1 }} />

                        <Paper sx={{ padding: 1, mb: 3 }}>
                            <div className='row'>
                                <div className='col'>
                                    <h6> Name</h6>
                                    <p>{data.getRole.name}</p>
                                </div>
                                <div className='col'>
                                    <h6>Display Name</h6>
                                    <p>{data.getRole.displayName}</p>
                                </div>
                            </div>
                        </Paper>

                        <Divider sx={{ mt: 1, mb: 1 }} />

                        <TitleBoxUi title={`PERMISSION LIST FOR ${data.getRole.name}`} icon={<PlaylistAddCheck />}>

                        </TitleBoxUi>


                        <Divider sx={{ mt: 1, mb: 1 }} />

                        <RolesManagerUi getPermissions={(permx) => getPermissions(permx)} roles={data.getAllPermissionsGroupedByPermissionGroupName} />

                        <Tooltip title="Assign Permissions">
                            <Fab onClick={assignPermissions} color="secondary" sx={{
                                position: 'absolute',
                                bottom: 70,
                                right: 16,
                                background: '#434670'

                            }} aria-label="edit">
                                <Save />
                            </Fab>
                        </Tooltip>

                    </>
                )
            }

        </>
    )
}

export default RoleDetail
