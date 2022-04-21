import React from "react";
import { Checkbox, Form } from "antd";

function FormCheckbox({ formField }) {
  const name = formField.name;
  const label = formField.human_label;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true }]}
      valuePropName="checked"
      className="form-item"
    >
      <Checkbox />
    </Form.Item>
  );
}

export default FormCheckbox;
