import React from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { Layout, Button, Input, InputNumber, Select, Spin } from "antd";
import { clearObject } from "../../helpers";

const { Option } = Select;

const AddBookPage = () => {
  const history = useHistory();

  const [data, setData] = React.useState({
    name: "",
    year: 1500,
    genre: "",
    price: 1
  });

  const [isFetching, setIsFetching] = React.useState(false);

  const [authors, setAuthors] = React.useState([]);
  const [pubs, setPubs] = React.useState([]);

  const [currentAuthor, setCurrentAuthor] = React.useState({});
  const [currentPub, setCurrentPub] = React.useState({});

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const fetchAuthors = async () => {
    setIsFetching(true);
    const { data } = await axios("http://localhost:8060/api/authors");
    setAuthors(data);
    setIsFetching(false);
  };

  const fetchPubs = async () => {
    setIsFetching(true);
    const { data } = await axios("http://localhost:8060/api/publishing-houses");
    setPubs(data);
    setIsFetching(false);
  };

  const onChangePrice = value => {
    setData({ ...data, price: value });
  };

  const onChangeYear = value => {
    setData({ ...data, year: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const finalData = {
        ...data,
        author: {
          id: Number(currentAuthor.value)
        },
        publishingHouse: {
          id: currentPub.value
        }
      };

      await axios.post("http://localhost:8060/api/new-book", finalData);
      setData(clearObject);
      history.push("/home");
    } catch (error) {}
  };
  return (
    <Layout
      className="site-layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <form onSubmit={onSubmit} style={{ width: "40%" }}>
        <Input
          onChange={onChange}
          value={data.name}
          name="name"
          placeholder="название книги"
          style={{ marginBottom: "15px" }}
        />
        <Select
          labelInValue
          value={currentAuthor.name}
          showSearch
          defaultActiveFirstOption={false}
          placeholder="выберите автора"
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchAuthors}
          onChange={setCurrentAuthor}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          {authors.map(d => (
            <Option key={d.id}>
              {d.name} {d.surname}
            </Option>
          ))}
        </Select>
        <InputNumber
          value={data.year}
          name="year"
          min={1500}
          placeholder="год издания"
          onChange={onChangeYear}
          style={{ display: "flex", width: "100%", marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.genre}
          name="genre"
          placeholder="жанр"
          style={{ marginBottom: "15px" }}
        />
        <InputNumber
          onChange={onChangePrice}
          style={{ display: "flex", width: "100%", marginBottom: "15px" }}
          value={data.price}
          min={1}
          name="price"
          placeholder="цена"
        />
        <Select
          labelInValue
          value={currentPub.address}
          showSearch
          defaultActiveFirstOption={false}
          placeholder="выберите издателя"
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchPubs}
          onChange={setCurrentPub}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          {pubs.map(d => (
            <Option key={d.id}>{d.address}</Option>
          ))}
        </Select>
        <Button type="primary" htmlType="submit">
          добавить
        </Button>
      </form>
    </Layout>
  );
};

export default AddBookPage;
