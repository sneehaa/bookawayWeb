import React from 'react'
import Header from '../components/Header'
import Hotels from './Hotels'

const Homepage = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '30px' }}> 
        <Hotels />
      </div>
    </div>
  )
}

export default Homepage