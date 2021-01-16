import React from "react";

import { useParams, useHistory } from "react-router-dom";

import { Layout, Card, Button, Typography } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import cardIcon from "../../assets/images/medical.svg";
import axios from "axios";
import ChangeAuthor from "../../Components/Modals/ChangeAuthor";
import ChangeBookName from "../../Components/Modals/ChangeName";
import ChangeBookPrice from "../../Components/Modals/ChangePrice";
import AddToBasket from "../../Components/Modals/AddToBasket";

import bookList from "../../books.json";

const BookPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [book, setBook] = React.useState(null);

  const [changeAuthorVisible, setChangeAuthorVisible] = React.useState(false);
  const [addToBasketVisible, setAddToBasketVisible] = React.useState(false);
  const [changeBookNameVisible, setChangeBookNameVisible] = React.useState(
    false
  );
  const [changePriceVisible, setChangePriceVisible] = React.useState(false);

  React.useEffect(() => {
    const fetchAndEditBooks = async () => {
      // const { data } = await axios("http://localhost:8060/api/books");
      const currentBook = bookList.filter(b => b.id === Number(id));
      // console.log("book", currentBook);
      setBook(currentBook[0]);
    };

    fetchAndEditBooks();
  }, [id]);

  // console.log(book);

  const deleteBook = async () => {
    try {
      await axios.post("http://localhost:8060/api/delete-book", { id });
      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <Layout
        className="site-layout"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="button-wrapper">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setChangeBookNameVisible(prev => !prev)}
          >
            добавить заболеваение
          </Button>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={deleteBook}
          >
            Удалить мед. карту
          </Button>
        </div>
        {book && (
          <Card
            key={book.id}
            className="book-card book-card__max"
            cover={
              <img
                alt="example"
                src={cardIcon}
                style={{ width: "200px", height: "200px", margin: "0 auto" }}
              />
            }
          >
            <Card.Meta
              description={`карта №: ${book.bookName}`}
              title={`пациент: ${book.bookAuthor}`}
            />
            <Typography.Title level={4} style={{ margin: "10px 0 0" }}>
              дата рождения: {book.price}
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: "10px 0 0" }}>
              Адрес проживания:
            </Typography.Title>
          </Card>
        )}
      </Layout>
    </>
  );
};

export default BookPage;
