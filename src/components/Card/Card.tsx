import "./Card.scss";

type CardProps = {
  id: number;
  name: string;
  image: string;
  tagline: string;
  abv: number;
  brewed: string;
};

const Card = ({ id, name, image, tagline, abv, brewed}: CardProps) => {
  return (
    <div className="card" key={id}>
      <img src={image} alt={name} className="card__image" />
      <h1 className="card__name">{name}</h1>
      <div className="card__info">
        <h2 className="card__tagline">{tagline}</h2>
        <p className="card__ABV">ABV: {abv}%</p>
        <p>Year brewed: {brewed}</p>
        {/** <button>+ Find out more</button> */}
      </div>
    </div>
  );
};

export default Card;