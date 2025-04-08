import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Chip,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { FaPhoneAlt, FaEnvelope, FaHeart, FaTimes } from "react-icons/fa";

const PetModal = ({ pet, onClose }) => {
  if (!pet) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Dialog
      open={!!pet}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", p: 1.5 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {pet.name} - {pet.title || `Playful ${pet.breed}`}
        </Typography>
        <IconButton onClick={onClose}>
          <FaTimes />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          mt={1}
        >
          {/* LEFT: Image + thumbnails */}
          <Box
            flex={1}
            sx={{
              backgroundColor: "#eee",
              borderRadius: 2,
              padding: 2,
            }}
          >
            <Box
              component="img"
              src={pet.image}
              alt={pet.name}
              sx={{
                width: "100%",
                borderRadius: 2,
                border: "2px solid #ccc",
              }}
            />
            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              {pet.gallery?.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`Gallery ${i}`}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                  }}
                />
              ))}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ddd",
                  borderRadius: 1,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                +
              </Box>
            </Box>
          </Box>

          {/* RIGHT: Info */}
          <Box flex={1} display="flex" flexDirection="column" gap={3}>
            {/* Chips */}
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip label={`${pet.age} Years Old`} />
              <Chip label={pet.gender || "Female"} />
              <Chip label={pet.status || "Vaccinated"} />
            </Box>

            {/* About */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                About {pet.name}
              </Typography>
              <Typography variant="body2" mt={0.5}>
                {pet.description ||
                  "This is a lovely and playful pet waiting for a forever home!"}
              </Typography>
            </Box>

            <Divider />

            {/* Shelter Info */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={"/public/Shelter.png"}
                alt="Shelter"
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography fontWeight="bold">
                  {pet.shelter || "Happy Paws Shelter"}
                </Typography>
                <Typography variant="body2">
                  {pet.address || "123 Pet Street, New York"}
                </Typography>
              </Box>
            </Box>

            {/* Buttons with more spacing */}
            <Box display="flex" flexDirection="column" gap={1.2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<FaPhoneAlt />}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                Contact Shelter
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FaEnvelope />}
                sx={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                Send Message
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FaHeart />}
                sx={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                Save to Favorites
              </Button>
            </Box>

            {/* Additional Details: Breed & Size first row, Weight & Color second */}
            <Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              Additional Details
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Breed
                </Typography>
                <Typography variant="body2">{pet.breed}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Size
                </Typography>
                <Typography variant="body2">{pet.size || "Medium"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body2">{pet.weight || "50 lbs"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Color
                </Typography>
                <Typography variant="body2">{pet.color || "Golden"}</Typography>
              </Grid>
            </Grid>
          </Box>

          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PetModal;
