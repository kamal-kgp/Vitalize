import React, { useState } from 'react';
import ProductCard from '../components/Productcard';
import SearchBar from '../components/Searchbar';
import { Container, Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
function Purchase(){
    const theme = createTheme();
    const [query, setQuery] = useState('');
    const products = [
        {
            id: 1,
            image: 'gym-product-1.jpg',
            primaryText: 'Dumbbell Set',
            secondaryText: 'Set of adjustable dumbbells for strength training.',
            rating: 4.8,
            price: 129.99,
          },
          {
            id: 2,
            image: 'gym-product-2.jpg',
            primaryText: 'Resistance Bands',
            secondaryText: 'Set of resistance bands for versatile workouts.',
            rating: 4.5,
            price: 24.99,
          },
          {
            id: 3,
            image: 'gym-product-3.jpg',
            primaryText: 'Yoga Mat',
            secondaryText: 'High-quality yoga mat for comfortable practice.',
            rating: 4.9,
            price: 39.99,
          },
          {
            id: 4,
            image: 'gym-product-4.jpg',
            primaryText: 'Indoor Cycling Bike',
            secondaryText: 'Stationary bike for intense cardio workouts.',
            rating: 4.7,
            price: 299.99,
          },
          {
            id: 5,
            image: 'gym-product-5.jpg',
            primaryText: 'Jump Rope',
            secondaryText: 'Adjustable jump rope for effective cardio exercises.',
            rating: 4.6,
            price: 14.99,
          },
          {
            id: 6,
            image: 'gym-product-6.jpg',
            primaryText: 'Weight Bench',
            secondaryText: 'Sturdy weight bench for bench pressing and more.',
            rating: 4.8,
            price: 149.99,
          },
          {
            id: 7,
            image: 'gym-product-7.jpg',
            primaryText: 'Kettlebell Set',
            secondaryText: 'Set of kettlebells for total body workouts.',
            rating: 4.5,
            price: 79.99,
          },
          {
            id: 8,
            image: 'gym-product-8.jpg',
            primaryText: 'Gym Gloves',
            secondaryText: 'Protective gloves for weightlifting and training.',
            rating: 4.7,
            price: 19.99,
          },
          {
            id: 9,
            image: 'gym-product-9.jpg',
            primaryText: 'Fitness Tracker',
            secondaryText: 'Wearable fitness tracker to monitor your activity.',
            rating: 4.4,
            price: 89.99,
          },
          {
            id: 10,
            image: 'gym-product-10.jpg',
            primaryText: 'Foam Roller',
            secondaryText: 'Textured foam roller for post-workout recovery.',
            rating: 4.6,
            price: 29.99,
          },
        // Add more products as needed
      ];


      const handleSearch = ()=>{

      }


     return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <SearchBar searchQuery={query} setSearchQuery={setQuery} onSearch={handleSearch}/>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                image={product.image}
                primaryText={product.primaryText}
                secondaryText={product.secondaryText}
                rating={product.rating}
                price={product.price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Purchase;