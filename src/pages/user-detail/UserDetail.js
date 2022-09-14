
import { useQuery } from '@apollo/client';
import { AddTask, ArrowBack, ExpandMoreRounded, Key, VerifiedUser } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControlLabel, IconButton, Paper, Typography } from '@mui/material';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RolesUi from '../../components/roles-ui/RolesUi';
import TitleBoxUi from '../../components/title-box/TitleBoxUi';
import { isLoading } from '../../store/cache';
import { GET_USER_INFO } from '../users/graphQL';

const UserDetail = () => {

    const parms = useParams();

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);

    const { loading, data } = useQuery(GET_USER_INFO, {
        variables: {
            uid: parms.uuid
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        isLoading(loading)
    }, [loading]);



    const cancelAll = () => {
        setVisible(false);
    }


    return (
        <>

            {
                data && (<>

                    <Modal
                        title={`ROLE SELECTION LIST FOR ${(data.getUser.fullName).toUpperCase()}`}
                        centered
                        visible={visible}
                        footer={null}
                        width={1000}
                        onCancel={() => { cancelAll() }}
                    >


                        <RolesUi closeModal={() => setVisible(false)} userUuid={parms.uuid} roles={data.getRoles} myRoles={data.getUser.roles} />


                    </Modal>
                    <TitleBoxUi title={data.getUser.fullName} icon={<VerifiedUser />}>
                        <IconButton onClick={() => navigate(-1)} color='primary'>
                            <ArrowBack />
                        </IconButton>
                    </TitleBoxUi>

                    <Divider sx={{ mt: 1, mb: 1 }} />

                    <Paper sx={{ padding: 1, mb: 3 }}>
                        <div className='row'>
                            <div className='col'>
                                <h6>Full Name</h6>
                                <p>{data.getUser.fullName}</p>
                            </div>
                            <div className='col'>
                                <h6>Email</h6>
                                <p>{data.getUser.email}</p>
                            </div>
                        </div>
                    </Paper>

                    <TitleBoxUi title={`${data.getUser?.roles?.length ?? 0} ROLES`} icon={<Key />}>
                        <Button onClick={() => setVisible(true)} variant='contained' sx={{ background: '#434670' }} startIcon={<AddTask />}>Assign Roles</Button>
                    </TitleBoxUi>

                    <Divider sx={{ mt: 1, mb: 1 }} />

                    {
                        data.getUser.roles.map((r, i) => (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreRounded />}
                                >
                                    <Typography>{`${i + 1}. ${r?.name}`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ ml: 3 }}>
                                        <div className='row'>
                                            {

                                                r.permissions.map((p, i) => (

                                                    <div className='col-3'>
                                                        <FormControlLabel control={<Checkbox disabled defaultChecked />} label={`${p.name}`} />
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </>)
            }
        </>
    )
}

export default UserDetail
