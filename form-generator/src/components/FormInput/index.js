import React from "react";
import { Input, Form } from "antd";

function FormInput({ formItem }) {
  const name = formItem.name;
  const type = formItem.type;
  const label = formItem.human_label;

  return (
    <Form.Item label={label} name={name}>
      <Input type={type} name={name} id={name} />
    </Form.Item>
  );
}

export default FormInput;
