import React from 'react'
import classes from './ControlPanel.css'
import Button from '../ui/Button/Button'
import Score from '../Score/Score'

const controlPanel = (props) => {
   return (
      <div className={classes.ControlPanel} >  
         <Button clicked={props.newGameHandler}>New game</Button>
         <Score points={props.attempt} text="Try" />
         <Score points={props.score} text="Score" />
         <Score points={props.best} text="Best" />
      </div>
   )
}

export default controlPanel