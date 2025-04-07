import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './pages/Topbar';
import Sidebar from './pages/Sidebar';
import HomePage from './pages/Homepage';
import PedigreePage from './pages/Pedigreepage';
import PetShopPage from './pages/PetShoppage';
import ProfilePage from './pages/Profilepage';
import SettingsPage from './pages/Settingspage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PetProfileModal from './pages/PetProfileModal';
import ChatPage from './pages/ChatBox';
import './index.css';
import { UserProvider } from './UserContext';

const captions = [
  "Caught mid-zoomies! 🐾", "New trick unlocked ✨", "This face = instant treat 🎯",
  "Snuggle mode: activated 😴", "Who wore it best? 🎉", "Say cheese! 📸",
  "Just vibin' in the sun ☀️", "Someone's ready for walkies 🐕", "That look when it's treat time 👀",
  "Besties forever 🐶🐱", "Meow or never 😼", "Weekend energy 💥",
  "Party animal alert 🎈", "Fetch? More like fashion! 💁‍♀️", "Snow day adventures ❄️",
  "The grass is paw-some 🌱", "Tongue out Tuesday 😋", "Too cute to handle 💖",
  "Caught being paws-itively adorable 💅", "Tail wags & good vibes 🌈"
];

const postImages = [
  ["https://placedog.net/500/300?id=1", "https://placedog.net/500/300?id=2", "https://placedog.net/500/300?id=3"],
  ["https://placedog.net/500/300?id=4", "https://placedog.net/500/300?id=5", "https://placedog.net/500/300?id=6"],
  ["https://placedog.net/500/300?id=7", "https://placedog.net/500/300?id=8", "https://placedog.net/500/300?id=9"],
  ["https://placedog.net/500/300?id=10", "https://placedog.net/500/300?id=11", "https://placedog.net/500/300?id=12"],
];

const generatePostDate = (index) => {
  const daysAgo = index * 2 + Math.floor(Math.random() * 2);
  const postDate = new Date();
  postDate.setDate(postDate.getDate() - daysAgo);
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};


function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;

  const isChatPage = pathname === '/chat';
  const isPetShopPage = pathname === '/petshop';
  const isSettingsPage = pathname === '/settings';
  const isPedigreePage = pathname === '/pedigree';
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const pageThemeClass = isChatPage
    ? 'theme-chat'
    : isPetShopPage
    ? 'theme-petshop'
    : isPedigreePage
    ? 'theme-pedigree'
    : isSettingsPage
    ? 'theme-settings'
    : 'theme-default';

