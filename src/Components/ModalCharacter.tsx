import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Character, HomeWorld } from "../types";
import axios from "axios";

Modal.setAppElement("#root");

interface Props {
  clickedCharacter: Character;
  setClickedCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
}

const ModalCharacter: React.FC<Props> = ({
  clickedCharacter,
  setClickedCharacter,
}) => {
  const [homeWorld, setHomeWorld] = useState<HomeWorld | null>(null);

  useEffect(() => {
    axios
      .get(`${clickedCharacter.homeworld}`)
      .then((response) => {
        setHomeWorld(response.data);
      })
      .catch(() => {
        setHomeWorld(null);
      });
  }, [clickedCharacter]);

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => setClickedCharacter(null)}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      {clickedCharacter && (
        <div>
          <h2>{clickedCharacter.name}</h2>
          <p>Height: {parseInt(clickedCharacter.height) / 100}m</p>
          {clickedCharacter.mass !== "unknown" && (
            <p>Mass: {clickedCharacter.mass}kg</p>
          )}
          <p>
            Created Date:{" "}
            {new Date(clickedCharacter.created).toLocaleDateString()}
          </p>
          <p>Number Of Films: {clickedCharacter.films.length}</p>
          <p>Birth Year: {clickedCharacter.birth_year}</p>
          {homeWorld && (
            <div className="homeworld">
              <h3>Homeworld</h3>
              {homeWorld.name !== "unknown" && <p>Name: {homeWorld.name}</p>}
              {homeWorld.climate !== "unknown" && (
                <p>Climate: {homeWorld.climate}</p>
              )}
              {homeWorld.terrain !== "unknown" && (
                <p>Terrain: {homeWorld.terrain}</p>
              )}
              <p>Amount Of Residents: {homeWorld.residents.length}</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ModalCharacter;
