/** @jsx jsx */
import { jsx } from '@emotion/core'
import { auth } from 'firebase'
import { Box, Form, FormField, TextInput, Button, Anchor } from 'grommet'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { firebase } from '../lib/firebase'

export const Confirm = () => {
  const history = useHistory()

  useEffect(() => {
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation')
      return
    }
    // The client SDK will parse the code from the link for you.
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(_result => {
        window.localStorage.removeItem('emailForSignIn')
        history.push('/')
      })
      .catch(_error => {})
  })

  return <Box>waiting...</Box>
}
