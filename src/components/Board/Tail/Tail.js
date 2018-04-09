import React from 'react'
import classes from './Tail.css'

const tail = (props) => {

   const assigntClasses = [classes.Tail]
   if ( !props.closed ) {
      assigntClasses.push( classes[props.colorType], classes.open )
   }
   return (
      <div
         onClick={props.clicked}
         className={ assigntClasses.join(' ') }
      >
      </div>
   )

}

export default tail