import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './pages/login/Login';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './components/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import MainLayout from './components/layout/Layout';
import NotFound from './pages/not-found/NotFound';
import Courses from './pages/courses/Courses';
import Roles from './pages/roles/Roles';
import Users from './pages/users/Users';
import UserDetail from './pages/user-detail/UserDetail';
import RoleDetail from './pages/role-detail/RoleDetail';
import { useEffect } from 'react';
import { MY_PERMISSIONS } from './utils/constants';
import { userPermissions } from './store/cache';
import Home from './pages/home/Home';
import ActivateAccount from './pages/home/activate-account/ActivateAccount';
import PasswordReset from './pages/home/password-reset/PasswordReset';



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
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/activate-account/:uuid' element={<ActivateAccount />} />
          <Route path='/password-reset/:token' element={<PasswordReset />} />
          <Route element={<Auth />}>
            <Route element={<MainLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/roles' element={<Roles />} />
              <Route path='/roles/:uuid/view' element={<RoleDetail />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:uuid/view' element={<UserDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
