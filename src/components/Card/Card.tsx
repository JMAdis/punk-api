import "./Card.scss";

type CardProps = {
  id: number;
  name: string;
  image: string;
  tagline: string;
  abv: number;
};

const Card = ({ id, name, image, tagline, abv }: CardProps) => {
  return (
    <div className="card" key={id}>
      <img src={image} alt={name} className="card__image" />
      <div className="card__info">
        <h1 className="card__name">{name}</h1>
        <div className="card__extra-info">
          <h2 className="card__tagline">{tagline}</h2>
          <p className="card__ABV">ABV: {abv}%</p>
        </div>
      </div>
      <button className="card__button">Find out more</button>
    </div>
  );
};

export default Card;
