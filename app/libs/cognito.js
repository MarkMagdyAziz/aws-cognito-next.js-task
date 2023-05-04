import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js'
import {POOL} from './constants'

const poolData = {
  UserPoolId: `${ POOL.USER_ID }`,
  ClientId: `${ POOL.CLIENT_ID }`,
}

const userPool = new CognitoUserPool(poolData)
let currentUser = userPool.getCurrentUser()


export function getCurrentUser () {
  return currentUser
}
function getCognitoUser (username) {
  const userData = {
    Username: username,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData)

  return cognitoUser
}

export async function getSession () {
  console.log('1 cognito getSession', currentUser)
  if(!currentUser) {
    currentUser = userPool.getCurrentUser()
  }

  return new Promise(function(resolve, reject) {
    currentUser.getSession(function(err, session) {
      console.log('2 getSession', currentUser)

      if(err) {
        console.log('3 resolve getSession', err)

        reject(err)
      } else {
        console.log('4 resolve getSession', currentUser)
        resolve(session)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export async function signUpUser (username, email, password, givenName, familyName, gender, phoneNumber) {
  return new Promise(function(resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: givenName,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: familyName,
      }),
      new CognitoUserAttribute({
        Name: 'gender',
        Value: gender,
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phoneNumber,
      }),
    ]
    userPool.signUp(username, password, attributeList, [], function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export async function verifyCode (username, code) {
  return new Promise(function(resolve, reject) {
    const cognitoUser = getCognitoUser(username)

    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if(err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export async function signInWithEmail (username, password) {
  return new Promise(function(resolve, reject) {
    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    currentUser = getCognitoUser(username)
    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: function(res) {
        resolve(res)
      },
      onFailure: function(err) {
        reject(err)
      },
      mfaRequired: function(res) {
        // TODO: handle first login
        resolve(res)
      },
    })
  }).catch((err) => {
    throw err
  })
}

export function signOut () {
  if(currentUser) {
    currentUser.signOut()
  }
}
export async function getAttributes () {
  return new Promise(function(resolve, reject) {
    currentUser.getUserAttributes(function(err, attributes) {
      if(err) {
        reject(err)
      } else {
        resolve(attributes)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export async function setAttribute (attribute) {
  return new Promise(function(resolve, reject) {
    const attributeList = []
    const res = new CognitoUserAttribute(attribute)
    attributeList.push(res)

    currentUser.updateAttributes(attributeList, (err, res) => {
      if(err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  }).catch((err) => {
    throw err
  })
}

export async function sendCode (username) {
  return new Promise(function(resolve, reject) {
    const cognitoUser = getCognitoUser(username)

    if(!cognitoUser) {
      reject(`could not find ${ username }`)
      return
    }

    cognitoUser.forgotPassword({
      onSuccess: function(res) {
        resolve(res)
      },
      onFailure: function(err) {
        reject(err)
      },
    })
  }).catch((err) => {
    throw err
  })
}
export async function forgotPassword (username, code, password) {
  return new Promise(function(resolve, reject) {
    const cognitoUser = getCognitoUser(username)

    if(!cognitoUser) {
      reject(`could not find ${ username }`)
      return
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function() {
        resolve('password updated')
      },
      onFailure: function(err) {
        reject(err)
      },
    })
  })
}

export async function changePassword (oldPassword, newPassword) {
  return new Promise(function(resolve, reject) {
    currentUser.changePassword(oldPassword, newPassword, function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
