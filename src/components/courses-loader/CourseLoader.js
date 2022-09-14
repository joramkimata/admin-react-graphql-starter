
import { Skeleton } from '@mantine/core'
import { Paper } from '@mui/material'
import React from 'react'

function CourseLoader({ rows }) {
    return (
        <div>
            {rows ? (<>
                <Paper sx={{ padding: 2, mb: 2, mt: 2 }} elevation={3}>
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                </Paper>
                <Paper sx={{ padding: 2, mb: 2, mt: 2 }} elevation={3}>
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                </Paper>
                <Paper sx={{ padding: 2, mb: 2, mt: 2 }} elevation={3}>
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                </Paper>
            </>) : (
                <Paper sx={{ padding: 2, mb: 2, mt: 2 }} elevation={3}>
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="30%" radius="xl" />
                    <Skeleton height={8} mt={6} width="20%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                </Paper>
            )}
        </div>
    )
}

export default CourseLoader
