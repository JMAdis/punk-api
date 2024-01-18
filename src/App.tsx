import "./App.css";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { Beer } from "./types/types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
  const [apiBeers, setApiBeers] = useState<Beer[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      setApiBeers(data)
      setFilteredBeers(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedTerm = e.target.value;

    setSearchTerm(searchedTerm);

    const filteredBevs = apiBeers.filter((beer) =>
      beer.name.toLowerCase().includes(searchedTerm.toLowerCase())
    );

    setFilteredBeers(filteredBevs);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChanges}
          placeholder="Type to search beers"
        />
      </div>
      {filteredBeers.length === 0 ? (
        <p>No beers found</p>
      ) : (
        <ol>
          {filteredBeers.map((beer) => (
            <li key={beer.id}>{beer.name}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default App;
