import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

function HeroForm(props) {
  const [data, setData] = useState(props.data);
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        ...data,
        date: data ? moment(new Date(data.date), dateFormat) : ''
      }}
      onFinish={values => {
        props.sendbackData({
          ...values,
          date: new Date(values.date).toISOString()
        });
        props.reset && form.resetFields();
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter hero name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input placeholder="Please enter hero description" />
          </Form.Item>
          <Form.Item label="Hero birth date" name="date">
            <DatePicker
              size="medium"
              format={dateFormat}
              placeholder="Hero birth date"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >Save</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default HeroForm;
