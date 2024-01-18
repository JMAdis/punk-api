import "./App.css";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Beer } from "./types/types";
import CardList from "./components/CardList/CardList";
import SearchBox from "./components/SearchBox/SearchBox";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBeers, setApiBeers] = useState<Beer[]>([]);
  const [highABVBeers, setHighABVBeers] = useState<Beer[]>([]);
  const [highPH, setHighPH] = useState<Beer[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      setApiBeers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedTerm = e.target.value;
    setSearchTerm(searchedTerm);
  };

  const filterByABV = (event: ChangeEvent<HTMLInputElement>) => {
    const isHigh = event.target.checked;

    if (isHigh) {
      const ABVfiltered = apiBeers.filter((beer) => beer.abv > 6);
      setHighABVBeers(ABVfiltered);
    } else {
      setHighABVBeers([]);
    }
  };

    const filterByPH = (event: ChangeEvent<HTMLInputElement>) => {
      const isAcidic = event.target.checked;

      if (isAcidic) {
        const PHFiltered = apiBeers.filter((beer) => beer.ph > 4);
        setHighPH(PHFiltered);
      } else {
        setHighPH([]);
      }
    };

      const combinedFilteredBeers = apiBeers
      .filter((beer) => (highABVBeers.length === 0 || highABVBeers.includes(beer)))
      .filter((beer) => (highPH.length === 0 || highPH.includes(beer)))
      .filter((beer) => 
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div>
          <div>
            <SearchBox
              searchTerm={searchTerm}
              handleInput={handleInputChanges}
            />
          </div>
          <div>
            <p>High ABV +6.0%</p>
            <input type="checkbox" onChange={filterByABV} />
          </div>
          <div>
            <p>Acidic</p>
            <input type="checkbox" onChange={filterByPH} />
          </div>
          {combinedFilteredBeers.length > 0 ? (
            <CardList beers={combinedFilteredBeers} />
          ) : (
            <p>
              Uh oh! The beer you were looking for couldn't be found, try again!
            </p>
          )}
        </div>
      );
    };

export default App;
