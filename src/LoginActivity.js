// src/PasswordGenerator.js
import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = lowerCaseLetters + upperCaseLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    
    setPassword(newPassword);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}>
      <h1>Password Generator</h1>
      <div>
        <label>Length: </label>
        <input 
          type="number" 
          value={length} 
          onChange={(e) => setLength(e.target.value)} 
          min="4" 
          max="20" 
          style={{ padding: '10px', border: '2px solid #add8e6', borderRadius: '5px', width: '50px' }}
        />
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={includeNumbers} 
            onChange={() => setIncludeNumbers(!includeNumbers)} 
            style={{ margin: '10px' }}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={includeSymbols} 
            onChange={() => setIncludeSymbols(!includeSymbols)} 
            style={{ margin: '10px' }}
          />
          Include Symbols
        </label>
      </div>
      <button 
        onClick={generatePassword} 
        style={{ padding: '10px', color: '#fff', backgroundColor: '#ffa07a', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#ff4500'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ffa07a'}
      >
        Generate Password
      </button>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffffff', border: '2px solid #add8e6', borderRadius: '5px' }}>
        <strong>{password}</strong>
      </div>
    </div>
  );
};

export default PasswordGenerator;
