import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';

const Navbar = ({ setRendered }) => {
  const {getPopularAnime} = useGlobalContext();

  return (
    <Menu mode="horizontal" theme="dark" style={{ background: 'white', color: 'black' }}>
      <Menu.Item key="airing" icon={<HomeOutlined />} onClick={() => {
        if (typeof setRendered === 'function') { // Check if setRendered is a function
          setRendered('popular');
          getPopularAnime();
        }
      }}>
        <Link to="/" key="airing">Inicio</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
