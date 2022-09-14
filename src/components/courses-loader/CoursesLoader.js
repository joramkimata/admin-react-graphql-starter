
import React from 'react'

import { Skeleton } from '@mantine/core'
import { Paper } from '@mui/material'

const CoursesLoader = () => {
    return (
        <div className='row'>
            <div className='col-md-4'>
                <Paper sx={{ padding: 2, mb: 2 }} elevation={3}>
                    <Skeleton height={50} circle mb="xl" />
                    <Skeleton height={8} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Paper>
            </div>
            <div className='col-md-4'>
                <Paper sx={{ padding: 2, mb: 2 }} elevation={3}>
                    <Skeleton height={50} circle mb="xl" />
                    <Skeleton height={8} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="80%" radius="xl" />
                </Paper>
            </div>
            <div className='col-md-4'>
                <Paper sx={{ padding: 2, mb: 2 }} elevation={3}>
                    <Skeleton height={50} circle mb="xl" />
                    <Skeleton height={8} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Paper>
            </div>
        </div>
    )
}

export default CoursesLoader