import React from 'react'
import classes from './Score.css'

const score = (props) => (
   <div className={classes.Score} style={{ backgroundColor: props.background }} >
      <span>{ props.text }</span>
      { props.points }
   </div>
)

export default score