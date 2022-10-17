import React from 'react';

export default function Card({ link, name, likes, onCardClick, card }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img className="element__picture"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button" aria-label="Поставить лайк"></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
      <button className="element__delete" type="button" aria-label="Удаление карточки"></button>
    </li>
  )
}