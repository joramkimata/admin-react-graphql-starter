
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react';
import {
    HomeOutlined,
    CheckOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { userPermissions } from '../../store/cache';

const items = [
    {
        key: `home`,
        icon: <HomeOutlined />,
        label: 'Dashboard',
        path: '/dashboard',
        permission: 'VIEW_DASHBOARD'
    },
    {
        key: `roles`,
        icon: <CheckOutlined />,
        label: 'Roles',
        path: '/roles',
        permission: 'VIEW_ROLES'
    },
    {
        key: `users`,
        icon: <UsergroupAddOutlined />,
        label: 'Users',
        path: '/users',
        permission: 'VIEW_USERS'
    },
]

const Sidebar = () => {


    const location = useLocation();

    const [currentPath, setCurrentPath] = useState(location.pathname.split('/')[1] === '' ? 'home' : location.pathname.split('/')[1]);

    useEffect(() => {
        setCurrentPath(location.pathname.split('/')[1] === '' ? 'home' : location.pathname.split('/')[1])
    }, [location]);

    const permissions = useReactiveVar(userPermissions);

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[`${currentPath}`]}
            >
                {
                    items.filter(i => {
                        return permissions.includes(i.permission);
                    }).map(i => (
                        <Menu.Item key={`${i.key}`}>
                            <Link to={`${i.path}`}>
                                {i.icon}
                                <span>{`${i.label}`}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }

            </Menu>
        </>
    )
}

export default Sidebar
