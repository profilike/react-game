import React from 'react'
import Tail from './Tail/Tail'
import classes from './Board.css'

const Board = (props) => {
      const {cells} = props
      return (
            <div className={classes.Board}>
                  {cells.map(({ id, color, closed, touched }) => (
                        <Tail 
                              key={id} 
                              colorType={color}
                              closed={closed}
                              touched={touched}
                              clicked={() => props.open(id)} 
                        />
                  ))}
            </div>
      )
}

export default Board