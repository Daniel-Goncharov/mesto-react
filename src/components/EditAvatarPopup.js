import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
    avatarRef.current.value = ''
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_data_place-url"
        id="avatar-input"
        type="url"
        name="avatar-url"
        placeholder="Укажите ссылку на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__error avatar-input-error" ></span>
    </PopupWithForm>
  )
}