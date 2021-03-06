import React from "react";
import { Input, Form } from "antd";

function FormInput({ formField }) {
  const name = formField.name;
  const type = formField.type;
  const label = formField.human_label;

  return (
    <Form.Item
      label={label}
      name={name}
      // Opportunity to set additional validation rules dynamically in future. Could use a conditional that references formField.name to set different rules.
      rules={[{ required: true }]}
      className="form-item"
    >
      <Input type={type} name={name} id={name} />
    </Form.Item>
  );
}

export default FormInput;
