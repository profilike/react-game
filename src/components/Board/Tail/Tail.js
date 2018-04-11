import React from 'react'
import classes from './Tail.css'

const tail = (props) => {

   const animateClasses = [classes.TailWrapper]
   const mainClasses = [classes.Tail]
   
   if ( !props.closed ) {
      animateClasses.push( classes.open )
      mainClasses.push( classes[props.colorType] )
   }
   if ( props.touched && props.closed ) {
      animateClasses.push( classes.shake )
   }
   return (
      <div className={ animateClasses.join(' ') }>
         <div
            onClick={props.clicked}
            className={ mainClasses.join(' ') }
         >
         </div>
      </div>
   )

}

export default tail