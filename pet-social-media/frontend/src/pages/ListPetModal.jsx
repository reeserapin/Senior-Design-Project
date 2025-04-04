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

const ListPetModal = ({ onClose }) => {
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
    console.log("Submitted:", formData);
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
          bgcolor: "#fff",
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
            <Box sx={{ backgroundColor: "#eee", borderRadius: 2, p: 2 }}>
              {mainImage ? (
                <Box
                  component="img"
                  src={mainImage}
                  alt="Main"
                  sx={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 2, border: "2px solid #ccc" }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    border: "2px dashed #aaa",
                    fontSize: "2rem",
                    color: "#777",
                  }}
                >
                  <FaPlus />
                </Box>
              )}
              <input type="file" multiple onChange={handleImageUpload} style={{ marginTop: 10 }} />
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
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Tag" name="tag" value={formData.tag} onChange={handleChange} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Email" name="contact_email" value={formData.contact_email} onChange={handleChange} fullWidth />
            <TextField label="Phone" name="contact_phone" value={formData.contact_phone} onChange={handleChange} fullWidth />
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
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
            />
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Breed" name="breed" value={formData.breed} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
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
              <FormControl fullWidth>
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
              <Grid item xs={6}><TextField label="Color" name="color" value={formData.color} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Vaccination Status" name="status" value={formData.status} onChange={handleChange} fullWidth /></Grid>
            </Grid>
            <Box mt={2}>
              <Button
                fullWidth
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: 2,
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
