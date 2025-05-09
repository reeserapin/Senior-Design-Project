import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Popover,
  Grid
} from '@mui/material';
import { Send, EmojiEmotions, AttachFile, PhotoCamera, Search, Close } from '@mui/icons-material';

// Common emoji sets
const EMOJI_SETS = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
  symbols: ['👍', '👎', '👌', '🤌', '👏', '🙌', '🤞', '✌️', '🤟', '🤘', '👊', '✊', '👋', '🤚', '🖐️', '✋', '🖖', '👆', '👇', '👈', '👉', '👍', '👎', '👏', '🙏']
};

const allConversations = {
    users: {
      'Sarah Williams': [
        { sender: 'Sarah Williams', time: '10:30 AM', message: "Hi! How's Luna settling in? I'd love to see some pictures!" },
        { sender: 'Me', time: '10:35 AM', message: "She's doing great! Here's her favorite spot.", image: '/luna-grass.jpg' },
        { sender: 'Sarah Williams', time: '10:36 AM', message: "Aww she looks so happy 😍 Has she met your other pets yet?" },
        { sender: 'Me', time: '10:38 AM', message: "Not yet! I'm introducing them slowly. Planning to have them meet later this week." },
        { sender: 'Sarah Williams', time: '10:40 AM', message: "That's smart. Luna seems like such a sweetheart, I'm sure they'll get along." },
        { sender: 'Me', time: '10:41 AM', message: "Fingers crossed! I'll send more pics soon 🐾" }
      ],
      'Reese Rapin': [
        { sender: 'Reese Rapin', time: '9:15 AM', message: "Have you seen my orange tabby? He ran out last night :(" },
        { sender: 'Me', time: '9:17 AM', message: "Oh no! I'll keep an eye out. What's his name?" },
        { sender: 'Reese Rapin', time: '9:18 AM', message: "His name's Pumpkin. He's got a blue collar with little stars on it." },
        { sender: 'Me', time: '9:20 AM', message: "Got it. When was the last time you saw him?" },
        { sender: 'Reese Rapin', time: '9:22 AM', message: "Around 11 PM near the back porch. He chased a raccoon and didn't come back." },
        { sender: 'Me', time: '9:24 AM', message: "I'll check my yard and post in the local group chat too. Hope he comes home soon!" },
        { sender: 'Reese Rapin', time: '9:25 AM', message: "Thanks so much! I'm worried sick 😞" }
      ],
      'Alison Wu': [
        { sender: 'Alison Wu', time: '11:02 AM', message: "Just adopted a bunny!! Her ears are SO big omg." },
        { sender: 'Me', time: '11:04 AM', message: "Aww I need pics!! What's her name?" },
        { sender: 'Alison Wu', time: '11:05 AM', message: "Her name's Mochi. She's all white with a little pink nose and the fluffiest tail 🐇" },
        { sender: 'Me', time: '11:06 AM', message: "Mochi is the cutest name omg 🥹 Is she shy or cuddly?" },
        { sender: 'Alison Wu', time: '11:08 AM', message: "Very shy! But she lets me feed her from my hand now. Small wins 😭" },
        { sender: 'Me', time: '11:10 AM', message: "That's so sweet. Can't wait to meet her. You should bring her to the park next week!" }
      ]
    },
    shelters: {
      'Happy Paws Shelter': [
        { sender: 'Happy Paws Shelter', time: '8:00 AM', message: "Thanks for your interest in Luna! She's one of our favorites." },
        { sender: 'Me', time: '8:05 AM', message: "She's doing well! I'll send an update soon." },
        { sender: 'Happy Paws Shelter', time: '8:06 AM', message: "We're so happy to hear that 🥰 Did she settle in okay her first night?" },
        { sender: 'Me', time: '8:08 AM', message: "Yes! She was nervous at first but slept curled up on the couch with her toy by midnight." },
        { sender: 'Happy Paws Shelter', time: '8:10 AM', message: "That's amazing. Feel free to reach out anytime for questions or support!" }
      ]
    }
  };
  

