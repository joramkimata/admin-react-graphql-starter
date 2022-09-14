

import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { userPermissions } from '../../store/cache'

const HasPermissionUi = ({ permission, children }) => {

    const permissions = useReactiveVar(userPermissions);

    if (permissions.includes(permission)) {
        return <>{children}</>;
    }

    return null;
}

export default HasPermissionUi