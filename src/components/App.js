import React from 'react';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  function handleEditAvatarClick() {
    setIsOpen({
      ...isOpen,
      isEditAvatarPopupOpen: true
    });
  }

  function handleEditProfileClick() {
    setIsOpen({
      ...isOpen,
      isEditProfilePopupOpen: true
    });
  }

  function handleAddPlaceClick() {
    setIsOpen({
      ...isOpen,
      isAddPlacePopupOpen: true
    });
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      isOpen: true,
      link: link,
      name: name,
    });
  }

  function closeAllPopups(e) {
    if (e.target.classList.contains('popup')
      || e.target.classList.contains('popup__closed-button')) {

      setIsOpen({
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false
      })

      setSelectedCard({
        link: '',
        name: '',
        isOpen: false,
      });
    }
  }

  const [isOpen, setIsOpen] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false
  })

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    link: null
  });

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        selectedCard={selectedCard}
      />
      <PopupWithForm
        title="Редактировать профиль"
        type="profile"
        buttonText="Сохранить"
        isOpen={isOpen.isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
          className="popup__input popup__input_data_name"
          id="name-imput"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40" />
          <span className="popup__error name-imput-error" ></span>
        </>
        <>
          <input
          className="popup__input popup__input_data_job"
          id="job-imput"
          type="text"
          name="job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200" />
          <span className="popup__error job-imput-error" ></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        type="card"
        buttonText="Сохранить"
        isOpen={isOpen.isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__input popup__input_data_place-name"
            id="placeName-input"
            type="text"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30" />
          <span className="popup__error placeName-input-error" ></span>
        </>
        <>
          <input
            className="popup__input popup__input_data_place-url"
            id="placeUrl-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required />
          <span className="popup__error placeUrl-input-error" ></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        type="avatar"
        buttonText="Сохранить"
        isOpen={isOpen.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__input popup__input_data_place-url"
            id="avatar-input"
            type="url"
            name="avatar-url"
            placeholder="Укажите ссылку на аватар"
            required />
          <span className="popup__error avatar-input-error" ></span>
        </>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        type="confirmation"
        buttonText="Да"
      >
        <input type="hidden" name="item-id" value=""/>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <Footer />
    </div>
  );
}

export default App;
