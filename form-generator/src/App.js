import { Form, Button } from "antd";
import FormInput from "./components/FormInput";
import "./App.css";

function App() {
  const [formRef] = Form.useForm();

  function onValuesChange(changedValues, allValues) {
    console.log(changedValues);
    console.log(allValues);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        {sampleFormData.map((formItem) => {
          // Assuming all form items in provided JSON will be an input element.
          // In the future a conditional can be added here to allow for additional types of form elements and components.
          return <FormInput formItem={formItem} key={formItem.name} />;
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
