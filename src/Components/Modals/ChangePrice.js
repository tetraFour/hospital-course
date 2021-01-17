import React from "react";

import { useHistory } from "react-router-dom";

import { InputNumber, Modal } from "antd";
import axios from "axios";

const ChangeBookPrice = ({ changeBookPrice, setChangeBookPrice, book }) => {
  const history = useHistory();

  const [bookPrice, setBookPrice] = React.useState(1);

  const onChangePrice = value => {
    setBookPrice(value);
  };

  const handleOk = async () => {
    const finalBook = { ...book };
    finalBook.price = bookPrice;
    delete finalBook.author.name;
    delete finalBook.author.surname;
    delete finalBook.author.about;
    delete finalBook.publishingHouse.address;
    await axios.post("http://localhost:8060/api/edit-book", finalBook);
    setChangeBookPrice(prev => !prev);
    history.push("/home");
  };

  const handleCancel = () => {
    setChangeBookPrice(prev => !prev);
  };

  return (
    book && (
      <Modal
        title={`Цена: ${book.price} р`}
        visible={changeBookPrice}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          value={bookPrice}
          min={1}
          style={{ display: "flex", width: "100%", marginBottom: "15px" }}
          onChange={onChangePrice}
        />
      </Modal>
    )
  );
};

export default ChangeBookPrice;
