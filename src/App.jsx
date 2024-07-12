import React, { useState } from 'react';
import CustomerTable from './components/CustomerTable';
import './App.css';

function App() {

  return (
    <div className="App">

      <h1>Customer Transactions</h1>
      <CustomerTable />

    </div>
  );
}

export default App;
