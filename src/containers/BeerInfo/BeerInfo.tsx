import { Beer } from "../../types/types";
import { Link, useParams } from "react-router-dom";
import "./BeerInfo.scss";

type BeerInfoProps = {
  beers: Beer[];
};

const BeerInfo = ({ beers }: BeerInfoProps) => {
  const { beerId } = useParams();
  const beer = beers.find((drink) => drink.id.toString() === beerId);

  if (beer === undefined)
    return <p>I'm sorry, we can't find this beer right now.</p>;

  return (
    <div className="beer-info">
      <Link to="/">
        <button className="beer-info__button">Return to Home</button>
      </Link>
      <div className="beer-info__img-container">
      <img
        className="beer__img"
        src={beer.image_url}
        alt="Beer Image"
      />
      </div>
      <div className="beer-info__info">
        <h2 className="beer-info__info--heading">{beer.name}</h2>
        <p>{beer.description}</p>
        <h2>Other tidbits</h2>

        <p>{beer.tagline}</p>
        <p>ABV:{beer.abv}%</p>
        <p className="beerparings">Food pairings: </p>
        <ul>
          {beer.food_pairing.map((food) => (
            <li>{food}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BeerInfo;
