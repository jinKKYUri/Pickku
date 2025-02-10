import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/SearchBar.css';

const SearchBar = ({isOpen, setIsOpen}) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleTest = () => {
    setIsOpen(false);
  }
  
  return (
    <InputGroup className={`search-bar-container ${isOpen ? 'open' : 'disabled'}`}>
      <Form.Control
        className="search-input"
        placeholder="검색"
        aria-describedby="basic-addon2"
        onChange={handleChange}
        value={inputValue}
      />
      <Button variant="outline-light" className="search-button" onClick={handleTest}>
        <svg aria-hidden="true" fill="currentColor" focusable="false" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="24" className="css-7kp13n">
          <path clipRule="evenodd" d="M14.9401 16.2929C13.5799 17.3622 11.8644 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.833 17.3835 13.522 16.3466 14.871L20.7071 19.2315C21.0976 19.622 21.0976 20.2552 20.7071 20.6457C20.3166 21.0362 19.6834 21.0362 19.2929 20.6457L14.9401 16.2929ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg"></path>
        </svg>
      </Button>
    </InputGroup>
  );
}

export default SearchBar;