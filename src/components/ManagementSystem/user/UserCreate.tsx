import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
import axios from 'axios';

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    documentType: '',
    typePerson: '',
    email: '',
    password: '',
    phone: '',
    roleId: ''
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/roles/get')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users/create', formData)
      .then(response => {
        console.log('User created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <Container>
      <Box mt={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Document Type"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type Person"
            name="typePerson"
            value={formData.typePerson}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
            >
              {roles.map(role => (
                <MenuItem key={role._id} value={role._id}>
                  {role.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create User
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserCreate;
