import { Beer } from "../../types/types";
import Card from "../Card/Card";
import "./CardList.scss";

type CardListProps = {
  beers: Beer[];
};

const CardList = ({ beers }: CardListProps) => {
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
              abv={beer.abv}
            />
          ))}
      </div>
    );
  };

export default CardList;
