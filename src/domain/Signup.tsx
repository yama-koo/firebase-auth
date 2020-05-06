/** @jsx jsx */
import { jsx } from '@emotion/core'
import { auth } from 'firebase'
import { Box, Form, FormField, TextInput, Button, Anchor } from 'grommet'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { firebase } from '../lib/firebase'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const params = new URLSearchParams(useLocation().search)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/')
      }
    })
  })

  const handleSubmit = async () => {
    try {
      const actionCodeSetting: auth.ActionCodeSettings = {
        url: 'http://localhost:3000/confirm',
        handleCodeInApp: true,
      }
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSetting)
      // await firebase.auth().createUserWithEmailAndPassword(email, password)
      // history.push('/')
      window.localStorage.setItem('emailForSignIn', email)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message

      console.log(errorCode)
      console.log(errorMessage)
    }
  }
  return (
    <Box>
      <Form>
        <FormField label="email">
          <TextInput
            name="email"
            onChange={event => {
              setEmail(event.currentTarget.value)
            }}
          />
        </FormField>
        <FormField label="password">
          <TextInput
            type="password"
            name="password"
            onChange={event => {
              setPassword(event.currentTarget.value)
            }}
          />
        </FormField>
        <Box direction="row" align="center">
          <Button
            type="button"
            label="submit"
            onClick={async () => {
              await handleSubmit()
            }}
          />
          <Anchor href="/signin" label="sign in" />
        </Box>
      </Form>
      <Box>{params.get('token')}</Box>
      <Box>{params.get('apiKey')}</Box>
      <Box>{params.get('oobCode')}</Box>
    </Box>
  )
}
