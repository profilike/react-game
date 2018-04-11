import React from 'react'
import classes from './ControlPanel.css'
import Button from '../ui/Button/Button'
import Score from '../Score/Score'

const controlPanel = (props) => {
   return (
      <div className={classes.ControlPanel} >  
         <Button clicked={props.newGameHandler}>New game</Button>
         <Score points={props.attempt} text='Try' background='#9e9e9e' />
         <Score points={props.score} text='Score' background='#37474f' />
         <Score points={props.best} text='Best' background='#ff6e40' />
      </div>
   )
}

export default controlPanel