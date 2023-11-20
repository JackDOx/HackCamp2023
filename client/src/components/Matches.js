import React, { useState, useEffect } from 'react';
import HoverableHeader from './HoverableHeader';


const Matches = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/users/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.users);
                setCards(data.users);
            });
    }, []);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    return (
        <div>
            <HoverableHeader />
        <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', width: '100vw', alignContent: 'center' ,
        alignItems: 'center' }}>
            {cards.map((card) => (
                <div
                    key={card.id}
                    style={{ width: '70%', height: '200px', backgroundColor: 'lightgray', margin: '10px', cursor: 'pointer', padding: '20px' }}
                    onClick={() => handleCardClick(card)}
                >
                    <h3>{card.name}</h3>
                    <p>Pronoun: {card.pronoun}</p>
                    <p>Role: {card.userRole}</p>
                    <p>Skill Level: {card.skillLevel}</p>
                    <p>Interest: {card.interests}</p>
                </div>
            ))}
            {selectedCard && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                    <h3>{selectedCard.name}</h3>
                    <p>Pronoun: {selectedCard.pronoun}</p>
                    <p>Role: {selectedCard.userRole}</p>
                    <p>Skill Level: {selectedCard.skillLevel}</p>
                    <p>Interest: {selectedCard.interests}</p>
                    <button onClick={() => setSelectedCard(null)}>Close</button>
                    <button onClick={() => setSelectedCard(null)}>{selectedCard.discordName}</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default Matches;
