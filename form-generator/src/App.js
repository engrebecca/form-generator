import { useEffect, useState } from "react";
import { Form, Button } from "antd";
import FormInput from "./components/FormInput";
import "./App.css";

function App() {
  const [formRef] = Form.useForm();
  const [formFields, setFormFields] = useState([]);
  const [conditionalFields, setConditionalFields] = useState([]);

  useEffect(() => {
    getFieldsToRender();
    // eslint-disable-next-line
  }, []);

  function getFieldsToRender() {
    const fieldsToRender = [];
    const conditionalFields = [];

    sampleFormData.forEach((formField) => {
      if (!formField.conditional) {
        fieldsToRender.push(formField);
      } else if (formField.conditional) {
        conditionalFields.push(formField);

        // If field is conditional, check if it should be rendered
        const valueToCheck = formRef.getFieldValue(formField.conditional.name);
        const isToRender = formField.conditional.show_if(valueToCheck);
        if (isToRender) {
          fieldsToRender.push(formField);
        }
      }
    });

    setFormFields(fieldsToRender);
    setConditionalFields(conditionalFields);
  }

  function onValuesChange(changedValues) {
    const changedField = Object.keys(changedValues)[0];

    // If changed field is conditional, check if it should be rendered based on change
    conditionalFields.forEach((conditionalField) => {
      if (conditionalField.conditional.name === changedField) {
        getFieldsToRender();
      }
    });
  }

  function onFinish(values) {
    console.log(values);
  }

  function onFinishFailed(errorInfo) {
    console.log(errorInfo);
  }

  const sampleFormData = [
    {
      tag: "input",
      name: "first_name",
      type: "text",
      human_label: "First Name",
    },
    {
      tag: "input",
      name: "last_name",
      type: "text",
      human_label: "Last Name",
    },
    {
      tag: "input",
      name: "email",
      type: "email",
      human_label: "Email Address",
    },
    {
      tag: "input",
      name: "phone_number",
      type: "text",
      human_label: "Phone Number",
    },
    {
      tag: "input",
      name: "job_title",
      type: "text",
      human_label: "Job Title",
    },
    {
      tag: "input",
      name: "date_of_birth",
      type: "date",
      human_label: "Date of Birth",
    },
    {
      tag: "input",
      name: "parental_consent",
      type: "checkbox",
      human_label: "Parental Consent",
      conditional: {
        name: "date_of_birth",
        show_if: (value) => {
          const now = new Date();
          return (
            new Date(value) >=
            new Date(now.getFullYear() - 13, now.getMonth(), now.getDate())
          );
        },
      },
    },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Form Generator</h1>
        <p>A generator that dynamically creates forms from JSON</p>
      </header>

      <Form
        form={formRef}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {formFields.map((formField) => {
          // Assuming all form items in provided JSON will be an input element.
          // In the future a conditional can be added here to return different components based on element type.
          return <FormInput formField={formField} key={formField.name} />;
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
