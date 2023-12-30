import styles from '../styles/ShawarmaList.module.css';
import ShawarmaCard from './ShawarmaCard';

const PizzaList = ({ shawarmaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text-3xl font-bold`}>THE BEST SHAWARMA IN TOWN</h1>
          <p className={styles.desc}>Buchis Shawarma invites you on a culinary journey like no other, where savory flavors and aromatic spices come together to create an unforgettable shawarma experience. Our commitment to quality and passion for authentic taste make us the go-to destination for shawarma enthusiasts</p>
      <div className={styles.wrapper}>
        {shawarmaList.map((val) => (
                <ShawarmaCard shawarma={val} key={val._id}/>
        ))}
      </div>
    </div>
  )
}

export default PizzaList