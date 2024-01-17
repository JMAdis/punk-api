import { useState, useEffect } from "react";
import Main from "./containers/Main/Main";
import NavBar from "./containers/NavBar/NavBar";
import { Beer } from "./types/types";

const App = () => {
  const [allBeers, setAllBeers] = useState<Beer[]>([]);
  const [searchABV, setSearchABV] = useState<number>(0);
  const [searchClassic, setSearchClasic] = useState<string>("");
  const [searchPh, setSearchPh] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
};

useEffect(() => {
    getBeers(searchABV, searchClassic, searchPh, searchTerm )
}, [searchABV, searchClassic, searchPh, searchTerm])

const getBeers = async (abv: number, year: number) => {
    const beersData: Beer[] = [];
    for (let pageNumber = 1; pageNumber < 11; pageNumber++) {
        const url = `https://api.punkapi.com/v2/beers?brewed_before=${year}&abv_gt=${abv}&page=${pageNumber}`
        const res = await fetch(url);
        const data: Beer[] = await res.json();
        beersData.push(...data);
    }
    setBeers(beersData)
}

useEffect(() => {
    getBeers(searchABV, parseInt(brewed))
})

(searchABV: string, searchClassic: string, searchPh: boolean, searchTerm: string,) => {
    let url: string = `https://api.punkapi.com/v2/beers?per_page=80&page=${page}`

    const params: string[] = []

    if (searchABV.includes("High Alcohol")) {
        params.push("abv_gt=6");
    };

    if (searchClassic.includes('Classic Range')) {
        params.push('brewed_before=01-2010')
    }

    if (params.length > 0) {
        url += `&${params.join('&')}`
    }
        
    const response = await fetch(url)
    const data: Beer[] = await response.json();
    setAllBeers(data)
}