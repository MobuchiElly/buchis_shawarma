import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ shawarmaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
          <p className={styles.desc}>EllysPizza offers the very best taste ..................would fill up the space using gpt generated text</p>
      {shawarmaList.map((val, index) => (
        <div key={index}>
          <div className={styles.wrapper}>
              <PizzaCard shawarmaList={shawarmaList}/>
          </div>
        </div>
      ))}
        
    </div>
  )
}

export default PizzaList