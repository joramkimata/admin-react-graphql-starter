
import { Alert } from '@mui/material'
import React from 'react'
import Header from '../home/header/Header'

const NotFound = () => {



    return (
        <>
            <Header />
            <div className='container'>
                <Alert color='error' sx={{
                    mt: 3,
                    textAlign: 'center',
                    mb: 3
                }}>
                    404 Not Found
                </Alert>
            </div>
        </>
    )
}

export default NotFound
