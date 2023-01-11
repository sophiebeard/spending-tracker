import { useState, useEffect } from 'react';
import AppBar from './components/AppBar.js';
import TransactionForm from './components/TransactionForm.js';

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
      <TransactionForm fetchTransaction={fetchTransaction} />
      <br />
      <section>
        <table>
          <thead>
            <th>
              Amount
            </th>
            <th>
              Description
            </th>
            <th>
              Date
            </th>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx._id} >
                <td>
                  {trx.amount}
                </td>
                <td>
                  {trx.description}
                </td>
                <td>
                  {trx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;