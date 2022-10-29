import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {
  const [value, setValue] = useState({
    name: '',
    link: ''
  })

  function handleChange(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace(value, evt)
  }

  useEffect(() => {
    if (!props.isOpen) {
        setValue({
          name: '',
          link: ''
        })
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_data_place-name"
        id="placeName-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        required
        value={value.name}
        onChange={handleChange}
      />
      <span className="popup__error placeName-input-error" ></span>
      <input
        className="popup__input popup__input_data_place-url"
        id="placeUrl-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={value.link}
        onChange={handleChange}
      />
      <span className="popup__error placeUrl-input-error" ></span>
    </PopupWithForm>
  )
}