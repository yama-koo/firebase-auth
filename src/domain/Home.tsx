/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box, Button } from 'grommet'
import { firebase } from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { User } from 'firebase'

export const Home = () => {
  const history = useHistory()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        history.push('signin')
        return
      } else {
        setUser(user)
      }
    })
  })

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut()
      history.push('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user)

  return (
    <Box>
      {user ? (
        <Fragment>
          <Box>Home</Box>
          <Button onClick={async () => await handleSignOut()} label="sign out"></Button>
          <Box>{user?.displayName}</Box>
          <Box>{user?.email}</Box>
          <Box>{user?.isAnonymous}</Box>
          <Box>{user?.uid}</Box>
          <Box>{JSON.stringify(user?.providerData)}</Box>
        </Fragment>
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}
