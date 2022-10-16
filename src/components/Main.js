import React from 'react';
import avatarDefault from '../images/Kusto.jpg'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from './Card';
import api from '../utils/api';

export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({
    userName: 'Жак-Ив Кусто',
    userDescription: 'Исследователь океана',
    userAvatar: false,
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setUserInfo({
          userName: userInfo.name,
          userDescription: userInfo.about,
          userAvatar: userInfo.avatar
        });
      })
  },[])

  React.useEffect(() => {
    api.getInitialCards()
      .then(cards => setCards([...cards]))
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
            return <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          })}
        </ul>
      </section>
    </main>
  )
}