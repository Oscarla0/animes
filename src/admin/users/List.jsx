import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Space, Typography, Spin, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { accountService } from '@/_services';

const { Title } = Typography;
const { confirm } = Modal;

function List({ match }) {
  const { path } = match;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    accountService.getAll().then(x => setUsers(x));
  }, []);

  const deleteUser = id => {
    confirm({
      title: 'Confirmar Eliminación',
      icon: <ExclamationCircleOutlined />,
      content: '¿Estás seguro de que quieres eliminar este usuario?',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      onOk() {
        setUsers(users.map(x => {
          if (x.id === id) { x.isDeleting = true; }
          return x;
        }));
        accountService.delete(id).then(() => {
          setUsers(users => users.filter(x => x.id !== id));
        });
      },
    });
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => `${record.title} ${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`${path}/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Editar
            </Button>
          </Link>
          <Button
            type="danger"
            onClick={() => deleteUser(record.id)}
            disabled={record.isDeleting}
            icon={<DeleteOutlined />}
          >
            {record.isDeleting ? <Spin size="small" /> : 'Eliminar'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 100 }}>
      <Title level={2}>Usuarios</Title>
      <Link to={`${path}/add`}>
        <Button type="primary" size="small" style={{ marginBottom: 16 }}>
          Añadir Usuario
        </Button>
      </Link>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={!users}
        locale={{
          emptyText: <Spin size="large" />,
        }}
      />
    </div>
  );
}

export { List };
