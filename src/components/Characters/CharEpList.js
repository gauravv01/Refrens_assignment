// Component to display the names of episodes the character appeared in

import React, { useEffect, useState } from 'react';
import axios from '../../API/Instance';
import { Constants } from '../../Constants/Constants';
import styles from './CharacterEpisode.module.css';

export const CharEpList = ({episode,setShowEpisodes,showEpisodes}) => {
  // State to store the episode names to be displayed in the pop up card
  const [episodes, setEpisodes] = useState([]);
  // State to store the episode data passed from the parent component (API url of each episode)
  const epList = [episode];

  // Function to toggle episode info pop up visibility status
  const handleClose = () => {
    setShowEpisodes(false);
    setEpisodes([]);
  };

  // Function to fetch episode name with each episode number passed as prop
  const fetchEpisodeNames = async (temp) => {
  try  {
   const output= await axios.get(`episode/${temp}`);
      const response =  output.data;
        setEpisodes((episodes) => [...episodes, response.name])
      }
  catch(error){
    console.log(error)
  }
  };

  // useEffect to fetch episode name from API url of each episode
  useEffect(() => {
    epList[0].forEach((ep) => {
      // Getting only the episode number from the end of the url
      let temp = ep.split('/')[ep.split('/').length - 1];
      fetchEpisodeNames(temp);
    });
    // eslint-disable-next-line
  }, [showEpisodes]);

  return (
    <div
      className={styles.episode_div}>
      <div
        onClick={handleClose}
        className={styles.backscreen_div}></div>
      <div
        className={styles.eplist_div}>
        <div className={styles.eplist_internal_div}>
          <h1 className={styles.list_heading}>
            {Constants.EPISODES_FEATURED}
          </h1>
          <div className={styles.mapList_div}>
            {episodes.map((ep, index) => {
              return (
                <div key={index} className={styles.mapList_internal_div}>
                  <h1 className={styles.mapList_h1}>{ep}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={handleClose}
        style={{ zIndex: 70 }}
        className={styles.epList_button}>
        {Constants.CLOSE_BUTTON}
      </button>
    </div>
  );
};
