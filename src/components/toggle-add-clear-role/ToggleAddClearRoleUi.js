
import { Checkbox, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ToggleAddClearRoleUi = ({ rolesUuids, uuid, getNewRoles }) => {

    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {

        const roles = [];

        rolesUuids.forEach(r => {
            if (r === uuid) {
                roles.push(r);
            }
        });

        setSelectedRoles(roles);

    }, [rolesUuids]);

    const handleChange = (e) => {

        if (e.target.checked) {
            if (!selectedRoles.includes(e.target.value)) {
                selectedRoles.push(e.target.value);
                setSelectedRoles(selectedRoles);
                console.log(selectedRoles)
                getNewRoles(selectedRoles);
            }
        } else {
            if (selectedRoles.includes(e.target.value)) {
                const index = selectedRoles.indexOf(e.target.value);
                if (index > -1) {
                    selectedRoles.splice(index, 1);
                    setSelectedRoles(selectedRoles);
                    getNewRoles(selectedRoles);
                }
            }
        }
    }

    return <Tooltip title={`${rolesUuids.includes(uuid) ? 'Remove this role' : 'Add this role'}`}>
        <Checkbox value={uuid} onChange={handleChange} defaultChecked={rolesUuids.includes(uuid)} />
    </Tooltip>;
}

export default ToggleAddClearRoleUi
