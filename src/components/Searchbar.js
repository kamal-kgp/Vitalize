import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch  }) => {
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Grid container spacing={2} alignItems="center" sx={{p:2}}>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
