import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" alt='' />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>PIZZA OF THE HEART!</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className={styles.text}>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className={styles.text}>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className={styles.text}>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>MONDAY TO FRIDAY
          <br />9:00am - 10:00pm
          </p>
          <p className={styles.text}>SATURDAY - SUNDAY
          <br />12:00pm - 12:00am
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer