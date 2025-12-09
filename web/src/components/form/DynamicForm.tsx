"use client";
import Form from "@rjsf/shadcn";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const schema: RJSFSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false },
  },
};

export default function DynamicForm() {
  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={(data) => {
        console.log(data.formData);
      }}
    />
  );
}
