import React, { useState, useEffect } from 'react';
import avatarDefault from '../images/Kusto.jpg';
import Card from './Card';
import api from '../utils/api';

export default function Main(props) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState(false);

  const [userInfo, setUserInfo] = useState({
    userName: 'Жак-Ив Кусто',
    userDescription: 'Исследователь океана',
    userAvatar: '',
  });
  const [cards, setCards] = useState([]);
  const handleCardClick = props.onHandleCardClick;

  useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setUserInfo({
          userName: userInfo.name,
          userDescription: userInfo.about,
          userAvatar: userInfo.avatar
        });
      })
      .catch((err) => {
        alert(err);
      });
  },[])

  useEffect(() => {
    api.getInitialCards()
      .then(cards => setCards([...cards]
        ))
      .catch((err) => {
        alert(err);
      });
  },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
          <img className="profile__pic" src={userInfo.userAvatar ? userInfo.userAvatar : avatarDefault} alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userInfo.userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{userInfo.userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить картинку" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
        {cards.map(card => {
          return (
            <Card
              key={card._id}
              userId={userId}
              onCardClick={handleCardClick}
              card={card}
              {...card}
            />
          );
        })}
        </ul>
      </section>
    </main>
  )
}