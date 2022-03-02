import React, { useState } from 'react'
import logoImage from "./assets/powered.png";
import styles from "./App.module.css";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from './components/gridItem';
import leftArrow from "./assets/leftarrow.png";

function App() {
  const [heightField, setHeight] = useState<number>(0);
  const [weightField, setWiegth] = useState<number>(0);
  const [level, setLevel] = useState<Level | null>(null);

  const calculateButton = () => {
    if(heightField && weightField){
      setLevel(calculateImc(heightField, weightField));
    }else {
      alert("Digite todos os campos");
    }
  }
  const backButton = () => {
    setLevel(null);
    setHeight(0);
    setWiegth(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
        </div>
      </header>
      <div className={styles.container}> 
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>O IMC ou índice de massa corporal, é uma medida internacional usada para calcular se uma pessoa está no peso ideal.</p>
          <input 
            type="number"
            placeholder='Digite sua altura. Ex: 1.5 (Em metros)'
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeight(parseFloat(e.target.value))}
            disabled={level ? true : false}
          />
          <input 
            type="number"
            placeholder='Digite seu peso. Ex: 70.5 (Em Kg)'
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWiegth(parseFloat(e.target.value))}
            disabled={level ? true : false}
          />
          <button onClick={calculateButton} disabled={level ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!level ? (
            <div className={styles.grid}>
            {
              levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))
            }
          </div>
          )
          :
          (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={backButton}>
                <img src={leftArrow} alt="" width="25"/>
              </div>
              <GridItem item={level}/>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default App
