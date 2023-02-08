import React from "react";
import TransactionForm from '../components/TransactionForm.js';
import TransactionList from '../components/TransactionList.js';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
    
  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch('http://localhost:4000/transaction');
    const { data } = await res.json();
    setTransactions(data);
  };

  return (
    <Container>
      <TransactionForm fetchTransaction={fetchTransaction} editTransaction={editTransaction} />
      <TransactionList transactions={transactions} fetchTransaction={fetchTransaction} setEditTransaction={setEditTransaction} />
    </Container>
  );
}