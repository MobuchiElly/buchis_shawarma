import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'

const PizzaCard = () => {
  return (
    <div className={styles.container}>
        <Image src='/img/pizza.png' alt='' width='500' height='500' />
        <h1 className={styles.title}>SPANISH PIZZA</h1>
        <span className={styles.price}>#10,500</span>
        <p className={styles.desc}>Lorem ipsum shshshhs sgsgssgsg sssgsgsgsgg</p>
    </div>
  )
}

export default PizzaCard