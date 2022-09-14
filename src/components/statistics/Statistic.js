
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Statistic = ({ title, count, icon }) => {
    return (
        <>
            <Paper elevation={6} sx={{ p: 2 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box>
                            {icon}
                        </Box>
                        <Typography variant='h5'>
                            {title}
                        </Typography>
                    </div>

                    <Typography variant='h3'>
                        {count}
                    </Typography>
                </div>

            </Paper>
        </>
    )
}

export default Statistic