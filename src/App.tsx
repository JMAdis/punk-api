import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { Beer } from "./types/types";
import CardList from "./components/CardList/CardList";
import NavBar from "./containers/NavBar/NavBar";
import BeerInfo from "./components/BeerInfo/BeerInfo";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBeers, setApiBeers] = useState<Beer[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedHop, setSelectedHop] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.punkapi.com/v2/beers?page=1&per_page=80"
      );
      const data = await response.json();
      setApiBeers(data);
      setLoading(false);
      setDataLoaded(true);
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
    const result= Array.from(selectedFilters).every((filter) => {
      if (
        (filter === "abv" && beer.abv > 6) ||
        (filter === "ph" && beer.ph > 4) ||
        (filter === "first_brewed" &&
          beer.first_brewed &&
          parseInt(beer.first_brewed.split("/")[1], 10) < 2010) ||
        (filter === "hops" && selectedHop && beer.ingredients.hops.some((hop) => hop.name === selectedHop))
      ) {
        return true;
      }
      return false;
    });
    
    return result;
  };

  const handleHopChange = (hop: string) => {
    setSelectedHop(hop);
  };

  const filteredBeers = apiBeers.filter(
    (beer) =>
      applyFilters(beer) &&
      beer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedHop || beer.ingredients.hops.some((hop) => hop.name === selectedHop))
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dataLoaded) {
    return <p>Data not loaded</p>;
  }
 
  const uniqueHops: string[] = Array.from(
    new Set(
      apiBeers.flatMap((beer) => beer.ingredients.hops.map((hop) => hop.name))
    )
  );


  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar
                  abvChange={filterByABV}
                  yearChange={filterByYear}
                  phChange={filterByPH}
                  searchTerm={searchTerm}
                  handleInput={handleInputChanges}
                  uniqueHops={uniqueHops}
                  onSelectHop={handleHopChange}
                  selectedHop={selectedHop || ""}
                />
                {filteredBeers.length > 0 ? (
                  <CardList beers={filteredBeers} />
                ) : (
                  <p>
                    Uh oh! The beer you were looking for couldn't be found, try
                    again!
                  </p>
                )}
              </>
            }
          />
          <Route
            path="/beer/:beerId"
            element={
              <div>
                <BeerInfo beers={filteredBeers} />
              </div>
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
