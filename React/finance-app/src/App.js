import React, {useState, useEffect} from 'react'
import api from './api'

// "useState" hook allows to keep state within react, so we know when state changes (shift and change pieces of data).
const App = () => {
  const [transactions, seTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });
  
  // "fetchTransactions" gets all our transactions from the fastAPI application
  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    seTransactions(response.data)
  };

  // "useEffect" hook : when this component loads (app.js), we'll fetch the "fetchTransactions"
  useEffect(() => {
    fetchTransactions();
  }, []);

  // "handleInputChange"
  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  // Line 38: this will prevent form defaulting to submit the form, so we can handle the action of submitting.
  // line 40: when a new transaction is submitted, app will recall all transactions from db to keep application up-to-date in frontend
  // line 42: this will allow when the user fill the form and click submit to keep the data becasue the form submission will overwrite 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };
  
  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Finance App
          </a>
        </div>

      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>

          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
              Amount
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>
          
          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
             Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
             Description
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
             Income?
            </label>
            <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
             Date
            </label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>

        </form>

        <table className='table table-striped table-bordered table-hove'>
        <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td>{transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.is_income ? 'Yes' : 'No'}</td> 
                    <td>{transaction.date}</td>
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
