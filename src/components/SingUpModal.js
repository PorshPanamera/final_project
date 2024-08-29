import React from "react";
import { Modal, Form, Input, Button } from "antd";

const SignUpModal = ({ visible, onCancel, onFinish }) => {
  return (
    <Modal title="Sign up" visible={visible} onCancel={onCancel} footer={null}>
      <Form
        name="sign_up"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
