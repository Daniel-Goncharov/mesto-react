import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConformationPopup from './DeleteConformationPopup';
import Spinner from './Spinner';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [cardDelete, setCardDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }
  function onCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  function onUpdateUser(userData) {
    setIsPopupLoading(true);
    api.setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  function onUpdateAvatar(userData) {
    setIsPopupLoading(true);
    api.changeAvatar(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete() {
    setIsPopupLoading(true);
    api.deleteCard(cardDelete._id)
    .then(() => {
      setCards(cards.filter((item) => item._id !== cardDelete._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsPopupLoading(false);
    })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsPopupLoading(true);
    api.addCardServer(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([initialUserInfo, initialCards]) => {
        setCurrentUser(initialUserInfo);
        setCards(initialCards);
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {isLoading ? <Spinner/> : <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={onCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />}
        {isLoading ? <Spinner/> : <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
          isPopupLoading={isPopupLoading}
        />}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPopupLoading={isPopupLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
          isPopupLoading={isPopupLoading}
        />
        <DeleteConformationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isPopupLoading={isPopupLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
