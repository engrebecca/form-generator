import { useEffect, useState } from "react";
import { Form, Button } from "antd";
import FormInput from "./components/FormInput";
import FormCheckbox from "./components/FormCheckbox";
import sampleJSON from "./sampleJSON";
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

    sampleJSON.forEach((formField) => {
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
    // Console log form data on submit
    console.log(values);
  }

  function onFinishFailed(errorInfo) {
    console.log(errorInfo);
  }

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
          const fieldType = formField.type;
          const fieldName = formField.name;

          if (fieldType === "checkbox") {
            return <FormCheckbox formField={formField} key={fieldName} />;
          } else {
            // Assuming all other form items in provided JSON will be an input element.
            // Conditional can be updated in future to allow for different components based on element type.
            return <FormInput formField={formField} key={fieldName} />;
          }
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
