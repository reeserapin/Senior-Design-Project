import React, { useState } from 'react';
import styled from 'styled-components';

const SidePanelsContainer = styled.div`
  position: fixed;
  right: 2%;
  top: 10vh;
  width: min(300px, 25vw);
  display: flex;
  flex-direction: column;
  gap: 2vh;
  z-index: 10;
  padding-top: 2vh;

  @media (max-width: 1200px) {
    width: min(280px, 30vw);
    right: 1.5%;
  }

  @media (max-width: 768px) {
    width: min(250px, 35vw);
    right: 1%;
    top: 8vh;
  }

  @media (max-width: 480px) {
    position: relative;
    width: 100%;
    right: 0;
    top: 0;
    padding: 1%;
  }
`;

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5%;
  }

  @media (max-width: 480px) {
    margin-bottom: 2vh;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 5px;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

const PanelTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ToggleIcon = styled.span`
  color: #666;
  transition: transform 0.3s ease;
`;

const Icon = styled.i`
  font-size: 20px;
`;

const PanelContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  opacity: 0;

  &.expanded {
    max-height: 1000px;
    opacity: 1;
    transition: max-height 0.3s ease-in, opacity 0.3s ease-in;
  }

  @media (max-width: 1200px) {
    &.expanded {
      max-height: 100vh;
    }
  }

  @media (max-width: 768px) {
    &.expanded {
      max-height: 120vh;
    }
  }

  @media (max-width: 480px) {
    &.expanded {
      max-height: none;
    }
  }
`;

const NewsCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2vh;
  max-height: 30vh;
  overflow-y: auto;

  @media (max-width: 1200px) {
    max-height: 28vh;
  }

  @media (max-width: 768px) {
    max-height: 25vh;
  }

  @media (max-width: 480px) {
    max-height: none;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 15vh;
  object-fit: cover;

  @media (max-width: 1200px) {
    height: 14vh;
  }

  @media (max-width: 768px) {
    height: 12vh;
  }

  @media (max-width: 480px) {
    height: 20vh;
  }
`;

const NewsContent = styled.div`
  padding: 2%;

  @media (max-width: 1200px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const NewsTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const NewsDate = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const NewsDescription = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const MissingPetCard = styled.div`
  background: #fff4f4;
  border-radius: 8px;
  overflow: visible;
  margin-top: 2vh;
  height: auto;
`;

const MissingPetImage = styled.img`
  width: 100%;
  height: 18vh;
  object-fit: cover;

  @media (max-width: 1200px) {
    height: 16vh;
  }

  @media (max-width: 768px) {
    height: 14vh;
  }

  @media (max-width: 480px) {
    height: 22vh;
  }
`;

const MissingPetInfo = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  height: auto;

  @media (max-width: 1200px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const MissingPetName = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #d32f2f;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const MissingPetSince = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const MissingPetReward = styled.p`
  font-size: 14px;
  color: #d32f2f;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

function SidePanels() {
  const [expandedPanels, setExpandedPanels] = useState({
    news: true,
    missingPets: true
  });

  const togglePanel = (panel) => {
    setExpandedPanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  return (
    <SidePanelsContainer>
      <Panel>
        <PanelHeader onClick={() => togglePanel('news')}>
          <PanelTitle>
            <Icon className="fas fa-newspaper" />
            Pet News
          </PanelTitle>
          <ToggleIcon>
            <Icon className={`fas fa-chevron-${expandedPanels.news ? 'up' : 'down'}`} />
          </ToggleIcon>
        </PanelHeader>
        <PanelContent className={expandedPanels.news ? 'expanded' : ''}>
          <NewsCard>
            <NewsImage src="/news1.jpg" alt="Pet News" />
            <NewsContent>
              <NewsTitle>New Pet-Friendly Park Opens</NewsTitle>
              <NewsDate>March 15, 2024</NewsDate>
              <NewsDescription>
                A new pet-friendly park has opened in the city center, featuring special areas for both dogs and cats.
              </NewsDescription>
            </NewsContent>
          </NewsCard>
        </PanelContent>
      </Panel>

      <Panel>
        <PanelHeader onClick={() => togglePanel('missingPets')}>
          <PanelTitle>
            <Icon className="fas fa-search" />
            Missing Pets
          </PanelTitle>
          <ToggleIcon>
            <Icon className={`fas fa-chevron-${expandedPanels.missingPets ? 'up' : 'down'}`} />
          </ToggleIcon>
        </PanelHeader>
        <PanelContent className={expandedPanels.missingPets ? 'expanded' : ''}>
          <MissingPetCard>
            <MissingPetImage src="/missing1.jpg" alt="Missing Pet" />
            <MissingPetInfo>
              <MissingPetName>Luna the Cat</MissingPetName>
              <MissingPetSince>Missing since March 10, 2024</MissingPetSince>
              <MissingPetReward>Reward: $200</MissingPetReward>
            </MissingPetInfo>
          </MissingPetCard>
        </PanelContent>
      </Panel>
    </SidePanelsContainer>
  );
}

export default SidePanels; 