import { IonButton, IonModal } from '@ionic/react';
import React, { useEffect, useState } from 'react';

const CharacterModal = ({ showModal, closeModal, character }) => {
  console.log("character: ");
  console.log(character);
  
  // Set up state for planet and loading status
  const [planet, setPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch planet data when component mounts or character changes
  useEffect(() => {
    const fetchPlanet = async () => {
      if (!character.homeworld) return;
      const response = await fetch(character.homeworld);
      const data = await response.json();
      setPlanet(data);
      setIsLoading(false);
    };

    fetchPlanet();
  }, [character]);

  return (
    // Render modal with character details and planet data
    <IonModal isOpen={showModal} onDidDismiss={closeModal}>
      <ion-header>
        <ion-toolbar>
          <ion-title>{character && character.name}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={closeModal}>Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
        <hr/>
      <ion-content>
        <ion-item>
          <ion-label>Height</ion-label>
          <ion-text>{character && character.height}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Mass</ion-label>
          <ion-text>{character && character.mass}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Birth Year</ion-label>
          <ion-text>{character && character.birth_year}</ion-text>
        </ion-item>
        {isLoading ? (
          // Render loading message while planet data is being fetched
          <p>Loading...</p>
        ) : planet && (
          // Render planet data when it is loaded
          <div>
            <ion-item>
              <ion-label>Planet</ion-label>
              <ion-text>{planet.name}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Diameter</ion-label>
              <ion-text>{planet.diameter}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Climate</ion-label>
              <ion-text>{planet.climate}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Terrain</ion-label>
              <ion-text>{planet.terrain}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Population</ion-label>
              <ion-text>{planet.population}</ion-text>
            </ion-item>
          </div>
        )}
      </ion-content>
    </IonModal>
  );
};

export default CharacterModal;
