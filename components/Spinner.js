import React from 'react'
import styles from '@/styles/Spinner.module.css'

const Spinner = ({ width='25px', borderWidth='3px', color='white'  }) => {
  return (
    <div className={styles.loader} style={{ width, borderWidth, borderColor: `${color} #ffffff00` }}></div>
  )
}

export default Spinner