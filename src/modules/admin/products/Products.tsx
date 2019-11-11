import React, { Fragment, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { Button } from "antd";

import { getAllCategories } from "../../../shared/store/actions";
import AddProductModal from "./AddProductModal";
import { reduxConnect } from "../../../shared/hoc/reduxConnector/reduxConnect";
import { IStore } from "../../../shared/store/store";
import { ProductValues } from "./types";
import { httpService } from "../../../utils/httpService";
import { openNotification } from "../../../utils/notificationService";
import { FieldError } from "../../../shared/types";

const Products = ({
  allCategories,
  getAllCategories
}: RouteChildrenProps & any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<any>(null);
  const toggleModal = () => {
    if (allCategories && !allCategories.length) {
      getAllCategories();
    }
    setModalVisible(!modalVisible);
  };

  const handleSubmit = async (fields: ProductValues) => {
    try {
      await httpService.post("/product", fields);
      openNotification(
        `Product ${fields.name} successfully created`,
        "success"
      );
      toggleModal();
    } catch ({ data }) {
      const errors: any = {};
      data.forEach(({ path, message }: FieldError) => (errors[path] = message));
      setServerErrors(errors);
    }
  };

  return (
    <Fragment>
      <AddProductModal
        visible={modalVisible}
        onCancel={toggleModal}
        onSubmit={handleSubmit}
        categories={allCategories}
        serverErrors={serverErrors}
      />
      <Button onClick={toggleModal} type={"primary"}>
        Create a new product
      </Button>
    </Fragment>
  );
};

export default reduxConnect(
  Products,
  { getAllCategories },
  ({ category: { allCategories } }: IStore) => ({ allCategories })
);
