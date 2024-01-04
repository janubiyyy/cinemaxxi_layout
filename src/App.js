import React, { useState } from 'react';
import SeatConfiguration from '../src/Home/SeatConfiguration';
import MenuHandler from '../src/Home/MenuHandler';
import AppContent from '../src/Home/AppContent';
import './App.css';

const App = () => {
  const [seats, setSeats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [output, setOutput] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.toLocaleString('default', { month: 'long' })}-${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
  };

  const configureSeats = () => {
    const labelInput = prompt('Masukkan Label Kursi (contoh: A)');
    if (labelInput === null) {
      return;
    }

    const label = labelInput.toUpperCase();

    const numberOfSeatsInput = prompt('Masukkan Jumlah Kursi (max 20)');
    if (numberOfSeatsInput === null) {
      return;
    }

    const numberOfSeats = parseInt(numberOfSeatsInput, 10);

    if (numberOfSeats > 20 || isNaN(numberOfSeats) || numberOfSeats <= 0) {
      alert('Jumlah kursi tidak valid. Harap masukkan jumlah kursi antara 1 dan 20.');
      return;
    }

    const newSeats = Array.from({ length: numberOfSeats }, (_, index) => ({
      code: `${label}${index + 1}`,
      status: 'Free',
    }));

    setSeats(newSeats);
    setOutput(`=================== Aplikasi Cinema XXI Layout (kursi tersedia ${label}-${numberOfSeats}) ===================`);
    alert(`Kursi berhasil dikonfigurasi:
      - Label Kursi: ${label}
      - Jumlah Kursi: ${numberOfSeats}`);
  };

  const bookSeat = (seatCode) => {
    const selectedSeat = seats.find((seat) => seat.code === seatCode);

    if (!selectedSeat || selectedSeat.status !== 'Free') {
      alert(`Kursi ${seatCode} tidak tersedia atau sudah dipesan.`);
      return;
    }

    const updatedSeats = seats.map((seat) =>
      seat.code === seatCode ? { ...seat, status: 'Sold' } : seat
    );

    setSeats(updatedSeats);

    const transaction = { seatCode, datetime: getCurrentDateTime() };
    setTransactions([...transactions, transaction]);

    displaySeatsStatus();
    displayTransactionStatus();

    alert(`Kursi ${seatCode} berhasil dipesan!`);
  };

  const cancelSeat = (seatCode) => {
    const selectedSeat = seats.find((seat) => seat.code === seatCode);

    if (!selectedSeat || selectedSeat.status !== 'Sold') {
      alert(`Kursi ${seatCode} tidak dapat dibatalkan karena belum dipesan atau sudah dibatalkan sebelumnya.`);
      return;
    }

    const updatedSeats = seats.map((seat) =>
      seat.code === seatCode ? { ...seat, status: 'Free' } : seat
    );

    setSeats(updatedSeats);

    displaySeatsStatus();
    displayTransactionStatus();

    alert(`Pembatalan kursi ${seatCode} berhasil!`);
  };

  const displaySeatsStatus = () => {
    const seatsStatus = seats.map((seat) => `${seat.code} - ${seat.status}`);
    const seatsStatusOutput = `${seatsStatus.join('\n')}`;

    alert(`Denah Status\n${seatsStatusOutput}`);
  };

  const displayTransactionStatus = () => {
    const soldSeats = transactions.map((transaction) => transaction.seatCode);
    const transactionStatus = `Total ${soldSeats.length} Free, ${seats.length - soldSeats.length} Sold, format (seat_code, datetime)\n`;

    const transactionsOutput = transactions.map(
      (transaction) => `${transaction.seatCode}, ${transaction.datetime}`
    );
    const transactionStatusOutput = `${transactionStatus}${transactionsOutput.join('\n')}`;

    alert(`Transaction Status\n${transactionStatusOutput}`);
  };

  const handleConfigureSeats = () => {
    configureSeats();
  };

  const handleMenuHandler = () => {
    const userInput = prompt(`
      A) Pemesanan Kursi —> book_seat {seat_code}
      B) Batalkan Kursi —> cancel_seat {seat_code}
      C) Laporan Denah —> seats_status
      D) Laporan Transaksi —> transaction_status
      Masukkan ‘Exit' untuk keluar.
      
      Masukkan pilihan menu
    `);

    if (userInput === null || userInput.trim() === '') {
      return;
    }

    const userChoice = userInput.toUpperCase();

    switch (userChoice) {
      case 'A':
        const seatToBook = prompt('Masukkan kode kursi yang ingin dipesan:');
        if (seatToBook) {
          bookSeat(seatToBook);
        }
        break;
      case 'B':
        const seatToCancel = prompt('Masukkan kode kursi yang ingin dibatalkan:');
        if (seatToCancel) {
          cancelSeat(seatToCancel);
        }
        break;
      case 'C':
        displaySeatsStatus();
        break;
      case 'D':
        displayTransactionStatus();
        break;
      case 'EXIT':
        alert('Terima kasih! Program dihentikan.');
        break;
      default:
        alert('Pilihan tidak valid.');
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 style={{ color: '#006563', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Selamat Datang
          <img
            src="https://21cineplex.com//theme/v5/assets/img/logo.png"
            alt="Cinema XXI Logo"
            style={{ width: '180px', height: 'auto', marginLeft: '10px' }}
          />
        </h1>
        <SeatConfiguration onConfigureSeats={handleConfigureSeats} />
        <div className="seat-info">
          <AppContent seats={seats} onSeatClick={bookSeat} output={output} />
        </div>
        <MenuHandler onMenuHandler={handleMenuHandler} />
      </div>
    </div>

  );
};

export default App;
