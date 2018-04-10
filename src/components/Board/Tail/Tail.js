import React from 'react'
import classes from './Tail.css'

const tail = (props) => {

   const wrapClasses = [classes.TailWrapper]
   const assigntClasses = [classes.Tail]
   
   if ( !props.closed ) {
      assigntClasses.push( classes[props.colorType] )
      wrapClasses.push( classes.open )
   }
   return (
      <div className={ wrapClasses.join(' ') }>
         <div
            onClick={props.clicked}
            className={ assigntClasses.join(' ') }
         >
         </div>
      </div>
   )

}

export default tail