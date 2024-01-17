import "./App.css";
import { useState, FormEvent, useEffect } from "react";
import { Beer } from "./types/types";
import Main from "./containers/Main/Main";
import NavBar from "./containers/NavBar/NavBar";
import BeerInfo from "./containers/BeerInfo/BeerInfo";


const App = () => {
  const [apibeers, setApiBeers] = useState<Beer[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchABV, setSearchABV] = useState<number>(0);
  const [searchClassic, setSearchClasic] = useState<string>("2024");
  const [searchPh, setSearchPh] = useState<number>(14);
  const [selectedBeer, setSelectedBeer] = useState<null | Beer>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage= 8;


  const filterBeers = () => {
    setFilteredBeers(
      apibeers.filter((beer) => {
        const containsName = beer.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const isClassic = beer.first_brewed.slice(-4) <= searchClassic;
        const hasAbvGt = beer.abv >= searchABV;
        const hasPhLt = beer.ph <= searchPh;

        return containsName && hasAbvGt && hasPhLt && isClassic;
      })
    );
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleABVChange = () => {
    if (searchABV) {
      setSearchABV(0);
    } else {
      setSearchABV(6);
    }
  };

  const handleClassicChange = () => {
    if (searchClassic == "2024") {
      setSearchClasic("2010");
    } else {
      setSearchClasic("2024");
    }
  };

  const handlePhChange = () => {
    if (searchPh == 14) {
      setSearchPh(4);
    } else setSearchPh(14);
  };

  // connecting to the API
  const getBeers = async () => {
    const beers: Beer[] = [];
    for (let index = 1; index <= 5; index++) {
      let url = `https://api.punkapi.com/v2/beers?per_page=80&page=${index}`;
      let response = await fetch(url).then((result) => result.json());
      beers.push(...response);
    }
    console.log(beers);
    setApiBeers(beers);
    setFilteredBeers(beers);
  };

  useEffect(() => {
    if (apibeers.length == 0) {
      console.log("i am fetching the masterlist of beers");
      getBeers();
    } else if (apibeers.length > 0){
      console.log("i am filtering the list of beers ");
      filterBeers();
    } else {

    }
  }, [search, searchABV, searchClassic, searchPh]);

  const tempFunc = (value: null | Beer) => {
    console.log(value);
    setSelectedBeer(value);
  };

  const indexLast = currentPage * cardPerPage;
  const indexFirst = indexLast - cardPerPage;
  const currentCards = filteredBeers.slice(indexFirst, indexLast);

  return (
    <div className="punk">
      <nav className="punk__nav">
        <NavBar
          search={search}
          handleInput={handleInput}
          ABVChange={handleABVChange}
          ClassicRangeChange={handleClassicChange}
          PhChange={handlePhChange}
        />
      </nav>
      <main className="punk__main">
        <Main beers={currentCards} />
      </main>
      
       
      <div>
        {selectedBeer != null && (
          <BeerInfo beers={selectedBeer} onSelect={tempFunc} />
        )}
      </div>
    </div>
  );
};

export default App;