export default function ChatPage() {
  const [selectedCategory, setSelectedCategory] = useState('users');
  const [selectedPerson, setSelectedPerson] = useState(Object.keys(allConversations.users)[0]);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(allConversations);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [emojiPickerAnchor, setEmojiPickerAnchor] = useState(null);
  const [currentEmojiSet, setCurrentEmojiSet] = useState('smileys');
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const people = Object.keys(conversations[selectedCategory]);
  const chat = conversations[selectedCategory][selectedPerson] || [];

  // Scroll to bottom of chat on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Clean up camera stream when dialog closes
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleSendMessage = () => {
    if ((!messageText.trim() && !imagePreview) || messageText.length > 500) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessage = {
      sender: 'Me',
      time: timeString,
      message: messageText.trim(),
      ...(imagePreview && { image: imagePreview })
    };
    
    const updatedConversations = {...conversations};
    updatedConversations[selectedCategory][selectedPerson] = [
      ...updatedConversations[selectedCategory][selectedPerson],
      newMessage
    ];
    
    setConversations(updatedConversations);
    setMessageText('');
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const handleOpenCamera = async () => {
    setShowCamera(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const handleCaptureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas content to data URL
      const imageDataUrl = canvas.toDataURL('image/png');
      setImagePreview(imageDataUrl);
      
      // Close camera dialog and stop stream
      handleCloseCamera();
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setShowCamera(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleEmojiPickerOpen = (event) => {
    setEmojiPickerAnchor(event.currentTarget);
  };

  const handleEmojiPickerClose = () => {
    setEmojiPickerAnchor(null);
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText((prev) => prev + emoji);
  };

  const handleEmojiSetChange = (set) => {
    setCurrentEmojiSet(set);
  };

  return (
    <Box sx={{ padding: '1rem', fontFamily: 'McLaren', backgroundColor: '#fff9e7', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffea97', padding: '1rem 1rem 1rem 1rem', borderRadius: 2, mb: 4,mt: 2, mx: 3, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',  }}>
        <Typography variant="h4" fontWeight="bold">PawChat</Typography>
      </Box>

      {/* Body */}
      <Box sx={{ display: 'flex', flex: 1, gap: '2rem', mx: 3,  }}>
        {/* Sidebar */}
        <Box sx={{ backgroundColor: '#fff', padding: 2, height: '80vh', borderRadius: 3, width: 400, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.1)',  }}>
          <TextField
            placeholder="Search conversations..."
            size="small"
            fullWidth
            fontSize='30px'
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#aaa',  }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: '#fff'
              },
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: '0.5rem', mb: 2 }}>
            <Button
              fullWidth
              onClick={() => { setSelectedCategory('shelters'); setSelectedPerson(Object.keys(conversations.shelters)[0]); }}
              sx={{ flex: 1, borderRadius: 2, fontWeight: '600',fontSize:'20px', backgroundColor: selectedCategory === 'shelters' ? '#fde68a' : '#fff', color: '#000' }}

            >
              Sellers
            </Button>
            <Button
              fullWidth

              onClick={() => { setSelectedCategory('users'); setSelectedPerson(Object.keys(conversations.users)[0]); }}
              sx={{ flex: 1, borderRadius: 2, fontWeight: '600',fontSize:'20px', backgroundColor: selectedCategory === 'users' ? '#fde68a' : '#fff', color: '#000' }}
            >
              Users
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' } }}>
            {people.map((person) => (
              <Box key={person} onClick={() => setSelectedPerson(person)}
                sx={{ display: 'flex', alignItems: 'center', p: 1.2, borderRadius: 2, cursor: 'pointer', backgroundColor: person === selectedPerson ? '#fde68a' : '#fffef2' }}>
                <Avatar sx={{ backgroundColor: '#fcd34d', width: 60, height: 60, fontWeight: 'bold', mr: 1 }}>{person.charAt(0)}</Avatar>
                <Box>

                  <Typography fontWeight={400} fontSize={22}>{person}</Typography>
                  <Typography fontSize={16} color="#555">
                    {conversations[selectedCategory][person][0]?.message.slice(0, 30)}...

                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Main Chat */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column',  height: '80vh',backgroundColor: '#fff', padding: 2, borderRadius: 3, overflow: 'hidden' , boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar sx={{ backgroundColor: '#fcd34d', width: 80, height: 80, fontSize: 18 }}>{selectedPerson.charAt(0)}</Avatar>
            <Box>
              <Typography fontWeight={500} fontSize={30}>{selectedPerson}</Typography>
              <Typography fontSize={20} color="#666">Active now</Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, py: 1.5, pr: 1, scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' } }}>
            {chat.map((msg, idx) => (
              <Box key={idx} sx={{ alignSelf: msg.sender === 'Me' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'Me' ? '#f2f2f2' : '#fef3c7', px: 2, py: 1.5, borderRadius: 10, maxWidth: '60%', fontSize: 25 , padding: 3}}>
                <Typography sx={{ fontSize: 20, }}>{msg.message}</Typography>
                {msg.image && <img src={msg.image} alt="chat" style={{ marginTop: 6, maxWidth: 200, borderRadius: 8 }} />}
                <Typography sx={{ fontSize: 15, color: '#888', mt: 0.5, textAlign: 'right' }}>{msg.time}</Typography>
              </Box>
            ))}
            <div ref={messageEndRef} />
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Input */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {imagePreview && (
              <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: 150 }}>
                <img 
                  src={imagePreview} 
                  alt="Selected" 
                  style={{ 
                    maxWidth: '100%', 
                    borderRadius: 8, 
                    border: '1px solid #ddd'
                  }} 
                />
                <IconButton 
                  size="small" 
                  onClick={removeImage}
                  sx={{ 
                    position: 'absolute', 
                    top: -10, 
                    right: -10, 
                    backgroundColor: '#fff', 
                    border: '1px solid #ddd',
                    '&:hover': { backgroundColor: '#f5f5f5' } 
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#fff', 
              borderRadius: '25px', 
              border: '1px solid #ddd', 
              p: '8px 12px', 
              gap: 1 
            }}>
              <IconButton 
                onClick={handleEmojiPickerOpen}
                sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}
              >
                <EmojiEmotions />
              </IconButton>
              
              <TextField
                fullWidth
                variant="standard"
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  style: {
                    fontSize: 20,
                    fontFamily: 'Segoe UI',
                    padding: '6px 0',
                  }
                }}
                sx={{ 
                  flex: 1,
                  '& .MuiInputBase-root': {
                    display: 'flex',
                    alignItems: 'center',
                    height: '36px',
                  }
                }}
              />
              
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileUpload}
              />
              
              <IconButton 
                onClick={handleAttachFile}
                sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}
              >
                <AttachFile />
              </IconButton>
              
              <IconButton 
                onClick={handleOpenCamera}
                sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}
              >
                <PhotoCamera />
              </IconButton>
              
              <IconButton 
                onClick={handleSendMessage}
                sx={{ 
                  backgroundColor: '#facc15', 
                  color: 'black', 
                  borderRadius: '50%', 
                  width: 36, 
                  height: 36, 
                  '&:hover': { backgroundColor: '#eab308' } 
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Camera Dialog */}
      <Dialog 
        open={showCamera} 
        onClose={handleCloseCamera}
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogContent sx={{ p: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: 8 }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button 
            onClick={handleCaptureImage} 
            variant="contained"
            sx={{ 
              backgroundColor: '#facc15', 
              color: 'black', 
              borderRadius: 25,
              px: 3,
              '&:hover': { backgroundColor: '#eab308' } 
            }}
          >
            Take Photo
          </Button>
          <Button 
            onClick={handleCloseCamera} 
            variant="outlined"
            sx={{ 
              borderColor: '#ddd', 
              color: '#666', 
              borderRadius: 25,
              px: 3,
              '&:hover': { borderColor: '#ccc' } 
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Emoji Picker */}
      <Popover
        open={Boolean(emojiPickerAnchor)}
        anchorEl={emojiPickerAnchor}
        onClose={handleEmojiPickerClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ 
          mt: -2,
          '& .MuiPopover-paper': {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            width: 320
          }
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button 
              size="small" 
              variant={currentEmojiSet === 'smileys' ? 'contained' : 'outlined'} 
              onClick={() => handleEmojiSetChange('smileys')}
              sx={{ 
                fontSize: 12, 
                backgroundColor: currentEmojiSet === 'smileys' ? '#fcd34d' : 'white',
                color: currentEmojiSet === 'smileys' ? 'black' : 'inherit',
                '&:hover': {
                  backgroundColor: currentEmojiSet === 'smileys' ? '#fbbf24' : '#f9fafb'
                }
              }}
            >
              Smileys
            </Button>
            <Button 
              size="small" 
              variant={currentEmojiSet === 'animals' ? 'contained' : 'outlined'} 
              onClick={() => handleEmojiSetChange('animals')}
              sx={{ 
                fontSize: 12, 
                backgroundColor: currentEmojiSet === 'animals' ? '#fcd34d' : 'white',
                color: currentEmojiSet === 'animals' ? 'black' : 'inherit',
                '&:hover': {
                  backgroundColor: currentEmojiSet === 'animals' ? '#fbbf24' : '#f9fafb'
                }
              }}
            >
              Animals
            </Button>
            <Button 
              size="small" 
              variant={currentEmojiSet === 'hearts' ? 'contained' : 'outlined'} 
              onClick={() => handleEmojiSetChange('hearts')}
              sx={{ 
                fontSize: 12, 
                backgroundColor: currentEmojiSet === 'hearts' ? '#fcd34d' : 'white',
                color: currentEmojiSet === 'hearts' ? 'black' : 'inherit',
                '&:hover': {
                  backgroundColor: currentEmojiSet === 'hearts' ? '#fbbf24' : '#f9fafb'
                }
              }}
            >
              Hearts
            </Button>
            <Button 
              size="small" 
              variant={currentEmojiSet === 'symbols' ? 'contained' : 'outlined'} 
              onClick={() => handleEmojiSetChange('symbols')}
              sx={{ 
                fontSize: 12, 
                backgroundColor: currentEmojiSet === 'symbols' ? '#fcd34d' : 'white',
                color: currentEmojiSet === 'symbols' ? 'black' : 'inherit',
                '&:hover': {
                  backgroundColor: currentEmojiSet === 'symbols' ? '#fbbf24' : '#f9fafb'
                }
              }}
            >
              Symbols
            </Button>
          </Box>
          
          <Grid container spacing={0.5}>
            {EMOJI_SETS[currentEmojiSet].map((emoji, index) => (
              <Grid item key={index}>
                <Button
                  onClick={() => {
                    handleEmojiSelect(emoji);
                  }}
                  sx={{
                    minWidth: 'auto',
                    padding: '8px',
                    fontSize: '1.4rem',
                    lineHeight: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                  }}
                >
                  {emoji}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}