import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { FaTimes, FaPlus } from "react-icons/fa";

const ListPetModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    age: "",
    gender: "",
    size: "",
    breed: "",
    weight: "",
    color: "",
    status: "",
    description: "",
    adoption_images: [],
    contact_email: "",
    contact_phone: "",
    location: "",
    type: "",
  });

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    if (!mainImage && imageUrls.length > 0) setMainImage(imageUrls[0]);
    setFormData((prev) => ({
      ...prev,
      adoption_images: [...prev.adoption_images, ...imageUrls],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.age || !formData.breed) {
      alert("Please fill out at least name, species, breed, and age.");
      return;
    }
  
    onSubmit(formData);
    onClose();
  };
  

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: 1200,
          bgcolor: "#f8fff1",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            List a New Pet
          </Typography>
          <IconButton onClick={onClose}><FaTimes /></IconButton>
        </Box>

        <Box display="flex" gap={4} mt={2}>
          {/* LEFT COLUMN - IMAGE SECTION */}
          <Box width="30%">
          <Box sx={{ backgroundColor: "#d5f8c7", borderRadius: 2, p: 2 }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                position: "relative",
                borderRadius: 2,
                border: mainImage ? "2px solid #ccc" : "2px dashed #aaa",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => document.getElementById("mainImageInput").click()}
            >
              {mainImage ? (
                <Box
                  component="img"
                  src={mainImage}
                  alt="Main"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <FaPlus style={{ fontSize: "2rem", color: "#777" }} />
              )}
            </Box>

            {/* 🔁 Triggered when clicking image or + icon */}
            <input
              id="mainImageInput"
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* ➕ Add More Button */}
            {mainImage && (
              <Box mt={2} display="flex" justifyContent="center">
                <IconButton
                  onClick={() => document.getElementById("mainImageInput").click()}
                  sx={{
                    backgroundColor: "#ddd",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "#ccc" },
                  }}
                >
                  <FaPlus />
                </IconButton>
              </Box>
            )}

            {/* Gallery thumbnails */}
            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              {formData.adoption_images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`Gallery ${i}`}
                  sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, border: "1px solid #ccc" }}
                />
              ))}
            </Box>
          </Box>
        </Box>


          {/* MIDDLE COLUMN - Text Fields */}
          <Box width="30%" display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/>
            <TextField label="Tag" name="tag" value={formData.tag} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/>
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}>
              <InputLabel>Species</InputLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Email" name="contact_email" value={formData.contact_email} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/>
            <TextField label="Phone" name="contact_phone" value={formData.contact_phone} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/>
          </Box>

          {/* RIGHT COLUMN - About + Grid */}
          <Box width="37%" display="flex" flexDirection="column" gap={2}>
            <TextField
              label="About"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/></Grid>
              <Grid item xs={6}><TextField label="Breed" name="breed" value={formData.breed} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/></Grid>
              <Grid item xs={6}>
              <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}>
                <InputLabel>Gender</InputLabel>
                <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={{ width: '203px' }} // <-- ✅ forces proper width
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                </FormControl>


              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}>
                <InputLabel>Size</InputLabel>
                <Select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    sx={{ width: '203px' }}
                >
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                </Select>
                </FormControl>


              </Grid>
              <Grid item xs={6}><TextField label="Color" name="color" value={formData.color} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/></Grid>
              <Grid item xs={6}><TextField label="Vaccination Status" name="status" value={formData.status} onChange={handleChange} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}/></Grid>
            </Grid>
            <Box mt={2}>
              <Button
                fullWidth
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: 4,
                  fontWeight: "bold",
                  textTransform: "none",
                  '&:hover': { backgroundColor: "#333" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ListPetModal;
