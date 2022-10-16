export default function ImagePopup(props) {
  return(
    <div className={`popup popup_type_view-picture ${props.card.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
        <div className="popup__container-view-picture">
          <button className="popup__closed-button popup__closed-button_type_view-picture" type="button" aria-label="Закрыть просмотр изображения" onClick={props.onClose}></button>
          <img className="popup__picture" src={props.card.link} alt={props.card.name} />
          <h3 className="popup__picture-title">{props.card.name}</h3>
        </div>
      </div>
  );
}