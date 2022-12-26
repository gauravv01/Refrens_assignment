// Component to render more info about a character when the user clicks on the "Know More" button

import React, { useState, useEffect } from 'react';
import { CharEpList } from './CharEpList';
import { Constants } from '../../Constants/Constants';
import styles from './CharacterPopcard.module.css';

export const CharPopUp = ({char,showPopUp,setShowPopUp}) => {
  // States to store character's origin and current location data
  const [originData, setOriginData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  // State to trigger episode list pop up visibility status
  const [showEpisodes, setShowEpisodes] = useState(false);
  // State to store the episode data to be displayed in the pop up card
  const [episodeData, setEpisodeData] = useState([]);

  // Function to toggle charcter info pop up visibility status
  const handlePopUpClose = () => {
    setShowPopUp(false);
    setLocationData([]);
    setOriginData([]);
    setShowEpisodes(false);
  };

  // Function to toggle episode list pop up visibility status
  const episodeOpen = (dat) => {
    setShowEpisodes(!showEpisodes);
    setEpisodeData(dat);
  };

  // Function to fetch character's origin and current location data
  const getData = async () => {
    if (char.origin.url) {
      await fetch(char.origin.url)
        .then((res) => res.json())
        .then((data) => {
          setOriginData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (char.location.url) {
      await fetch(char.location.url)
        .then((res) => res.json())
        .then((data) => {
          setLocationData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect to fetch character's origin and current location data when the component mounts
  useEffect(() => {
    if (showPopUp) {
      getData();
    }
    // eslint-disable-next-line
  }, [showPopUp]);

  // Render nothing if the character info pop up is not visible
  if (!showPopUp) return null;

  return (
    <div className={styles.a}>
      <div
        onClick={handlePopUpClose}
        className={styles.a_a}></div>
      <div className={styles.a_b}>
        <div className={styles.a_b_a}></div>
        <div className={styles.a_b_b}>
          <h1 className={styles.a_b_b_a}>
            {char.name}
          </h1>
          <div className={styles.a_b_b_b}>
            <img
              className={styles.a_b_b_b_img}
              src={char.image}
              alt={char.name}
            />
          </div>
          <div className={styles.a_b_b_c}>
            <div className={styles.a_b_b_c_a}>
              <div className={styles.first}>
                {Constants.ORIGIN}
              </div>
              <div>
                {' '}
                <div className={styles.second}>
                  <span className={styles.second_child}>{Constants.PLACE}</span>:{' '}
                  {char.origin.url ? originData.name : Constants.UNKNOWN}
                </div>
                <div className={styles.second}>
                  <span className={styles.second_child}>{Constants.DIMENSION}</span>:{' '}
                  {char.origin.url ? originData.dimension : Constants.UNKNOWN}
                </div>
                <div className={styles.second}>
                  <span className={styles.second_child}>{Constants.NO_OF_RESIDENTS}</span>:{' '}
                  {char.origin.url
                    ? originData.residents && originData.residents.length
                    : Constants.UNKNOWN}
                </div>
              </div>
            </div>
            <div className={styles.a_b_b_c_b}></div>

            <div className={styles.a_b_b_c_c}>
              <div className={styles.first}>
                {Constants.CURRENT_LOCATION}
              </div>
              <div className={styles.second}>
                <span className={styles.second_child}>{Constants.PLACE}</span>:{' '}
                {char.location.url ? locationData.name : Constants.UNKNOWN}
              </div>
              <div className={styles.second}>
                <span className={styles.second_child}>{Constants.DIMENSION}</span>:{' '}
                {char.location.url ? locationData.dimension : Constants.UNKNOWN}
              </div>
              <div className={styles.second}>
                <span className={styles.second_child}>{Constants.NO_OF_RESIDENTS}</span>:{' '}
                {char.location.url
                  ? locationData.residents && locationData.residents.length
                  : Constants.UNKNOWN}
              </div>
            </div>
          </div>
          <div className={styles.a_b_b_d}>
            <button
              onClick={handlePopUpClose}
              className={styles.button}>
              {Constants.CLOSE_BUTTON}
            </button>
            <button
              onClick={() => episodeOpen(char.episode)}
              className={styles.button}>
              {Constants.EPISODES_FEATURED}
            </button>
          </div>
        </div>
      </div>
      {/* Episode List pop up */}
      {showEpisodes && (
        <CharEpList
          episode={episodeData}
          showEpisodes={showEpisodes}
          setShowEpisodes={setShowEpisodes}
        />
      )}
    </div>
  );
};
