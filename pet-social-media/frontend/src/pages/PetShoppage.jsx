// src/pages/PetShopPage.jsx
import React, { useState } from "react";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import PetModal from "./PetModal";
import ListPetModal from "./ListPetModal";

const pets = [
  {
    id: 1,
    name: "Autumn",
    breed: "British Shorthair",
    age: 2,
    type: "Cat",
    distance: "2.5 miles away",
    image: "/public/golden_retriever_pfp.jpg",
  },
  {
    id: 2,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/pedigree/puppy1.jpg",
  },
  {
    id: 3,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens3.jpg",
  },
  {
    id: 4,
    name: "Autumn",
    breed: "British Shorthair",
    age: 2,
    type: "Cat",
    distance: "2.5 miles away",
    image: "/public/golden_retriever_pfp.jpg",
  },
  {
    id: 5,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 6,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 5,
    name: "Rufus",
    breed: "Shitzu",
    age: 5,
    type: "Dog",
    distance: "4 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
  {
    id: 6,
    name: "Neo",
    breed: "Turkish Angora",
    age: 2,
    type: "Cat",
    distance: "5.5 miles away",
    image: "/public/kitten_breeder/three_kittens2.jpg",
  },
];

const PetShopPage = () => {
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showListModal, setShowListModal] = useState(false);
  const [species, setSpecies] = useState("All");
  const [size, setSize] = useState("All");
  const [gender, setGender] = useState("All");
  const [sortBy, setSortBy] = useState("Newest Posted");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");


  return (
    <Box sx={{ p: 3, backgroundColor: "#fafffa", minHeight: "100vh", marginRight: 1, }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d5f8c7",
          p: 2,
          borderRadius: 3,
          marginRight: 1,
          mb: 3,
          boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ marginLeft: 1,}}>
          PetShelter
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => setShowListModal(true)}
          sx={{ backgroundColor: "#000", 
            borderRadius: 1,
            marginRight: 1,
            "&:hover": { backgroundColor: "#333" } }}
        >
          List a Pet
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 4, marginRight: 1, }}>
        {/* Filters */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Search pets..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          <Typography variant="h6">Filters</Typography>

          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <InputLabel>Species</InputLabel>
            <Select value={species} label="Species" onChange={(e) => setSpecies(e.target.value)}>
              {["All", "Cat", "Dog"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <InputLabel>Size</InputLabel>
            <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
              {["All", "Small", "Medium", "Large"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
              {["All", "Male", "Female"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              {["Newest Posted", "Oldest", "Age Ascending", "Age Descending"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          {/* ✅ Reset Button */}
          <Button
            variant="outlined"
            onClick={() => {
              setSpecies("All");
              setSize("All");
              setGender("All");
              setSortBy("Newest Posted");
              setBreed("");
              setAge("");
              setLocation("");
              setSearch("");
            }}
            sx={{
              mt: 1,
              borderRadius: "8px",
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#000",
              borderColor: "#000",
              '&:hover': {
                backgroundColor: "#333",
                borderColor: "#000",
              },
            }}
          >
            Reset Filters
          </Button>

        </Box>

        {/* Results */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 4,
          }}
        >
          {pets.map((pet) => (
            <Card
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: '12px',
                height: "100%",
                maxHeight: 500,
                cursor: "pointer",
                transition: "transform 0.2s ease",
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={pet.image}
                alt={pet.name}
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: "#e0e0e0",
                      px: 1,
                      borderRadius: "10px",
                      fontWeight: 500,
                    }}
                  >
                    {pet.type}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {pet.age} years old • {pet.breed}
                </Typography>
                <Box mt={1} display="flex" alignItems="center" color="text.secondary">
                  <FaMapMarkerAlt style={{ marginRight: "5px" }} /> {pet.distance}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Box>

      {selectedPet && <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />}
      {showListModal && <ListPetModal onClose={() => setShowListModal(false)} />}
    </Box>
  );
};

export default PetShopPage;



