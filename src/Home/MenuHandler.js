// MenuHandler.js
import React from 'react';

const MenuHandler = ({ onMenuHandler }) => {
    const handleMenuHandler = () => {
        onMenuHandler();
    };

    return (
        <button onClick={handleMenuHandler}>Tampilkan Menu</button>
    );
};

export default MenuHandler;
