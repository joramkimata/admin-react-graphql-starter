

import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

const ActionBtn = ({ title, icon, onClickIcon }) => {
    return (
        <div>
            <Tooltip title={title}>
                <IconButton onClick={onClickIcon} size="large">
                    {icon}
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ActionBtn
