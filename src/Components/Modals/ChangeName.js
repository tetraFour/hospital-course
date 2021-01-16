import React from "react";

import { useHistory } from "react-router-dom";

import { Input, Modal } from "antd";
import axios from "axios";

const ChangeBookName = ({ changeNameVisible, setChangeNameVisible, book }) => {
  const history = useHistory();

  const [bookName, setBookName] = React.useState("");

  const handleOk = async () => {
    const finalBook = { ...book };
    finalBook.name = bookName;
    delete finalBook.author.name;
    delete finalBook.author.surname;
    delete finalBook.author.about;
    delete finalBook.publishingHouse.address;
    await axios.post("http://localhost:8060/api/edit-book", finalBook);
    setChangeNameVisible((prev) => !prev);
    history.push("/");
  };

  const handleCancel = () => {
    setChangeNameVisible((prev) => !prev);
  };

  return (
    book && (
      <Modal
        title={`Название книги: ${book.name}`}
        visible={changeNameVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={bookName} onChange={(e) => setBookName(e.target.value)} />
      </Modal>
    )
  );
};

export default ChangeBookName;
