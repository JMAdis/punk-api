import CardList from "../../components/CardList/CardList";
import { Beer } from "../../types/types";

type MainProps = {
    beers: Beer[];
}

const Main = ({beers}: MainProps) => {
  return (
    <main>
        <CardList beers={beers} />
    </main>
  );
};

export default Main; 
