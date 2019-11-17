import React, { Fragment, useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { Button, Table, Icon, Input, Tag } from "antd";

import {
  getAllCategories,
  getProduct,
  getProducts
} from "../../../shared/store/actions";
import AddProductModal from "./AddProductModal";
import { reduxConnect } from "../../../shared/hoc/reduxConnector/reduxConnect";
import { IStore } from "../../../shared/store/store";
import { ProductValues } from "./types";
import { httpService } from "../../../utils/httpService";
import { openNotification } from "../../../utils/notificationService";
import { FieldError } from "../../../shared/types";
import { ICategory, IProduct } from "../../../utils/entityTypes";

const Products = ({
  allCategories,
  allProducts,
  currentProvider,
  getProduct,
  getProducts,
  selectedProduct,
  getAllCategories
}: RouteChildrenProps & any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<any>(null);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  let searchInput: any = null;

  const handleSearch = (selectedKeys: any, confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          ref={node => {
            searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    }
  });

  useEffect(() => {
    if (currentProvider) {
      getProducts(currentProvider.id);
    }
  }, [getProducts, currentProvider]);

  useEffect(() => {
    if (allCategories && !allCategories.length) {
      getAllCategories();
    }
  }, [getAllCategories, allCategories]);

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
      if (Array.isArray(data)) {
        data.forEach(
          ({ path, message }: FieldError) => (errors[path] = message)
        );
        setServerErrors(errors);
      }
    }
  };

  const handleRowClick = ({ id }: IProduct) => {
    if (selectedProduct && id === selectedProduct.id) {
      return;
    }
    console.log(id);
    getProduct(id);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name")
    },
    {
      title: "Deliverable",
      dataIndex: "deliverable",
      key: "deliverable",
      sorter: (a: any, b: any) => a.deliverable - b.deliverable,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("deliverable"),
      render: (deliverable: boolean) => (
        <Tag color={deliverable ? "green" : "red"}>
          {deliverable ? "true" : "false"}
        </Tag>
      )
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      filters: allCategories.map(({ name, id }: ICategory) => ({
        text: name,
        value: id
      })),
      onFilter: (value: any, product: IProduct) =>
        product.categories.some(({ id }) => id === value),
      render: (categories: ICategory[]) => (
        <span>
          {categories.map(({ name }, index) => {
            let color = index % 2 ? "geekblue" : "purple";
            return (
              <Tag color={color} key={name}>
                {name.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["descend", "ascend"],
      sorter: (a: any, b: any) => a.price - b.price,
      ...getColumnSearchProps("price")
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a: any, b: any) => a.weight - b.weight,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a: any, b: any) => a.volume - b.volume,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a: any, b: any) => a.count - b.count,
      sortDirections: ["descend", "ascend"]
    }
  ];

  return (
    <Fragment>
      <AddProductModal
        visible={modalVisible}
        onCancel={toggleModal}
        onSubmit={handleSubmit}
        categories={allCategories}
        serverErrors={serverErrors}
      />
      {allProducts && allProducts.length && (
        <Table
          onRowClick={handleRowClick}
          columns={columns as any}
          dataSource={allProducts.map((product: IProduct) => ({
            ...product,
            key: product.id
          }))}
        />
      )}
      <Button
        className={"add-product-button"}
        onClick={toggleModal}
        shape={"circle"}
        size={"large"}
        type={"primary"}
      >
        <Icon type={"plus"} />
      </Button>
    </Fragment>
  );
};

export default reduxConnect(
  Products,
  { getAllCategories, getProducts, getProduct },
  ({
    category: { allCategories },
    auth: { currentProvider },
    product: { allProducts, selectedProduct }
  }: IStore) => ({
    allCategories,
    currentProvider,
    allProducts,
    selectedProduct
  })
);
