// AppContent.js
import React from 'react';
import Seat from './Seat';

const AppContent = ({ seats, onSeatClick, output }) => {
    return (
        <div>
            {seats.map((seat) => (
                <Seat key={seat.code} seat={seat} onSeatClick={onSeatClick} />
            ))}
            <pre>{output}</pre>
        </div>
    );
};

export default AppContent;
