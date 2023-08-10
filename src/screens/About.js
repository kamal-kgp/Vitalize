import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom'; // Import if you're using React Router

const theme = createTheme();

const features = [
  {
    id: 1,
    image: 'image-url-1.jpg',
    primaryText: 'Feature 1',
    secondaryText: 'Description of feature 1...',
    link: '/feature-1', // Redirect link using React Router
  },
  {
    id: 2,
    image: 'image-url-2.jpg',
    primaryText: 'Feature 2',
    secondaryText: 'Description of feature 2...',
    link: '/feature-2', // Redirect link using React Router
  },
  // Add more features as needed
];

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.id}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.primaryText}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {feature.primaryText}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.secondaryText}
                  </Typography>
                  <Button
                    component={Link}
                    to={feature.link}
                    variant="contained"
                    color="primary"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default About;
