import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteConformationPopup(props) {
  function handleCardDelete(evt) {
    evt.preventDefault();

    props.onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleCardDelete}
    />
  )
}