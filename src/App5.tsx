import { useState, FormEvent, useEffect } from 'react';
import './App.css'
import NavBar from './containers/NavBar/NavBar';
import Main from './containers/Main/Main';
import { Beer } from './types/types';

function App() {
  const [allBeers, setAllBeers] = useState<Beer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ABVChange, setABVChange] = useState<number>(0);
  const [ClassicRangeChange, setClassicRangeChange] = useState<boolean>(false);
  const [PhChange, setPhChange] = useState<number>(14);

const getBeer = async () => {
  const baseUrl = 'https://api.punkapi.com/v2/beers';
  let page = 1;
  const beersPerPage = 80;
  const allApiBeers = [];

  try {
    do {
      const urlWithPagination = `${baseUrl}?page=${page}&per_page=${beersPerPage}`;
      const response = await fetch(urlWithPagination);
      const data = await response.json();
      if (data.length === 0) {
        break;
      }
      allApiBeers.push(...data);
      page++;
    } while (page <= 5);
  } catch (err) {
    console.error(`Error, something is wrong ${err}`);
  }
  setAllBeers(allApiBeers);
};


  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.currentTarget;
    switch (name) {
      case 'searchName':
        setSearchTerm(value.toLowerCase());
        break;
      case 'highABVFilter':
        setABVChange(checked ? 6 : 0);
        break;
      case 'classicFilter':
        setClassicRangeChange(checked);
        break;
      case 'highAcidityFilter':
        setPhChange(checked ? 14 : 0);
        break;
      default:
        break;
    }
  };

const filteredBeers = allBeers.filter((beer) =>
  beer.name.includes(searchTerm) &&
  (!ABVChange || beer.abv > 6) &&
  (!ClassicRangeChange || Number(beer.first_brewed.slice(3)) < 2010) &&
  (!PhChange || beer.ph < 4)
);

  useEffect(() => {
    getBeer();
  }, [searchTerm, ABVChange, ClassicRangeChange, PhChange]);

  return (
    <div>
      <h1 className='title__h1'>Punk-Api </h1>
      <div className='container'>
        <div className='navbar'>
          <NavBar
            searchTerm={searchTerm}
            handleInput={handleInput}
            ABVChange={ABVChange}
            ClassicRangeChange={ClassicRangeChange}
            PhChange={PhChange}
            />
        </div>
        <div className='main'>
          <Main beers={filteredBeers} />
        </div>
      </div>
    </div>
  );
}

export default App;