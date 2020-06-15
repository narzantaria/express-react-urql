import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Layout.Header
      id="top"
      style={{ backgroundColor: 'sienna' }}
    >
      <Row>
        <Col span={18} offset={3}>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1" id='logo'><Link to="/"><HomeOutlined /></Link></Menu.Item>
            <Menu.Item
              key="2"
              style={{ float: 'right' }}
            ><Link to="/heroes">Heroes List</Link></Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header;
