import "./App.css";
import { useState, ChangeEvent, useEffect } from "react";
import { Beer } from "./types/types";
import Main from "./containers/Main/Main";
import NavBar from "./containers/NavBar/NavBar";
//import BeerInfo from './containers/BeerInfo/BeerInfo';

const App = () => {
  const [beerList, setBeers] = useState<Beer[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchABV, setSearchABV] = useState<number>(0);
  const [searchClassic, setSearchClasic] = useState<string>("2024");
  const [searchPh, setSearchPh] = useState<number>(14);
  const [loading, setLoading] = useState<boolean>(false);

  const filterBeers = () => {
    return beerList.filter((beer) => {
      const containsName = beer.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isClassic = beer.first_brewed.slice(-4) <= searchClassic;
      const hasAbvGt = beer.abv >= searchABV;
      const hasPhLt = beer.ph <= searchPh;

      return containsName && hasAbvGt && hasPhLt && isClassic;
    });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleABVChange = () => {
    setSearchABV(searchABV ? 0 : 6);
  };

  const handleClassicChange = () => {
    setSearchClasic(searchClassic === "2024" ? "2010" : "2024");
  };

  const handlePhChange = () => {
    setSearchPh(searchPh === 14 ? 4 : 14);
  };

  const getBeers = async () => {
    setLoading(true)

    const baseUrl = "https://api.punkapi.com/v2/beers"
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        setBeers(data);
      } else {
        console.warn("No Beers found.")
      } catch (err) {
        console.error(`Error: ${err}`)
      } finally {
        setLoading(false)
      }
    };

    useEffect(() => {
      getBeers();
    }, []);

     {/**  const apiBeers: Beer[] = [];
      for (let pageNumber = 1; pageNumber < 11; pageNumber++) {
        const url = `https://api.punkapi.com/v2/beers?brewed_before=${date}&abv_gt=${abv}&page=${pageNumber}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }
        const data: Beer[] = await res.json();
        apiBeers.push(...data);
      }
      setBeers(apiBeers);
    } catch (error) {
      console.error(error);
      console.log("error here");
    }
  };

  useEffect(() => {
    getBeers(searchABV, searchClassic, search);
  }, [searchABV, searchClassic, search, getBeers]);
*/}
  return (
    <div>
      <NavBar
        ABVChange={handleABVChange}
        ClassicRangeChange={handleClassicChange}
        PhChange={handlePhChange}
        search={search}
        handleInput={handleInput}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Main beers={filterBeers()} />
      )}
    </div>
  );
};
};

export default App;
