import React, { useState } from "react";
import { Button, Checkbox, Form, Icon, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ProductValues, validProductSchema } from "./types";
import { ICategory } from "../../../utils/entityTypes";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (fields: ProductValues) => void;
  serverErrors: any;
  categories: ICategory[];
}
const FormItem = Form.Item,
  { Option } = Select;

const AddProductModal = ({
  visible,
  onCancel,
  onSubmit,
  serverErrors,
  categories
}: Props) => {
  const [errors, setErrors] = useState<any>({}),
    [fields, setFields] = useState<ProductValues>({
      categories: [],
      name: "",
      deliverable: false
    });

  const submit = async () => {
    try {
      await validProductSchema.validate(fields, { abortEarly: false });
      onSubmit(fields);
    } catch (error) {
      const errors: any = {};
      error.inner.forEach(({ path, message }: any) => {
        errors[path] = message;
      });
      setErrors(errors);
    }
  };

  const handleCategoriesChange = (values: number[]) => {
    setErrors({});
    setFields({ ...fields, categories: values });
  };

  const handleInputChange = ({ target: { name, value, checked } }: any) => {
    setErrors({});
    setFields({ ...fields, [name]: value ? value : checked });
  };

  if (serverErrors && serverErrors !== errors) {
    setErrors(serverErrors);
  }
  return (
    <Modal
      title="Add product"
      visible={visible}
      className={"add-product-modal"}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type={"primary"} onClick={submit}>
          Submit
        </Button>,
        <Button key="stop" type={"danger"} onClick={onCancel}>
          Cancel
        </Button>
      ]}
    >
      <Form onSubmit={submit}>
        <FormItem
          help={errors["name"]}
          label={"Name"}
          validateStatus={errors["name"] ? "error" : undefined}
          required
        >
          <Input
            prefix={<Icon type="star" />}
            placeholder="Name"
            onChange={handleInputChange}
            name="name"
            type="text"
          />
        </FormItem>
        <FormItem
          help={errors["price"]}
          label={"Price"}
          validateStatus={errors["price"] ? "error" : undefined}
          required
        >
          <Input
            prefix={<Icon type="tag" />}
            placeholder="Price (uah)"
            name="price"
            onChange={handleInputChange}
            type="number"
          />
        </FormItem>
        <FormItem
          help={errors["categories"]}
          label={"Categories"}
          required
          validateStatus={errors["categories"] ? "error" : undefined}
        >
          <Select
            placeholder="Categories of your product"
            mode="multiple"
            onChange={handleCategoriesChange}
          >
            {categories.map(({ id, name }) => (
              <Option key={name} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          help={errors["ingredients"]}
          label={"Ingredients (optional)"}
          validateStatus={errors["ingredients"] ? "error" : undefined}
        >
          <Input
            prefix={<Icon type="tags" />}
            placeholder="Ingredients"
            name="ingredients"
            onChange={handleInputChange}
            type="text"
          />
        </FormItem>
        <FormItem
          help={errors["weight"]}
          label={"Weight (optional)"}
          validateStatus={errors["weight"] ? "error" : undefined}
        >
          <Input
            prefix={<Icon type="tags" />}
            placeholder="Weight"
            name="weight"
            onChange={handleInputChange}
            type="number"
          />
        </FormItem>
        <FormItem
          help={errors["volume"]}
          label={"Volume (optional)"}
          validateStatus={errors["volume"] ? "error" : undefined}
        >
          <Input
            prefix={<Icon type="tags" />}
            placeholder="Volume"
            name="volume"
            onChange={handleInputChange}
            type="number"
          />
        </FormItem>
        <FormItem
          help={errors["count"]}
          label={"Count (optional)"}
          validateStatus={errors["count"] ? "error" : undefined}
        >
          <Input
            prefix={<Icon type="tags" />}
            placeholder="Count"
            name="count"
            onChange={handleInputChange}
            type="number"
          />
        </FormItem>
        <FormItem
          help={errors["description"]}
          label={"Description (optional)"}
          validateStatus={errors["description"] ? "error" : undefined}
        >
          <TextArea placeholder="Description" name="description" />
        </FormItem>

        <FormItem
          help={errors["deliverable"]}
          label={"Is your product deliverable?"}
          validateStatus={errors["deliverable"] ? "error" : undefined}
          required
        >
          <Checkbox onChange={handleInputChange} name="deliverable">
            Deliverable
          </Checkbox>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
