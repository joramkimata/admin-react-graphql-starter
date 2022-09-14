import './Layout.css'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import { ListItemIcon, ListItemText, Menu as MuiMenu, MenuItem } from '@mui/material'
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { isLoggedInVar } from '../../store/cache';
import { useApolloClient } from '@apollo/client';
import { ACCESS_TOKEN, MY_PERMISSIONS } from '../../utils/constants';
import AppLoader from '../loaders/AppLoader';
import Sidebar from '../sidebar/Sidebar';

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import { Home } from '@mui/icons-material';

const { Header, Sider, Content } = Layout;

const settings = [
    {
        key: 'home',
        label: 'Go To Home',
        icon: <Home />
    }, {
        key: 'logout',
        label: 'Logout',
        icon: <ExitToAppIcon />
    },
];


const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const client = useApolloClient();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();


    const handleCloseUserMenu = (key) => {
        if (key === 'logout') {

            client.clearStore();
            client.cache.gc();
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(MY_PERMISSIONS);
            // Set the logged-in status to false
            isLoggedInVar(false);
        }

        if (key === 'home') {

            navigate('/')
        }
        setAnchorElUser(null);
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (

        <AppLoader>

            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <img src={logo} alt="Logo" style={{
                            marginTop: 25,
                            width: 100,
                            marginBottom: 30,
                        }} />
                    </div>
                    <Sidebar />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            paddingLeft: 10,
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}

                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={avatar} />
                        </IconButton>

                        <MuiMenu
                            sx={{ mt: '30px', }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.key} onClick={() => handleCloseUserMenu(setting.key)}>
                                    <ListItemIcon>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <ListItemText>{setting.label}</ListItemText>
                                </MenuItem>
                            ))}
                        </MuiMenu>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 14,
                            minHeight: 280,
                            height: '100vh'
                        }}
                    >

                        <Outlet />


                    </Content>
                </Layout>
            </Layout>

        </AppLoader>
    );
};

export default MainLayout;