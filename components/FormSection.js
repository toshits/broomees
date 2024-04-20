import React from 'react'
import styles from '@/styles/FormSection.module.css'
import Image from 'next/image'

const FormSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.posterContainer}>
                <Image src={'/airplane.jpg'} width={0} height={0} sizes="100vw" style={{ width: '100%', maxWidth: '600px', height: '100%', objectFit: 'cover', }}  alt='Airplane' />
                <div className={styles.formHeroContainer}>
                    <h2>Altitude Air</h2>
                    <div className={styles.divider}></div>
                    <p>We promise to ensure that your well-being is taken care of while travelling with us. Boasting top in class fleet inventory and a 5 star approval for our in-flight experience, you know you're getting the best from Altitude with no attitude.</p>
                </div>
            </div>
            <div className={styles.formContainer}>
                <h2>Explore & Experience</h2>
                <p>Get onto your most comfortable journey yet. All the way up.</p>
                <div className={styles.innerFormContainer}>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="text" placeholder='First Name' />
                        <input className='inp' type="text" placeholder='Last Name' />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="email" placeholder='Email' />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="text" placeholder='Username' />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="password" placeholder='Password' />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="password" placeholder='Confirm Password' />
                    </div>
                    <button className={`primaryBtn ${styles.getStartedBtn}`}>GET STARTED</button>
                </div>
                <button className={styles.signInBtn}>
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default FormSection