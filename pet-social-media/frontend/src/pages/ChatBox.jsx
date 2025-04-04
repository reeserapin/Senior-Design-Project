import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  InputAdornment
} from '@mui/material';
import { Send, EmojiEmotions, AttachFile, PhotoCamera, Search } from '@mui/icons-material';

const allConversations = {
    users: {
      'Sarah Williams': [
        { sender: 'Sarah Williams', time: '10:30 AM', message: "Hi! How's Luna settling in? I'd love to see some pictures!" },
        { sender: 'Me', time: '10:35 AM', message: "She’s doing great! Here's her favorite spot.", image: '/luna-grass.jpg' },
        { sender: 'Sarah Williams', time: '10:36 AM', message: "Aww she looks so happy 😍 Has she met your other pets yet?" },
        { sender: 'Me', time: '10:38 AM', message: "Not yet! I’m introducing them slowly. Planning to have them meet later this week." },
        { sender: 'Sarah Williams', time: '10:40 AM', message: "That’s smart. Luna seems like such a sweetheart, I’m sure they’ll get along." },
        { sender: 'Me', time: '10:41 AM', message: "Fingers crossed! I’ll send more pics soon 🐾" }
      ],
      'Reese Rapin': [
        { sender: 'Reese Rapin', time: '9:15 AM', message: "Have you seen my orange tabby? He ran out last night :(" },
        { sender: 'Me', time: '9:17 AM', message: "Oh no! I’ll keep an eye out. What’s his name?" },
        { sender: 'Reese Rapin', time: '9:18 AM', message: "His name’s Pumpkin. He’s got a blue collar with little stars on it." },
        { sender: 'Me', time: '9:20 AM', message: "Got it. When was the last time you saw him?" },
        { sender: 'Reese Rapin', time: '9:22 AM', message: "Around 11 PM near the back porch. He chased a raccoon and didn’t come back." },
        { sender: 'Me', time: '9:24 AM', message: "I’ll check my yard and post in the local group chat too. Hope he comes home soon!" },
        { sender: 'Reese Rapin', time: '9:25 AM', message: "Thanks so much! I’m worried sick 😞" }
      ],
      'Alison Wu': [
        { sender: 'Alison Wu', time: '11:02 AM', message: "Just adopted a bunny!! Her ears are SO big omg." },
        { sender: 'Me', time: '11:04 AM', message: "Aww I need pics!! What’s her name?" },
        { sender: 'Alison Wu', time: '11:05 AM', message: "Her name’s Mochi. She’s all white with a little pink nose and the fluffiest tail 🐇" },
        { sender: 'Me', time: '11:06 AM', message: "Mochi is the cutest name omg 🥹 Is she shy or cuddly?" },
        { sender: 'Alison Wu', time: '11:08 AM', message: "Very shy! But she lets me feed her from my hand now. Small wins 😭" },
        { sender: 'Me', time: '11:10 AM', message: "That’s so sweet. Can’t wait to meet her. You should bring her to the park next week!" }
      ]
    },
    shelters: {
      'Happy Paws Shelter': [
        { sender: 'Happy Paws Shelter', time: '8:00 AM', message: "Thanks for your interest in Luna! She's one of our favorites." },
        { sender: 'Me', time: '8:05 AM', message: "She’s doing well! I’ll send an update soon." },
        { sender: 'Happy Paws Shelter', time: '8:06 AM', message: "We’re so happy to hear that 🥰 Did she settle in okay her first night?" },
        { sender: 'Me', time: '8:08 AM', message: "Yes! She was nervous at first but slept curled up on the couch with her toy by midnight." },
        { sender: 'Happy Paws Shelter', time: '8:10 AM', message: "That’s amazing. Feel free to reach out anytime for questions or support!" }
      ]
    }
  };
  

