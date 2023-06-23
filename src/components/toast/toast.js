import React from 'react';
import { Alert, Space } from 'antd';

const App = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Pedido finalizado com sucesso" type="success" showIcon />
      <Alert message="Não foi possível finalizar o pedido" type="error" showIcon />

      <Alert message="Produto removido com sucesso" type="success" showIcon />
      <Alert message="Não foi possível remover o produto" type="error" showIcon />

      <Alert message="Produto cadastrado com sucesso" type="success" showIcon />
      <Alert message="Não foi possível cadastrar o produto" type="error" showIcon />

      <Alert message="Produto adicionado ao carrinho" type="info" showIcon />
      <Alert message="Não foi possível adicionar o produto ao carrinho" type="error" showIcon />

      <Alert message="Item removido do carrinho" type="info" showIcon />     
      <Alert message="Não foi possível remover o item do carrinho" type="error" showIcon />
    </Space>
  );
  
  export default App;