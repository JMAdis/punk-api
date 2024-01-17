import { Beer } from "../../types/types";
import Card from "../Card/Card";
import "./CardList.scss";

type CardListProps = {
  beers: Beer[];
};

const CardList = ({ beers }: CardListProps) => {
  if (beers.length === 0) {
    return (
      <p>Uh oh! The beer you were looking for couldn't be found, try again!</p>
    );
  } else {
    return (
      <div className="card-container">
        {beers &&
          beers.map((beer) => (
            <Card
              key={beer.id}
              id={beer.id}
              name={beer.name}
              image={beer.image_url}
              tagline={beer.tagline}
              description={beer.description}
            />
          ))}
      </div>
    );
  }
};

export default CardList;
