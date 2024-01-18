import "./App.css";
import { useState, useEffect, ChangeEvent } from "react";
import { Beer } from "./types/types";
import CardList from "./components/CardList/CardList";
import NavBar from "./containers/NavBar/NavBar";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBeers, setApiBeers] = useState<Beer[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.punkapi.com/v2/beers?page=1&per_page=80"
      );
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

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      console.log(newFilters);
      return newFilters;
    });
  };

  const filterByABV = () => toggleFilter("abv");
  const filterByPH = () => toggleFilter("ph");
  const filterByYear = () => toggleFilter("first_brewed");

  const applyFilters = (beer: Beer) => {
    return Array.from(selectedFilters).every((filter) => {
      if (
        (filter === "abv" && beer.abv > 6) ||
        (filter === "ph" && beer.ph > 4) ||
        (filter === "first_brewed" &&
          beer.first_brewed &&
          parseInt(beer.first_brewed.split("/")[1], 10) < 2010)
      ) {
        return true;
      }
      return false;
    });
  };

  const filteredBeers = apiBeers.filter(
    (beer) =>
      applyFilters(beer) &&
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredBeers);

  return (
    <main>
      <div>
        <NavBar
          abvChange={filterByABV}
          yearChange={filterByYear}
          phChange={filterByPH}
          searchTerm={searchTerm}
          handleInput={handleInputChanges}
        />
      </div>
      <div>
        {filteredBeers.length > 0 ? (
          <CardList beers={filteredBeers} />
        ) : (
          <p>
            Uh oh! The beer you were looking for couldn't be found, try again!
          </p>
        )}
      </div>
    </main>
  );
};

export default App;
