import React, { Component, Fragment } from 'react'
import initCells from '../../utils/initCells'
import classes from './Game.css'
import Board from '../../components/Board/Board'
import Button from '../../components/ui/Button/Button'
import Score from '../../components/Score/Score'
import Modal from '../../components/ui/Modal/Modal'

const CELLS = [   
   { id: 1, color: 'teal', closed: true },
   { id: 2, color: 'teal', closed: true },
   { id: 3, color: 'red', closed: true },
   { id: 4, color: 'red', closed: true },
   { id: 5, color: 'purple', closed: true },
   { id: 6, color: 'purple', closed: true },
   { id: 7, color: 'indigo', closed: true },
   { id: 8, color: 'indigo', closed: true },
   { id: 9, color: 'green', closed: true },
   { id: 10, color: 'green', closed: true },
   { id: 11, color: 'amber', closed: true },
   { id: 12, color: 'amber', closed: true },
   { id: 13, color: 'cyan', closed: true },
   { id: 14, color: 'cyan', closed: true },
   { id: 15, color: 'orange', closed: true },
   { id: 16, color: 'orange', closed: true } 
]

class Game extends Component {

   state = {
      cells: initCells(CELLS),
      currentCell: null,
      score: 0,
      finish: true
   }
   newGameHandler = () => {
      this.setState({ 
         cells: initCells(CELLS),
         currentCell: null,
         score: 0, 
         finish: false
      })
   }
   openHandler = (id) => {
      const idx = this.state.cells.findIndex( cell => cell.id === id )
      const updatedCells = [
         ...this.state.cells
      ]
      updatedCells[idx] = {...updatedCells[idx], closed: false}
      this.setState({ cells: updatedCells, currentCell: id })
      if( this.state.currentCell !== id ) {
         this.updateScore()
      }
   }
   updateScore = () => {
      const oldScore = this.state.score
      const newScore = oldScore === 0 ? 1 : Math.round(oldScore * 1.618)
      this.setState({ score: newScore })
   }

   modalRender = () => {
      this.setState({ finish: false })
   }

   render() {
      return(
         <Fragment>
            <h1>Game</h1>
            <div className={ classes.heading }>
               <Button clicked={ this.newGameHandler }>New game</Button>
               <Score points={ this.state.score } />
            </div>
            <Board cells={this.state.cells} open={ this.openHandler } />
            { this.state.finish ? <Modal clicked={this.modalRender} /> : null  }
         </Fragment>
      )
   }
}

export default Game