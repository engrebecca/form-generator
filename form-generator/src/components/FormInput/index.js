import React from "react";
import { Input } from "antd";

function FormInput({ formItem }) {
  const name = formItem.name;
  const type = formItem.type;
  const label = formItem.human_label;

  return (
    <div>
      <label for={name}>{label}</label>
      <Input type={type} name={name} id={name} />
    </div>
  );
}

export default FormInput;
