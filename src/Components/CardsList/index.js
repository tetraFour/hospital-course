import React from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import { Layout, Card, Spin } from "antd";

import medCardIcon from "../../assets/images/medical.svg";
const { Content } = Layout;

const { Meta } = Card;

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const BooksList = () => {
  const history = useHistory();

  const [cardList, setCardList] = React.useState([]);

  const [userCard, setUserCard] = React.useState({});

  const { role } = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    const fetchCards = async () => {
      const { data } = await axios("http://localhost:5000/api/card/get-cards");
      setCardList(data);
    };

    const fetchCurrentCard = async () => {
      const { userId } = JSON.parse(localStorage.getItem("user"));
      console.log(userId);
      const {
        data: { card }
      } = await axios(
        `http://localhost:5000/api/card/get-user-card?userid=${userId}`
      );
      console.log(card);
      setUserCard(card);
    };

    if (role === 1) {
      fetchCurrentCard();
    } else {
      fetchCards();
    }

    // fetchCards();
  }, [role]);

  return (
    <Content className="site-layout-background site-layout-background__book-list">
      {role === 2 ? (
        !cardList && !cardList.length ? (
          <Spin size="large" />
        ) : (
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
                title={`карта №: ${card?._id}`}
                description={`пациент: ${card?.userId?.name}`}
              />
            </Card>
          ))
        )
      ) : Object.entries(userCard).length ? (
        <Card
          hoverable
          key={userCard._id}
          className="book-card"
          cover={
            <img
              alt="example"
              src={medCardIcon}
              style={{ width: "200px", height: "200px", margin: "0 auto" }}
            />
          }
          onClick={() => {
            history.push(`/card/${userCard._id}`);
          }}
        >
          <Meta
            title={`карта №: ${userCard._id}`}
            description={`пациент: ${userCard.userId.name}`}
          />
        </Card>
      ) : (
        <Spin size="large" />
      )}
    </Content>
  );
};

export default BooksList;