const [pets, setPets] = useState([
    {
      name: "Buddy",
      image: "/pedigree/puppy1.jpg",
      breed: "Labrador Retriever",
      age: "5 Months Old",
      gender: "Male",
      weight: "12 kg",
      vaccinated: true,
      spayedNeutered: true,
      medicalConditions: "None! Just being too cute!",
      personality: {
        temperament: 4,
        energyLevel: 5,
      },
      lifestyle: {
        goodWithKids: true,
        goodWithPets: true,
        indoorOutdoor: false,
        pottyTrained: true,
      },
      favoriteActivities: "Fetching, Running",
      bio: "Buddy is an energetic and friendly Labrador Retriever who loves to run and fetch. At just 5 months old, he's already an active and playful companion, always eager to spend time with his family. Whether he's chasing after a ball or cuddling up for a nap, Buddy brings joy to everyone around him. Adopted from a shelter, Buddy quickly became a beloved member of the family, known for his affectionate nature and love for treats. With his playful spirit and loving heart, Buddy is a true companion.",
      galleryImages: [
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-young-labrador-retriever-jean-louis-klein--marie-luce-hubert.jpg",
        "https://cdn.shopify.com/s/files/1/0525/2500/7030/files/Happy_Lab_187e918c-86e2-4410-aa92-3bc573842651_1024x1024.jpg?v=1712229764",
        "https://media.ceva.com/transform/9956d7a0-12e4-4ed4-916e-e051f3e98225/shutterstock_119485363_cropped-min",
        "https://res.cloudinary.com/lancaster-puppies-laravel/image/upload/v1742706526/default/wslgb6xsdgdr3p5qnocp.jpg",
        "https://img.freepik.com/premium-photo/young-purebred-puppy-labrador-retriever-sleeping-bed_508659-1573.jpg",
        "https://barakennels.com/uploads/3/4/8/9/34899735/20240221-175845.jpg",
        "https://i.pinimg.com/564x/ea/40/be/ea40becadbae9cd9820e70eddab37181.jpg",
        "https://images.cdn-files-a.com/uploads/3052680/2000_5e3f1139ac4d4.jpg",
        "https://www.snowypineswhitelabs.com/wp-content/uploads/2019/10/Crystal_5-1-1024x683.jpg",

      ],
      adoptionStory: "Buddy’s adoption story is one filled with love and hope. Found in a local shelter at just 3 months old, Buddy was a playful little puppy with a big heart, but he needed a family to call his own. When his new family walked into the shelter, it was love at first sight. Despite the uncertainty of his past, Buddy immediately bonded with them, wagging his tail and giving them all the puppy kisses they could handle. It didn’t take long for them to know that Buddy was the perfect addition to their family. He now enjoys a life full of play, adventure, and lots of love. Buddy is more than just a pet; he’s a cherished member of the family who brings joy and happiness to everyone he meets. From shelter to family, Buddy’s journey is a reminder of the transformative power of adoption.",
      birthday: "09/01/2024",
      adoptionStatus: "A Part of My Family",
      dietaryPreferences: "Buddy is a 5-month-old puppy who is in excellent health. His vaccinations are up to date, and he has no known medical conditions. Buddy's vet has confirmed that he is spayed/neutered, ensuring he is ready for a loving home. His vet visits have been regular, and he's been growing healthy and strong, ready for his next adventures!",
      hobbies: "Playing fetch",
      likesDislikes: "Likes treats, dislikes water",
      vetInfo: "Regular checkups every year",
      lostStatus: false,
    },
    // Repeat for other pets
  
    {
      name: "Spot",
      image: "https://www.innovetpet.com/cdn/shop/articles/29511155786_2fa0890d-ea5e-43f2-aee6-a6fa61b7e146.jpg?v=1739827007",
      breed: "Beagle",
    age: "3 Years Old",
    gender: "Female",
    weight: "8 kg",
    vaccinated: true,
    spayedNeutered: false,
    medicalConditions: "Has seasonal allergies",
    personality: {
      temperament: 3,  // Different temperament
      energyLevel: 3,  // Adjust energy level
    },
    lifestyle: {
      goodWithKids: true,
      goodWithPets: false, // Changed to not good with other pets
      indoorOutdoor: true,  // Spot prefers outdoor activities
      pottyTrained: false,  // Spot is still in training
    },
    favoriteActivities: "Chasing squirrels, Hiking",
    bio: "Spot is an adventurous Beagle who loves the outdoors. At 3 years old, she's energetic and enjoys chasing small animals, especially squirrels! Spot is an affectionate dog who needs a bit of patience as she is still learning to get along with other pets. Despite her quirks, Spot is a loyal companion and loves to go on hikes with her family.",
    galleryImages: [
      "https://barxparx.com/wp-content/uploads/2023/01/beagle.jpg",
      "https://www.humaneworld.org/sites/default/files/styles/responsive_3_2_500w/public/2023-11/Beagleversary_Hero.jpg.webp?itok=15hxLRra",
      "https://preview.redd.it/recently-adopted-rescue-beagle-getting-over-fear-of-people-v0-vzz7gcch0qnb1.jpg?width=1080&crop=smart&auto=webp&s=f2dfc346da5d23d4a399fe5f55999784b9748863",
      "https://pet-health-content-media.chewy.com/wp-content/uploads/2024/09/11181132/202104GettyImages-1714338737-scaled-1.jpg",
      "https://images.ctfassets.net/440y9b545yd9/6SjU9RZPM34PIx0rI49k1S/8525bb9a718afb1260fd03d2ffd935a6/Beagle_5_things_hero850__1_.jpg",
      "https://www.dailypaws.com/thmb/WJmVzqoZ5YJSi6rwNCDCp2Yif30=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beagle-beach-girl-903149510-2000-d06edc2823524aac90613b3b117b78c5.jpg",
      "https://i.ytimg.com/vi/bI7XNInXpRs/maxresdefault.jpg",
    ],
    adoptionStory: "Spot was found as a stray in a rural area and brought to the shelter. Despite being a little shy at first, Spot warmed up quickly to her new family. She's now thriving in her forever home and is especially fond of outdoor adventures with her family. Spot has a loving nature, and her family is patient with her as she learns how to live harmoniously with other pets.",
    birthday: "04/15/2020",
    adoptionStatus: "Adopted and Loving Life",
    dietaryPreferences: "Spot is on a special diet due to her allergies, with a focus on grain-free food and natural ingredients.",
    hobbies: "Chasing squirrels, digging holes, running at the park",
    likesDislikes: "Likes belly rubs, dislikes thunderstorms",
    vetInfo: "Annual checkups, allergy medication in the spring",
    lostStatus: false,
  },
    {
      name: "Snowy",
      image: "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg",
      breed: "Persian",
    age: "2 Years Old",
    gender: "Female",
    weight: "4 kg",
    vaccinated: true,
    spayedNeutered: true,
    medicalConditions: "No known medical conditions",
    personality: {
      temperament: 5,  // Very calm temperament
      energyLevel: 2,  // Low energy, likes to relax
    },
    lifestyle: {
      goodWithKids: true,
      goodWithPets: true,  // Snowy is friendly with other pets
      indoorOutdoor: false,  // Snowy is an indoor cat
      pottyTrained: true,  // Litter box trained
    },
    favoriteActivities: "Sleeping in cozy corners, watching birds outside",
    bio: "Snowy is a calm and affectionate Persian cat who loves nothing more than lounging in the sun and watching the world go by. At 2 years old, Snowy enjoys a peaceful life with her family. She has a soft, long white coat and is known for her gentle nature. While she enjoys cuddling with her family, Snowy prefers a relaxed lifestyle, always finding a cozy spot to nap.",
    galleryImages: [
      "https://image.petmd.com/files/inline-images/silver-persian-cat.jpg?VersionId=lA9jJUgugdFTclEJMdH4cC7LQuNgmacR",
      "https://image.petmd.com/files/styles/978x550/public/2023-04/persian-cat-breed.jpg",
      "https://i.redd.it/vphgqjr1hv291.jpg",
      "https://media.gettyimages.com/id/1088-25/video/close-up-persian-cat-wearing-tiara.jpg?s=640x640&k=20&c=A4t4LCX6duawrWLKKTpyTqCkqpWf4PWxD1OL2hPzyBI=",
      "https://imgc.allpostersimages.com/img/posters/bella-the-persian-cat-gets-a-soaking-to-prepare-her-for-shows-april-1985_u-l-pxrzqz0.jpg?artHeight=550&artPerspective=n&artWidth=550&background=ffffff",
      "https://media.istockphoto.com/id/1292885588/photo/man-combing-fluffy-grey-persian-cat-grumpy-cat-being-brushed.jpg?s=612x612&w=0&k=20&c=3t54lpEno15OXlriL_0DMvuCwbACsbpmDxEw-Tar48A=",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnh5yhMy8CyUQof59ukq4SdaGWHbfgOXGmFQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2coTnWRWYs-d3JDD0hf4tUiJ0VYcXoPxYRg&s",
      "https://www.bubblypet.com/wp-content/uploads/2022/07/White-Persian-cat-with-long-hair-1200x800.jpg",
    ],
    adoptionStory: "Snowy was rescued from an animal shelter where she had been waiting for a loving home. Despite her calm demeanor, she immediately warmed up to her new family and quickly became the queen of the house. She enjoys being spoiled with attention, and her fluffy coat makes her a favorite for petting.",
    birthday: "05/10/2021",
    adoptionStatus: "Adopted and Loving Her Life",
    dietaryPreferences: "Snowy is on a special diet for her sensitive stomach, focusing on high-quality wet food with minimal fillers.",
    hobbies: "Sleeping, watching birds, climbing cat trees",
    likesDislikes: "Likes being brushed, dislikes loud noises",
    vetInfo: "Regular checkups, grooming sessions every 6 weeks",
    lostStatus: false,
  },
  ]);
    
  const [activePet, setActivePet] = useState(null);
  const [editable, setEditable] = useState(false);
  const [followedPets, setFollowedPets] = useState([]);

  const posts = postImages.map((images, index) => ({
    images,
    caption: captions[index % captions.length],
    date: generatePostDate(index),
    taggedPets: [
      {
        name: "Snowy",
        image: "https://www.thesprucepets.com/thmb/hJ40hdpK4KZ5AehlMmVEdJr8zPI%3D/1999x1459/filters%3Afill(auto,1)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg",
      },
    ],
    taggedFollowedPets: [
      {
        name: "Buddy",
        image: "https://placedog.net/300/300?id=98",
      },
      {
        name: "Luna",
        image: "https://placedog.net/300/300?id=99",
      },
    ]
  }));
  

  return (

    <div className={`app ${pageThemeClass}`}>
      <TopBar
          pets={pets}
          setPets={setPets}
          setActivePet={(pet) => {
            setActivePet(pet);
            setEditable(false);
          }}
        />
        <Sidebar pets={pets} followedPets={followedPets} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
      <Route path="/" element={
        <div className="auth-content">
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        </div>
      } />
        <Route path="/signup" element={
          <div className="auth-content">
            <SignupPage />
            </div>
          } />
        <Route
        path="*"
        element={
          <div className="main-content">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route
                path="/profile"
                element={
                <ProfilePage
                  pets={pets}
                  setPets={setPets}
                  setActivePet={setActivePet}
                   />
                  }
                   />
                <Route path="/pedigree" element={<PedigreePage />} />
                <Route path="/petshop" element={<PetShopPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
          </div>
        } 
        />
      </Routes>

      {activePet && (
        <PetProfileModal
          pet={{
            ...activePet,
            onHealthUpdate: (field, value) => {
              const updated = pets.map((p) =>
                p.name === activePet.name ? { ...p, [field]: value } : p
              );
              setPets(updated);
              setActivePet((prev) => ({ ...prev, [field]: value }));
            },
            onPersonalityUpdate: (field, value) => {
              const updated = pets.map((p) =>
                p.name === activePet.name
                  ? {
                      ...p,
                      personality: {
                        ...p.personality,
                        [field]: value,
                      },
                    }
                  : p
              );
              setPets(updated);
              setActivePet((prev) => ({
                ...prev,
                personality: {
                  ...prev.personality,
                  [field]: value,
                },
              }));
            },
          }}
          onClose={() => {
            setActivePet(null);
            setEditable(false);
          }}
          editable={editable}
          showEditButton={true}
          onToggleEdit={() => setEditable((prev) => !prev)}
          posts={posts}
        />
      )}

      {/* Add CSS for auth pages */}
      <style>
        {`
          .auth-content {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #E8FAFF;
            z-index: 10;
          }

          
          /* Override any scrolling in the login/signup forms */
          .auth-content .lg-login-page {
            padding: 0;
            overflow: hidden;
            min-height: calc(100vh - 60px);
            height: calc(100vh - 60px);
            width: 100%;
          }
          
          /* Make containers bigger */
          .auth-content .lg-login-container {
            width: 900px;
            height: 600px;
            max-height: 80vh;
            margin: 0 auto;
            position: relative;
            top: 0; /* Remove negative top position */
          }
          
          /* Style for the form container */
          .auth-content .lg-form-container {
            margin: auto 0;
            display: flex;
            flex-direction: column;
          }
          
          /* Ensure the form has enough space for all elements */
          .auth-content .lg-login-form {
            padding: 20px 50px;
            min-width: 450px;
            justify-content: center;
            display: flex;
          }
          
          /* Make text inputs larger and reduce space between them */
          .auth-content .lg-form-group {
            margin-bottom: 12px;
          }
          
          .auth-content .lg-form-group input {
            padding: 10px;
            font-size: 1.1rem;
          }
          
          /* Move button up */
          .auth-content .lg-signup-button {
            padding: 10px;
            font-size: 1.1rem;
            margin-top: 15px;
          }
          
          /* Move text below button up */
          .auth-content .lg-login-form p {
            margin-top: 10px !important;
          }
          
          /* Fix illustration size */
          .auth-content .lg-dog-illustration {
            width: 200px;
            height: 200px;
          }
          
          /* Adjust form spacing and move title up */
          .auth-content h2 {
            font-size: 2rem !important;
            margin-bottom: 20px !important;
            margin-top: 0 !important;
          }
          
          /* Reduce space between label and input */
          .auth-content .lg-form-group label {
            margin-bottom: 4px;
          }
          
          /* Reduce space for password checkbox */
          .auth-content .lg-show-password {
            margin-top: 4px;
          }
        `}
      </style>
    </div>
  );
}

// ✅ This must be OUTSIDE of AppContent
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;