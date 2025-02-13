import React from 'react'
import Header from './Header'

const Layout = ({child}) => {
  return (
    <>
        <Header/>
        <div style={{marginTop:'100px'}}>
        {child}
        </div>
    </>
  )
}

export default Layout