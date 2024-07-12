import React , {useState} from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TransactionGraph = ({ customers, transactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleCustomerSelect = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const transactionsForSelectedCustomer = selectedCustomer ? transactions.filter(transaction => transaction.customer_id == selectedCustomer) : [];

  const transactionAmountsByDate = transactionsForSelectedCustomer.reduce((acc, transaction) => {
    acc[transaction.date] = (acc[transaction.date] || 0) + transaction.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(transactionAmountsByDate),
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: Object.values(transactionAmountsByDate),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Box marginTop={8} marginBottom={8}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Customer</InputLabel>
        <Select
          value={selectedCustomer}
          onChange={handleCustomerSelect}
          label="Select Customer"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {customers.map(customer => (
            <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCustomer && (
        <Box marginTop={2}>
          <Bar data={chartData} />
        </Box>
      )}
    </Box>
  );
};

export default TransactionGraph;
