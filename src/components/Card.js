export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card.link, props.card.name)
  }

  return (
    <li className="element">
      <img className="element__picture"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button" aria-label="Поставить лайк"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className="element__delete" type="button" aria-label="Удаление карточки"></button>
    </li>
  )
}