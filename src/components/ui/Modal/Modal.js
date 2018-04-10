import React from 'react'
import classes from './Modal.css'
import cup from '../../../assets/images/cup.svg'

const modal = (props) => {
   return(
      <div className={classes.ModalContainer} >
         <div className={classes.Modal}>
            <span className={classes.close} onClick={props.onClose}>&#10006;</span>
            <h2>Congratulations!</h2>
            <p>Your Score: <strong>{ props.totalScore }</strong></p>
            <img src={cup} alt="Winner" />
         </div>
      </div>
   )
}  
export default modal