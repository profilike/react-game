import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import initCells from '../../utils/initCells'
import BestScore from '../../utils/bestScore'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import Board from '../../components/Board/Board'
import Modal from '../../components/ui/Modal/Modal'
import { every, cloneDeep } from 'lodash'

const CELLS = [
   { id: 1, color: 'teal', closed: true, touched: false },
   { id: 2, color: 'teal', closed: true, touched: false },
   { id: 3, color: 'red', closed: true, touched: false },
   { id: 4, color: 'red', closed: true, touched: false },
   { id: 5, color: 'purple', closed: true, touched: false },
   { id: 6, color: 'purple', closed: true, touched: false },
   { id: 7, color: 'indigo', closed: true, touched: false },
   { id: 8, color: 'indigo', closed: true, touched: false },
   { id: 9, color: 'green', closed: true, touched: false },
   { id: 10, color: 'green', closed: true, touched: false },
   { id: 11, color: 'amber', closed: true, touched: false },
   { id: 12, color: 'amber', closed: true, touched: false },
   { id: 13, color: 'cyan', closed: true, touched: false },
   { id: 14, color: 'cyan', closed: true, touched: false },
   { id: 15, color: 'orange', closed: true, touched: false },
   { id: 16, color: 'orange', closed: true, touched: false }
]

class Game extends Component {

   state = this.initState()

   initState() {
      return { 
         cells: initCells(CELLS),
         currentCell: null,
         score: 0,
         best: BestScore.get(),
         attempt: 0,
         isModalOpen: false
      }
   }
   newGame = () => {
      this.setState(this.initState())
   }
   openHandler = (id) => {
      const idx = this.state.cells.findIndex(cell => cell.id === id)
      const updatedCells = cloneDeep(this.state.cells)
      updatedCells[idx].closed =  false 
      /**  Start Game  */
      if (this.state.score === 0 ) {                                       
         this.setState({ cells: updatedCells, currentCell: updatedCells[idx], attempt: 1 })
         this.updateScore()
      } 
      /**  Open first tile  */
      else if (this.state.score > 0 && !this.state.currentCell) {        
         this.setState({ cells: updatedCells, currentCell: updatedCells[idx], attempt: 1 })
      } 
      /**  Open second tile  */
      else { 
         /** if color match  */
         if( this.state.currentCell.color === updatedCells[idx].color ) {  
            this.updateScore(this.state.attempt)
            this.setState({ 
               cells: updatedCells, currentCell: null, attempt: 0
            }, () => this.isWinner())
            this.resetTouched(updatedCells)
         } 
         /** if color don't match  */
         else if ( this.state.currentCell.color !== updatedCells[idx].color && !updatedCells[idx].touched ) {
            const newAttempt = this.state.attempt + 1
            updatedCells[idx].closed =  true
            updatedCells[idx].touched = true
            this.setState({ cells: updatedCells, attempt: newAttempt })                                                    
         }
      }
   }
   updateScore = (attempt = 1) => {
      const oldScore = this.state.score
      const visibleCells = this.state.cells.filter( item => item.closed)
      const newScore = oldScore + Math.round((visibleCells.length * 100) / attempt )
      this.setState({ score: newScore })
   }
   resetTouched = (updatedCells) => {
      const newCells = updatedCells.map(item => { 
         return {...item, touched : false }
      })
      this.setState({ cells: newCells })
   }
   toggleModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen })
   }
   isWinner = () => {
      const isWinner = every( this.state.cells, { closed: false} )
      if(isWinner) {
         setTimeout(() => {
            this.toggleModal()
         }, 1000 )
         if(this.state.score > this.state.best) {
            this.setState({ best : this.state.score })
            BestScore.set(this.state.score)
         }
      }
   }
   render() {
      const {cells, best, attempt, score} = this.state
      return (
         <Fragment>
            <h1>Game</h1>
            <ControlPanel best={best} attempt={attempt} score={score} newGameHandler={this.newGame} />
            <Board cells={cells} open={this.openHandler} />
            {this.state.isModalOpen &&
               ReactDOM.createPortal(
                  <Modal onClose={this.toggleModal} totalScore={this.state.score} />,
                  document.getElementById('modal')
               )
            }
         </Fragment>
      )
   }
}

export default Game