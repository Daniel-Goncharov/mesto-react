export default function PopupWithForm(props) {
  return(
    <div
      className={`popup ${props.type}-popup ${props.isOpen === true ? 'popup_opened' : ''}`}
      onClick={props.onClose}
    >
      <div className={`popup__container popup__container_type_${props.type}`}>
        <button className="popup__closed-button" type="button" onClick={props.onClose}></button>
        <h2 className={`popup__title popup__title_type_${props.type}`}>{props.title}</h2>
        <form className="popup__form popup__form_type_profile" name={props.type} method="post" noValidate>
          {props.children}
          <button className="popup__button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}