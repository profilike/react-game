import React from 'react'
import classes from './Layout.css'

const Layout = (props) => {
      return (
         <main className={classes.Container}>
           { props.children } 
         </main>
      )
}

export default Layout