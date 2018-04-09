import React from 'react'
import classes from './Score.css'

const score = (props) => (
   <div className={classes.Score}>
      { props.points }
   </div>
)

export default score