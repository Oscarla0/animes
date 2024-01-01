import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ToolOutlined, LogoutOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);

  // Solo muestra la barra de navegación cuando el usuario está logeado
  if (!user) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/" className="nav-link">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </Menu.Item>
        {user.role === Role.Admin && (
          <Menu.Item key="admin" icon={<ToolOutlined />} title="Admin">
            <NavLink to="/admin/users" className="nav-link">Admin</NavLink>
          </Menu.Item>
        )}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={accountService.logout}>
          Logout
        </Menu.Item>
      </Menu>
      <Route path="/admin" component={AdminNav} />
    </div>
  );
}

function AdminNav({ match }) {
  const { path } = match;

  return (
    <Menu theme="light" mode="horizontal">
      {/* Añade tus elementos de AdminNav aquí */}
    </Menu>
  );
}

export { Nav };
