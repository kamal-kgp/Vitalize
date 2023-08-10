import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';

const ProductCard = ({ image, primaryText, secondaryText, rating, price }) => {
  return (
    <Card elevation={3}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={primaryText}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {primaryText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {secondaryText}
        </Typography>
        <Rating name="product-rating" value={rating} precision={0.5} readOnly />
        <Typography variant="h6" color="primary">
          ${price}
        </Typography>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
