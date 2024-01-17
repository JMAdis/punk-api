import "./Card.scss";

type CardProps = {
  id: number;
  name: string;
  image: string;
  tagline: string;
  description: string;
};

const Card = ({ id, name, image, tagline, description}: CardProps) => {
  return (
    <div className="card" key={id}>
      <img src={image} alt={name} className="card__image" />
      <h1 className="card__name">{name}</h1>
      <div className="card__info">
        <h2 className="card__tagline">{tagline}</h2>
        <p className="card__description">{description}</p>
        {/** <button>+ Find out more</button> */}
      </div>
    </div>
  );
};

export default Card;