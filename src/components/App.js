import React, { useState } from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onHandleCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_data_name"
          id="name-imput"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error name-imput-error" ></span>
        <input
          className="popup__input popup__input_data_job"
          id="job-imput"
          type="text"
          name="job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error job-imput-error" ></span>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="card"
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_data_place-name"
          id="placeName-input"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error placeName-input-error" ></span>
        <input
          className="popup__input popup__input_data_place-url"
          id="placeUrl-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error placeUrl-input-error" ></span>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_data_place-url"
          id="avatar-input"
          type="url"
          name="avatar-url"
          placeholder="Укажите ссылку на аватар"
          required />
        <span className="popup__error avatar-input-error" ></span>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
      >
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <Footer />
    </div>
  );
}

export default App;
