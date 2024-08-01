import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import { Character } from "./types";
import CardsList from "./Components/CardsList";
import Pagination from "./Components/Pagination";
import Loading from "./Components/Loading";
import { fetchData } from "./utils";
import { FaSearch } from "react-icons/fa";
import axios, { all } from "axios";


const App: React.FC = () => {
  const [currentPageCharacters, setCurrentPageCharacters] = useState<Character[]>([]);
  const [filterCharacters, setFilterCharacters] = useState<Character[]>([]);

  const [allCharacters, setAllCharacters] = useState<Character[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [originalSearch, setOriginalSearch] = useState<string>("");

  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [filmOptions, setFilmOptions] = useState<string[]>([]);
  const [homeworldOptions, setHomeworldOptions] = useState<string[]>([]);

  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [selectedFilm, setSelectedFilm] = useState<string>("");
  const [selectedHomeworld, setSelectedHomeworld] = useState<string>("");

  useEffect(() => {

    const fetchSpecies = async () => {
      const all = await fetchData("https://swapi.dev/api/species/")
      if (all) {
        const Names = all.map((item) => item.name)
        setSpeciesOptions(Names)
      }
    };
    const fetchPlanets = async () => {
      const all = await fetchData("https://swapi.dev/api/planets/")
      if (all) {
        const Names = all.map((item) => item.name)
        setHomeworldOptions(Names)
      }
    };
    const fetchFilms = async () => {
      const all = await fetchData("https://swapi.dev/api/films/")
      if (all) {
        const Names = all.map((item) => item.title)
        setFilmOptions(Names)
      }
    };
    const fetchCharacters = async () => {
      try {
        let all: any[] = [];
        let nextUrl = "https://swapi.dev/api/people/";
    
        while (nextUrl) {
          const response = await axios.get(nextUrl);
          const data = response.data;
          all = [...all, ...data.results];
          setAllCharacters(all)
          nextUrl = data.next;
        }
       
      } catch (error) {
        setError("error")
      }
      
    };
    fetchSpecies();
    fetchPlanets();
    fetchFilms();
    fetchCharacters()

  }, []);



  useEffect(() => {
    setIsNextDisabled(true)
    setIsPreviousDisabled(true)
    let filteredCharacters = allCharacters;
    // let page: number = pageNumber

    // Filter by selected film
    if (selectedFilm !== "") {
      setPageNumber(1)
      filteredCharacters = filteredCharacters.filter((character) => {
        return character.films.some((film) => {
          const parts = film.split("/");
          const lastPart = parts[parts.length - 2];
          return filmOptions[parseInt(lastPart) - 1] === selectedFilm;
        });
      });
    }

    // Filter by selected species
    if (selectedSpecies !== "") {
      setPageNumber(1)
      filteredCharacters = filteredCharacters.filter((character) => {
        return character.species.some((species) => {
          const parts = species.split("/");
          const lastPart = parts[parts.length - 2];
          return speciesOptions[parseInt(lastPart) - 1] === selectedSpecies;
        });
      });
    }

    // Filter by selected homeworld
    if (selectedHomeworld !== "") {
      setPageNumber(1)
      filteredCharacters = filteredCharacters.filter((character) => {
        if (character.homeworld) {
          const parts = character.homeworld.split("/");
          const lastPart = parts[parts.length - 2];
          return homeworldOptions[parseInt(lastPart) - 1] === selectedHomeworld;
        }
        return false;
      });
    }
    if (originalSearch !== "") {
      filteredCharacters = filteredCharacters.filter(character =>
        character.name.toLowerCase().includes(originalSearch.toLowerCase())
      );
    }

    // Update current page characters
    setCurrentPageCharacters(filteredCharacters.slice(pageNumber * 10 - 10, pageNumber * 10));
    setFilterCharacters(filteredCharacters)
    if (allCharacters.length != 0) {
      setLoading(false)
      let currentCharacters = filteredCharacters.slice(pageNumber * 10 - 10, pageNumber * 10)
      if (filteredCharacters[allCharacters.length - 1] !== currentCharacters[currentCharacters.length - 1]) {
        setIsNextDisabled(false)
      }
      if (filteredCharacters[0] !== currentCharacters[0]) {
        setIsPreviousDisabled(false)
      }
    }
    else {
      setLoading(true)
    }
  }, [selectedFilm, selectedSpecies, selectedHomeworld, allCharacters, originalSearch]);

  useEffect(() => {
    setIsNextDisabled(true)
    setIsPreviousDisabled(true)
    let currentCharacters = filterCharacters.slice(pageNumber * 10 - 10, pageNumber * 10)
    setCurrentPageCharacters(currentCharacters);
    if (filterCharacters[filterCharacters.length - 1] !== currentCharacters[currentCharacters.length - 1]) {
      setIsNextDisabled(false)
    }
    if (filterCharacters[0] !== currentCharacters[0]) {
      setIsPreviousDisabled(false)
    }
  }, [pageNumber])

  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <header className="App-header">Star Wars characters</header>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOriginalSearch(search);
            setPageNumber(1)
          }}
        >
          <input
            type="input"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit"> search </button>
        </form>
        <select
          value={selectedHomeworld}
          onChange={(e) => {
            setSelectedHomeworld(e.target.value)
          }
          }
        >
          <option value="">All Homeworlds</option>
          {homeworldOptions.map((homeworld) => (
            <option key={homeworld} value={homeworld}>
              {homeworld}
            </option>
          ))}
        </select>
        <select
          value={selectedFilm}
          onChange={(e) => {
            setSelectedFilm(e.target.value)
          }}
        >
          <option value="">All Films</option>
          {filmOptions.map((film) => (
            <option key={film} value={film}>
              {film}
            </option>
          ))}
        </select>
        <select
          value={selectedSpecies}
          onChange={(e) => {
            setSelectedSpecies(e.target.value)

          }
          }
        >
          <option value="">All Species</option>
          {speciesOptions.map((speccy) => (
            <option key={speccy} value={speccy}>
              {speccy}
            </option>
          ))}
        </select>
      </div>

      {loading ? <Loading /> : <CardsList
        currentPageCharacters={currentPageCharacters}
        pageNumber={pageNumber}
      />
      }
      <Pagination
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default App;
