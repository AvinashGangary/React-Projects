import React, { useState } from 'react';

function App() {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtp = () => {
    alert('Entered OTP is ' + otp.join(''));
    setOtp(new Array(6).fill('')); // Reset OTP
  };

  return (
    <div style={styles.app}>
      <div style={styles.otpInput}>
        <h1 style={styles.heading}>OTP Input</h1>
        <div style={styles.inputGroup}>
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
                style={styles.otpBox}
              />
            );
          })}
        </div>
        <button style={styles.button} onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  otpInput: {
    backgroundColor: '#e0f7fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  otpBox: {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    marginRight: '10px',
    fontSize: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#ff7043',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#ff5722',
  }
};

export default App;
