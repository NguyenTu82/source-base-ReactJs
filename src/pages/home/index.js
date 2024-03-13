import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { token } = useSelector((store) => store.auth)
  console.log(token)
  return (
    <div>
        Home
    </div>
  )
}

export default Home
