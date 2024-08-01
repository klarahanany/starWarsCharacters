import React, { useState } from "react";
import { Character } from "../types";
import "./style.scss";
import ModalCharacter from "./ModalCharacter";
import SingleCard from "./SingleCard";

// Define the props interface for the CardsList component
interface Props {
  currentPageCharacters: Character[];
  pageNumber: number;
}

// Define the CardsList functional component
const CardsList: React.FC<Props> = ({ currentPageCharacters, pageNumber }) => {
  // State to keep track of the clicked character for modal display
  const [clickedCharacter, setClickedCharacter] = useState<Character | null>(null);

  return (
    <div className="cardsList">
      {currentPageCharacters &&
        currentPageCharacters.map((character, index) => (
          <SingleCard
            key={index}
            setClickedCharacter={setClickedCharacter}
            index={index}
            character={character}
            pageNumber={pageNumber}
          />
        ))}
      {clickedCharacter && (
        <ModalCharacter
          clickedCharacter={clickedCharacter}
          setClickedCharacter={setClickedCharacter}
        />
      )}
    </div>
  );
};

export default CardsList;
