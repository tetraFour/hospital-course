import React from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import { Layout, Card } from "antd";

import medCardIcon from "../../assets/images/medical.svg";
// import bookList from "../../books.json";

const { Content } = Layout;

const { Meta } = Card;

const BooksList = () => {
  const history = useHistory();

  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios("http://localhost:5000/api/user/get-cards");
      setCardList(data);
    };

    fetchBooks();
  }, []);

  return (
    <Content className="site-layout-background site-layout-background__book-list">
      {cardList &&
        cardList.length &&
        cardList.map(card => (
          <Card
            hoverable
            key={card._id}
            className="book-card"
            cover={
              <img
                alt="example"
                src={medCardIcon}
                style={{ width: "200px", height: "200px", margin: "0 auto" }}
              />
            }
            onClick={() => {
              history.push(`/card/${card._id}`);
            }}
          >
            <Meta
              title={`карта №: ${card._id}`}
              description={`пациент: ${card.userId.name}`}
            />
          </Card>
        ))}
    </Content>
  );
};

export default BooksList;
