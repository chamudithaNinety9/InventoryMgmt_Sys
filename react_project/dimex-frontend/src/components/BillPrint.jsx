import React, { useState, useEffect } from 'react';

const BillPrint = ({ sellingItems, date, time }) => {
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    const currentInvoiceNumber = localStorage.getItem('invoiceNumber') || '000000';
    const nextInvoiceNumber = generateInvoiceNumber(currentInvoiceNumber);
    localStorage.setItem('invoiceNumber', nextInvoiceNumber);
    setInvoiceNumber(nextInvoiceNumber);
  }, []);

  const generateInvoiceNumber = (currentInvoiceNumber) => {
    let nextInvoiceNumber = parseInt(currentInvoiceNumber, 10) + 1;
    return nextInvoiceNumber.toString().padStart(6, '0');
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  return (
    <div id="printableBill" style={styles.billContainer}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.companyName}>DIMEX ENTERPRISES</h1>
          <p style={styles.contactInfo}>Negombo Road Uhumeeya, Kurunegala</p>
          <p style={styles.contactInfo}>Phone No: 076 7462599 / 075 8002418</p>
          <p style={styles.contactInfo}>Email: dimexenterprises@gmail.com</p>
        </div>
      </header>
      <h2 style={styles.invoiceTitle}>INVOICE</h2>
      
      <div style={styles.invoiceInfo}>
        <div style={styles.invoiceDetails}>
          <p style={styles.dateTime}>{date}</p>
          <p style={styles.dateTime}>{time}</p>
          <p style={styles.invoiceNumber}>
            Invoice No: {invoiceNumber}
          </p>
        </div>
      </div>

      <form style={styles.customerForm}>
        <label style={styles.customerLabel}>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={handleCustomerNameChange}
          style={styles.customerInput}
        />
      </form>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>No</th>
            <th style={styles.tableHeaderCell}>Item Name</th>
            <th style={styles.tableHeaderCell}>Unit Price</th>
            <th style={styles.tableHeaderCell}>Quantity</th>
            <th style={styles.tableHeaderCell}>Discount</th>
            <th style={styles.tableHeaderCell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sellingItems.map((item, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{index + 1}</td>
              <td style={styles.tableCell}>{item.itemName}</td>
              <td style={styles.tableCell}>{item.sellPrice}</td>
              <td style={styles.tableCell}>{item.itemQty}</td>
              <td style={styles.tableCell}>{item.discount}</td>
              <td style={styles.tableCell}>{item.sellTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 style={styles.totalAmount}>
        Total Amount: {sellingItems.reduce((sum, item) => sum + parseFloat(item.sellTotal), 0).toFixed(2)}
      </h4>
    </div>
  );
};

const styles = {
  billContainer: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '30px',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  },
  headerContent: {
    textAlign: 'center',
  },
  companyName: {
    color: '#022956',
    margin: '0',
    fontWeight: 'bold',
    fontSize: '34px',
  },
  contactInfo: {
    fontSize: '16px',
    margin: '5px 0',
  },
  invoiceTitle: {
    textAlign: 'center',
    color: '#3498db',
    marginBottom: '20px',
  },
  invoiceInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  invoiceDetails: {
    textAlign: 'right',
  },
  dateTime: {
    fontSize: '14px',
    margin: '5px 0',
  },
  invoiceNumber: {
    fontSize: '15px',
    margin: '5px 0',
    border: '1px solid #000',
    display: 'inline-block',
    padding: '5px',
  },
  customerForm: {
    marginBottom: '20px',
  },
  customerLabel: {
    fontSize: '15px',
    marginRight: '10px',
  },
  customerInput: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '200px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableHeaderCell: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
  },
  totalAmount: {
    textAlign: 'right',
    marginTop: '20px',
    color: '#2c3e50',
    fontSize: '18px',
  },
};

export default BillPrint;