export default function ChatPage() {
  const [selectedCategory, setSelectedCategory] = useState('users');
  const [selectedPerson, setSelectedPerson] = useState(Object.keys(allConversations.users)[0]);
  const people = Object.keys(allConversations[selectedCategory]);
  const chat = allConversations[selectedCategory][selectedPerson] || [];

  return (
    <Box sx={{ padding: '1rem', fontFamily: 'Segoe UI', backgroundColor: '#fff4ce', height: '90vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffe682', padding: '0 1rem', borderRadius: 2, mb: 2, mx: 2 }}>
        <Typography variant="h4" fontWeight="bold">PawChat</Typography>
      </Box>

      {/* Body */}
      <Box sx={{ display: 'flex', flex: 1, gap: '1.5rem', mx: 2, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box sx={{ backgroundColor: '#fffef2', padding: 2, borderRadius: 3, width: 400, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TextField
            placeholder="Search conversations..."
            size="small"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#aaa' }} />
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
              onClick={() => { setSelectedCategory('shelters'); setSelectedPerson(Object.keys(allConversations.shelters)[0]); }}
              sx={{ flex: 1, borderRadius: 2, fontWeight: 'bold', backgroundColor: selectedCategory === 'shelters' ? '#fde68a' : '#fff', color: '#000' }}
            >
              Shelter
            </Button>
            <Button
              fullWidth
              onClick={() => { setSelectedCategory('users'); setSelectedPerson(Object.keys(allConversations.users)[0]); }}
              sx={{ flex: 1, borderRadius: 2, fontWeight: 'bold', backgroundColor: selectedCategory === 'users' ? '#fde68a' : '#fff', color: '#000' }}
            >
              Users
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' } }}>
            {people.map((person) => (
              <Box key={person} onClick={() => setSelectedPerson(person)}
                sx={{ display: 'flex', alignItems: 'center', p: 1.2, borderRadius: 2, cursor: 'pointer', backgroundColor: person === selectedPerson ? '#fde68a' : '#fffef2' }}>
                <Avatar sx={{ backgroundColor: '#fcd34d', width: 56, height: 56, fontWeight: 'bold', mr: 1 }}>{person.charAt(0)}</Avatar>
                <Box>
                  <Typography fontWeight={600} fontSize={14}>{person}</Typography>
                  <Typography fontSize={12} color="#555">
                    {allConversations[selectedCategory][person][0]?.message.slice(0, 30)}...
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Main Chat */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fffef2', padding: 2, borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar sx={{ backgroundColor: '#fcd34d', width: 75, height: 75, fontSize: 18 }}>{selectedPerson.charAt(0)}</Avatar>
            <Box>
              <Typography fontWeight={500} fontSize={30}>{selectedPerson}</Typography>
              <Typography fontSize={17} color="#666">Active now</Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, py: 1.5, pr: 1, scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' } }}>
            {chat.map((msg, idx) => (
              <Box key={idx} sx={{ alignSelf: msg.sender === 'Me' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'Me' ? '#f2f2f2' : '#fef3c7', px: 2, py: 1.5, borderRadius: 2, maxWidth: '60%', fontSize: 20 }}>
                <Typography>{msg.message}</Typography>
                {msg.image && <img src={msg.image} alt="chat" style={{ marginTop: 6, maxWidth: 200, borderRadius: 8 }} />}
                <Typography sx={{ fontSize: 10, color: '#888', mt: 0.5, textAlign: 'right' }}>{msg.time}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Input */}
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '25px', border: '1px solid #ddd', p: '8px 12px', gap: 1 }}>
            <IconButton sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}><EmojiEmotions /></IconButton>
            <Box contentEditable role="textbox" spellCheck="false" placeholder="Message..." sx={{ flex: 1, minHeight: '24px', maxHeight: '120px', overflowY: 'auto', fontSize: 20, fontFamily: 'Segoe UI', outline: 'none', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.4, py: 0.5 }} />
            <IconButton sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}><AttachFile /></IconButton>
            <IconButton sx={{ color: '#a3a3a3', '&:hover': { color: '#ffbf47' } }}><PhotoCamera /></IconButton>
            <IconButton sx={{ backgroundColor: '#facc15', color: 'black', borderRadius: '50%', width: 36, height: 36, '&:hover': { backgroundColor: '#eab308' } }}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}