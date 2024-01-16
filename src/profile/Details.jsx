import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { accountService } from '@/_services';

const { Title, Text } = Typography;

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <Card style={{ marginTop: 100 }}>
      <Title level={2}>Mi Perfil</Title>
      <p>
        <Text strong>Nombre: </Text>
        {user.title} {user.firstName} {user.lastName}
        <br />
        <Text strong>Correo Electrónico: </Text>
        {user.email}
      </p>
      <Link to={`${path}/update`}>
        <Button type="primary" icon={<EditOutlined />}>
          Actualizar Perfil
        </Button>
      </Link>
    </Card>
  );
}

export { Details };
