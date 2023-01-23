import { useState, useEffect } from 'react';
import AppBar from './components/AppBar.js';
import TransactionForm from './components/TransactionForm.js';
import TransactionList from './components/TransactionList.js';
import { Container } from '@mui/material';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch('http://localhost:4000/transaction');
    const { data } = await res.json();
    setTransactions(data);
  };

  return (
    <div>
      <AppBar />
      <Container>
        <TransactionForm fetchTransaction={fetchTransaction} />
        <TransactionList transactions={transactions} fetchTransaction={fetchTransaction} />
      </Container>
    </div>
  );
};

export default App;