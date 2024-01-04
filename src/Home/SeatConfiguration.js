// SeatConfiguration.js
import React from 'react';

const SeatConfiguration = ({ onConfigureSeats }) => {
    const handleConfigureSeats = () => {
        onConfigureSeats();
    };

    return (
        <button onClick={handleConfigureSeats}>Konfigurasi Denah Studio</button>
    );
};

export default SeatConfiguration;
