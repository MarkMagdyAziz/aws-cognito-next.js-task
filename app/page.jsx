'use client'
import React,{useEffect} from 'react'
import {useContext} from 'react'
import {AuthContext} from './contexts/auth.context'

const HomePage = () => {
  const {authStatus} = useContext(AuthContext)

  useEffect(() => {

    // return () => {
    //   second
    // }
  }, [])

  return (
    <div>HomePage</div>
  )
}

export default HomePage