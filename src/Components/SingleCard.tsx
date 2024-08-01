import React, { useEffect, useState } from "react";
import { speciesColors } from "../constants";
import { Character, Species } from "../types";
import axios from "axios";

interface Props {
  character: Character;
  index: number;
  setClickedCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  pageNumber: number;
}

const getSpeciesColor = (species: string): string => {
  const normalizedSpecies = species as Species;
  return speciesColors[normalizedSpecies] || speciesColors.unknown;
};

const CharacterCard: React.FC<Props> = ({
  character,
  index,
  setClickedCharacter,
  pageNumber,
}) => {
  const [species, setSpecies] = useState<string>("unknown");

  useEffect(() => {
    if (character.species.length > 0) {
      axios
        .get(character.species[0])
        .then((response) => {
          setSpecies(
            response.data.name.toLowerCase().replace(" ", "").replace("'", "")
          );
        })
        .catch((error) => {
          console.error("Failed to fetch species data:", error);
          setSpecies("unknown");
        });
    } else {
      setSpecies("unknown");
    }
  }, [character]);

  return (
    <div
      className="card"
      key={character.name}
      onClick={() => setClickedCharacter(character)}
      style={{ backgroundColor: getSpeciesColor(species) }}
    >
      <header>{character.name}</header>
      <img
        src={`https://picsum.photos/200/300?random=${index + pageNumber * 10}`}
        alt={character.name}
      />
    </div>
  );
};

export default CharacterCard;
