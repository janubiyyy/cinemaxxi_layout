// Seat.js
import React from 'react';

const Seat = ({ seat, onSeatClick }) => {
    const seatStyle = {
        backgroundColor: seat.status === 'Free' ? '#4caf50' : seat.status === 'Sold' ? '#f44336' : '#2196f3',
        color: seat.status === 'Sold' ? '#fff' : '#000',
        cursor: seat.status === 'Free' ? 'pointer' : 'not-allowed',
        width: '40px',
        height: '40px',
        margin: '5px',
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '40px',
        borderRadius: '5px',
    };

    return (
        <div
            className={`seat ${seat.status}`}
            style={seatStyle}
            onClick={() => onSeatClick(seat.code)}
        >
            {seat.code}
        </div>
    );
};

export default Seat;
