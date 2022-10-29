import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        defaultValue={name}
        onChange={handleNameChange}
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
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        defaultValue={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error job-imput-error" ></span>
    </PopupWithForm>
  )
}