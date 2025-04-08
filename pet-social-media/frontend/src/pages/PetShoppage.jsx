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
  Slider
} from "@mui/material";
import PetModal from "./PetModal";
import ListPetModal from "./ListPetModal";
import pets from "/public/adoptPets/adoptPets.json"; 
import axios from "axios";
import { useEffect } from "react";

const CAT_API_KEY = "live_ZzOakiOgSDcO6JTtdgXG9TBTAuI9z2Q7QOXDDJkYuUcmfuIOlUR0DdbKEO30qui7";
const DOG_API_KEY = "live_YZqOd7eQTWB8Xzy4rgbbODc6BdMABR33Tj3mv4ExyrFNJsOYXtbi5hFKILLl0mWR";


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
  const [maxDistance, setMaxDistance] = useState(15); // max 10 miles default
  const [petList, setPetList] = useState(pets);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedPets = await Promise.all(pets.map(async (pet) => {
        try {
          const apiUrl =
            pet.type === "Cat"
              ? `https://api.thecatapi.com/v1/images/search?api_key=${CAT_API_KEY}`
              : `https://api.thedogapi.com/v1/images/search?api_key=${DOG_API_KEY}`;
  
          const res = await axios.get(apiUrl);
          const imageUrl = res.data[0].url;
  
          return {
            ...pet,
            image: imageUrl,
            gallery: [imageUrl, imageUrl, imageUrl] // you can fetch more if needed
          };
        } catch (err) {
          console.error(`Failed to fetch image for ${pet.name}:`, err);
          return pet;
        }
      }));
  
      setPetList(updatedPets);
    };
  
    fetchImages();
  }, []);

  const filteredPets = petList
  .filter((pet) => {
    return (
      (species === "All" || pet.type === species) &&
      (size === "All" || pet.size === size) &&
      (gender === "All" || pet.gender === gender) &&
      (breed === "" || pet.breed.toLowerCase().includes(breed.toLowerCase())) &&
      (age === "" || pet.age === Number(age)) &&
      parseFloat(pet.distance) <= maxDistance &&
      (search === "" || pet.name.toLowerCase().includes(search.toLowerCase()))
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "Age Ascending":
        return a.age - b.age;
      case "Age Descending":
        return b.age - a.age;
      case "Oldest":
        return a.id - b.id;
      case "Newest Posted":
      default:
        return b.id - a.id;
    }
  });




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

          <Typography gutterBottom>Max Distance: {maxDistance} miles</Typography>
          <Box px={1}>
            <Slider
              value={maxDistance}
              onChange={(e, val) => setMaxDistance(val)}
              valueLabelDisplay="auto"
              step={0.5}
              min={0}
              max={15}
            />
          </Box>


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
              setMaxDistance(15);
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
          {filteredPets.map((pet) => (
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
      {showListModal && (
        <ListPetModal
          onClose={() => setShowListModal(false)}
          onSubmit={(newPet) => {
            const newPetEntry = {
              ...newPet,
              id: Date.now(), // unique ID
              distance: "0 miles away",
              image: newPet.adoption_images?.[0] || "",
              gallery: newPet.adoption_images || [],
            };

            setPetList((prev) => [newPetEntry, ...prev]);
            setShowListModal(false);
          }}
        />
      )}

    </Box>
  );
};

export default PetShopPage;



