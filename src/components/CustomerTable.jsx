import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

import TransactionGraph from './TransactionGraph';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await axios.get('http://localhost:3001/customers');
        const transactionRes = await axios.get('http://localhost:3001/transactions');
        setCustomers(customerRes.data);
        setTransactions(transactionRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleMinAmount = (event) => {
    setMinAmount(event.target.value);
  };

  const handleMaxAmount = (event) => {
    setMaxAmount(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchName('');
    setMinAmount('');
    setMaxAmount('');
  };


  const filteredTransactions = transactions.filter(transaction => {
    const customer = customers.find(customer => customer.id == transaction.customer_id);
    const matchesName = customer ? customer.name.toLowerCase().includes(searchName.toLowerCase()) : false;
    const matchesMinAmount = minAmount ? transaction.amount >= parseFloat(minAmount) : true;
    const matchesMaxAmount = maxAmount ? transaction.amount <= parseFloat(maxAmount) : true;
    return matchesName && matchesMinAmount && matchesMaxAmount;
  });

  const transactionsToDisplay = searchName || minAmount || maxAmount ? filteredTransactions : transactions;


  return (
    <div>
      <Box display="flex" gap={2} marginBottom={2}>
        <TextField 
          label="Search by Customer Name" 
          variant="outlined" 
          fullWidth 
          onChange={handleSearchName} 
          value={searchName} 
        />
        <TextField 
          label="Min Transaction Amount" 
          variant="outlined" 
          fullWidth 
          onChange={handleMinAmount} 
          value={minAmount} 
        />
        <TextField 
          label="Max Transaction Amount" 
          variant="outlined" 
          fullWidth 
          onChange={handleMaxAmount} 
          value={maxAmount} 
        />
        <Button variant="contained" color="secondary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Transaction Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsToDisplay.map(transaction => {
              const customer = customers.find(customer => customer.id == transaction.customer_id);
              return (
                <TableRow key={transaction.id}>
                  <TableCell>{customer ? customer.name : 'Unknown'}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TransactionGraph customers={customers} transactions={transactions}/>
    </div>
  );
};

export default CustomerTable;
