import React, { useEffect, useLayoutEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import { Layout, Card, Button, Typography, Spin } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

import cardIcon from "../../assets/images/medical.svg";

import AddDisease from "../../Components/Modals/AddDisease";
import DiseaseList from "../../Components/DiseaseList";
import Axios from "axios";
import { useNotification } from "../../hooks";

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const BookPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotification();

  const [card, setCard] = React.useState(null);

  const [inc, setInc] = React.useState(0);

  const [changeAddDiseaseVisible, setChangeAddDiseaseVisible] = React.useState(
    null
  );

  const [isUser, setIsUser] = React.useState(false);

  useLayoutEffect(() => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    if (role === 1) {
      setIsUser(true);
    }
  }, []);

  React.useEffect(() => {
    const fetchAndEditCard = async () => {
      const { data } = await Axios(
        `https://hospital-course-backend.herokuapp.com/api/card/get-current-card?cardid=${id}`
      );

      setCard(data);
    };

    fetchAndEditCard();
  }, [inc, id]);

  const archiveCard = async () => {
    try {
      await Axios.delete(
        `https://hospital-course-backend.herokuapp.com/api/card/delete-current-card/${card.card._id}`
      );
      notification(
        "success",
        "Медицинская карта перенесена в архив",
        `Медицинская карта №${card.card._id} успешно перенесена в архив`
      );
      history.push("/home");
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
        {!isUser && (
          <div className="button-wrapper">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setChangeAddDiseaseVisible(prev => !prev)}
            >
              добавить заболеваение
            </Button>
            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              onClick={archiveCard}
            >
              Поместить в архив
            </Button>
          </div>
        )}
        {card ? (
          <>
            <Card
              key={card.card.id}
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
                title={`карта №: ${card?.card?._id}`}
                description={`пациент: ${card?.card?.userId?.name}`}
              />
              <Typography.Title level={4} style={{ margin: "10px 0 0" }}>
                дата рождения: {card?.card?.userId?.age}
              </Typography.Title>
              <Typography.Title level={5} style={{ margin: "10px 0 0" }}>
                Адрес проживания: {card?.card?.userId?.address}
              </Typography.Title>
            </Card>
            <DiseaseList disease={card?.disease} />
          </>
        ) : (
          <Spin />
        )}
      </Layout>
      {card && (
        <AddDisease
          addDisease={changeAddDiseaseVisible}
          setAddDisease={setChangeAddDiseaseVisible}
          user={card?.card?.userId?.name}
          card={card?.card?._id}
          setInc={setInc}
        />
      )}
    </>
  );
};

export default BookPage;
