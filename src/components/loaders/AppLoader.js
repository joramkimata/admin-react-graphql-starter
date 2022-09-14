import React from 'react'
import { isLoading } from '../../store/cache'
import LoadingOverlay from 'react-loading-overlay-ts'
import { PropagateLoader } from 'react-spinners'
import { useReactiveVar } from '@apollo/client'

const AppLoader = ({ children, color = '#434670' }) => {

    const loading = useReactiveVar(isLoading);

    return (
        <LoadingOverlay active={loading} spinner={<PropagateLoader color={color} />} styles={{
            overlay: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.15)'
            })
        }}>
            {children}
        </LoadingOverlay>
    )
}

export default AppLoader
