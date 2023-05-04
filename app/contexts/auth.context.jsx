"use client"
import React,{useEffect,useState} from 'react'
import {AUTH_STATUS} from '../libs/constants'
import * as cognito from '../libs/cognito'



const defaultState = {
    authStatus: '',
    sessionInfo: {},
    attrInfo: [],
    signUp: (username, email, password,givenName, familyName, gender, phoneNumber) => { },
    signInWithEmail: () => { },
    signOut: () => { },
    verifyCode: (username,code) => { },
    getSession: () => { },
    getAttributes: () => { },
}
export const AuthContext = React.createContext(defaultState)
// export const AuthIsSignedIn = ({ children }) => {
//   const { authStatus } = useContext(AuthContext)

//   return <>{authStatus === AuthStatus.SignedI && children }</>
// }

// export const AuthIsNotSignedIn = ({ children }) => {
//   const { authStatus } = useContext(AuthContext)

//   return <>{authStatus === AuthStatus.SignedOut && children }</>
// }
const AuthProvider = ({children}) => {
  const [authStatus, setAuthStatus] = useState('')
  const [sessionInfo, setSessionInfo] = useState({})
  const [attrInfo, setAttrInfo] = useState([])

    useEffect(() => {
      console.log('useEffect')
        async function getSessionInfo() {
          try {
            const session = await getSession()
            setSessionInfo({
              accessToken: session.accessToken.jwtToken,
              refreshToken: session.refreshToken.token,
            })
            console.log(session)
            window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`)
            window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`)
            await setAttribute({ Name: 'website', Value: 'https://github.com/MarkMagdyAziz' })
            const attr = await getAttributes()
            setAttrInfo(attr)
            setAuthStatus(AUTH_STATUS.SignedIn)
          } catch (err) {
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('refreshToken')

            setAuthStatus(AUTH_STATUS.SignedOut)
          }
        }
        getSessionInfo()
      }, [setAuthStatus, authStatus])

      if (authStatus === AUTH_STATUS.Loading) {
        return null
      }

  async function signInWithEmail(username, password) {

    try {

      await cognito.signInWithEmail(username, password)

      setAuthStatus(AUTH_STATUS.SignedIn)
    } catch(err) {
      setAuthStatus(AUTH_STATUS.SignedOut)
      throw err
    }
  }

  async function signUp(username, email, password,givenName, familyName, gender, phoneNumber) {
    try {
      await cognito.signUpUser(username, email, password,givenName, familyName, gender, phoneNumber)
    } catch (err) {
      throw err
    }
  }

  function signOut() {
    cognito.signOut()
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    setAuthStatus(AUTH_STATUS.SignedOut)
  }

  async function verifyCode(username, code) {
    try {
      await cognito.verifyCode(username, code)
    } catch (err) {
      throw err
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession()
      return session
    } catch (err) {
      throw err
    }
  }

  async function getAttributes() {
    try {
      const attr = await cognito.getAttributes()
      return attr
    } catch (err) {
      throw err
    }
  }

  async function setAttribute(attr) {
    try {
      const res = await cognito.setAttribute(attr)
      return res
    } catch (err) {
      throw err
    }
  }

  async function sendCode(username) {
    try {
      await cognito.sendCode(username)
    } catch (err) {
      throw err
    }
  }
  async function forgotPassword(username, code, password) {
    try {
      await cognito.forgotPassword(username, code, password)
    } catch (err) {
      throw err
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      await cognito.changePassword(oldPassword, newPassword)
    } catch (err) {
      throw err
    }
  }
  const state = {
    authStatus, verifyCode, getSession, getAttributes, setAttribute,forgotPassword,
    changePassword,sendCode, sessionInfo, attrInfo, signUp, signInWithEmail, signOut,
  }
      return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>

}
export default AuthProvider