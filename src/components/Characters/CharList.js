// Component rendering the character grid based on filters and search box

import React, { useCallback, useState } from 'react';
import { CharPopUp } from './CharPopUpCard';
import { Constants } from '../../Constants/Constants';
import styles from './Character.module.css';

const CharList = ({chars}) => {
  // State to store the pop up card visibility status
  const [showPopUp, setShowPopUp] = useState(false);
  // State to store the character data to be displayed in the pop up card
  const [popUpData, setPopUpData] = useState([]);

  // Function to toggle pop up card visibility status
  const popUpToggle = (char) => {
    setPopUpData(char);
    setShowPopUp(!showPopUp);
  };

  const Shortname = useCallback((name)=>{
    const splittedname=name.split('');
    if(splittedname.length>11){
  const new_name=splittedname.slice(0,11);
  new_name.push('...');
  const joinedname=new_name.join('');
  return joinedname;
    }
    else{
      return name;
    }
  },[])

  const Shortspecies = useCallback((name)=>{
    const splittedname=name.split('');
    if(splittedname.length>6){
  const new_name=splittedname.slice(0,4);
  new_name.push('..');
  const joinedname=new_name.join('');
  return joinedname;
    }
    else{
      return name;
    }
  },[])

  return (
    <>
      {chars.map((char, index) => (
        <div
          key={index}
          className={styles.chrlist_div}>
          <article className={styles.img_div}>
            <img
              className={styles.img}
              src={char.image}
              alt={char.name}
            />
          </article>
          <div className={styles.details_div}>
            <section className={styles.name_div}>
              <h1 className={styles.name}>
                {Shortname(char.name)}
              </h1>
            </section>
            <div className={styles.childDetail_div}>
              <div className={styles.childDetail}>{Constants.SPECIES}</div>
              <div className={styles.childDetail_Value}>
                {Shortspecies(char.species)}
              </div>
            </div>
            <div className={styles.childDetail_div}>
              <div className={styles.childDetail}>{Constants.STATUS}</div>
              <div className={styles.childDetail_Value}>
                {char.status}
              </div>
            </div>
            <div className={styles.childDetail_div}>
              <div className={styles.childDetail}>{Constants.GENDER}</div>
              <div className={styles.childDetail_Value}>
                {char.gender}
              </div>
            </div>
            <button
              onClick={() => popUpToggle(char)}
              className={styles.chr_button}>
              {Constants.MORE_INFO}
            </button>
          </div>
          </div>  
      ))}
      {/* Character info pop up */}
      <CharPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} char={popUpData} />
    </>
  );
};

export default CharList;
