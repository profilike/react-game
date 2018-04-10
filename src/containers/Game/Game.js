import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import initCells from '../../utils/initCells'
import BestScore from '../../utils/bestScore'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import Board from '../../components/Board/Board'
import Modal from '../../components/ui/Modal/Modal'
import { every, cloneDeep } from 'lodash'

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

   state = this.initState()

   initState() {
      return { 
         cells: initCells(CELLS),
         currentCell: null,
         score: 0,
         best: BestScore.get(),
         attempt: 1,
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

      if (this.state.score === 0 ) {
         this.setState({ cells: updatedCells, currentCell: updatedCells[idx] })
         this.updateScore()
      } else if (this.state.score > 0 && !this.state.currentCell) {
         this.setState({ cells: updatedCells, currentCell: updatedCells[idx] })
      } else { 
         if( this.state.currentCell.color === updatedCells[idx].color ) {
            this.updateScore(this.state.attempt)
            this.setState({ 
               cells: updatedCells, currentCell: null, attempt: 1
            }, () => this.isWinner())
         } else {
            const newAttempt = this.state.attempt + 1
            this.setState({ attempt: newAttempt })
         }
      }
   }
   updateScore = (attempt = 1) => {
      const oldScore = this.state.score
      const visibleCells = this.state.cells.filter( item => item.closed)
      const newScore = oldScore + (oldScore === 0 ? 1 : Math.round((visibleCells.length * 100) / attempt ))
      this.setState({ score: newScore })
   }
   toggleModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen })
   }
   isWinner = () => {
      const isWinner = every( this.state.cells, { closed: false} )
      if(isWinner) {
         setTimeout(() => {
            this.setState({ isModalOpen: true })
         }, 1000 )
         if(this.state.score > this.state.best) {
            this.setState({ best : this.state.score })
            BestScore.set(this.state.score)
         }
      }
   }
   render() {
      const { best, attempt, score } = this.state
      return (
         <Fragment>
            <h1>Test Game</h1>
            <ControlPanel best={best} attempt={attempt} score={score} newGameHandler={ this.newGame } />
            <Board cells={this.state.cells} open={this.openHandler} />
            {this.state.isModalOpen &&
               ReactDOM.createPortal(
                  <Modal onClose={this.toggleModal} totalScore={ this.state.score } />,
                  document.getElementById('modal')
               )
            }
         </Fragment>
      )
   }
}

export default Game