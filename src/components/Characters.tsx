import React, { useState, useRef } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import {
    IonButtons,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
  } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import CharacterModal from './CharacterModal';

// The Characters component receives a list of characters and a title as props
const Characters: React.FC = ({characters, title} :any) => {

    // State variables for showing/hiding the modal and selecting an active character
    const [showModal, setShowModal] = useState(false);
    const [activeCharacter, setActiveCharacter] = useState(null);

    // Function to open the modal and set the active character
    const openModal = (character) => {
        setActiveCharacter(character);
        setShowModal(true);
    };

    // Function to close the modal and reset the active character
    const closeModal = () => {
        setActiveCharacter(null);
        setShowModal(false);
    };

    return (
        <div>
            {/* Map over the list of characters and display their information in a card */}
            {characters.map((character) => (
                <div key={character.name}>
                    <ion-card>
                        {/* Randomly generate a picture from https://picsum.photos/ */}
                        <img src={`https://picsum.photos/600/300/?random=${Math.floor(Math.random() * 1000)}`} />
                        <ion-card-header>
                            <ion-card-title>{character.name}</ion-card-title>
                            <ion-card-subtitle>{character.created}</ion-card-subtitle>
                        </ion-card-header>

                        <ion-card-content>
                            <ul>
                                <li>Height: {character.height}</li>
                                <li>Mass: {character.mass}</li>
                                <li>Birthday: {character.birth_year}</li>
                            </ul>
                            {/* Button to open the modal and pass the active character as a prop */}
                            <IonButton id="open-modal" expand="block" onClick={() => openModal(character)}>
                                Open
                            </IonButton>
                        </ion-card-content>
                    </ion-card> 
                </div>    
            ))}
            {/* Render the CharacterModal component with the showModal, closeModal, and activeCharacter props */}
            <CharacterModal showModal={showModal} closeModal={closeModal} character={activeCharacter} />
        </div>
    );
};

export default Characters;
