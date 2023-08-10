import { Container, Typography, TextField, Button } from '@mui/material';

function Contact(){

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
      };


    return (
        <Container maxWidth="sm" style={{marginTop:"10px"}}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>
      );
}

export default Contact;