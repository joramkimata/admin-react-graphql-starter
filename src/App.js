import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './pages/login/Login';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './components/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import MainLayout from './components/layout/Layout';
import Roles from './pages/roles/Roles';
import Users from './pages/users/Users';
import UserDetail from './pages/user-detail/UserDetail';
import RoleDetail from './pages/role-detail/RoleDetail';
import { useEffect } from 'react';
import { MY_PERMISSIONS } from './utils/constants';
import { userPermissions } from './store/cache';

function App() {

  useEffect(() => {
    const permissions = localStorage.getItem(MY_PERMISSIONS);
    if (permissions) {
      userPermissions(permissions);
    }
  }, []);



  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route element={<Auth />}>
            <Route element={<MainLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/roles' element={<Roles />} />
              <Route path='/roles/:uuid/view' element={<RoleDetail />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:uuid/view' element={<UserDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
