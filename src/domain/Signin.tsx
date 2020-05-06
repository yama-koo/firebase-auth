/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box, Form, FormField, TextInput, Button, Anchor } from 'grommet'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { firebase } from '../lib/firebase'

export const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/')
      }
    })
  })

  const handleSubmit = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      history.push('/')
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
            onClick={() => {
              handleSubmit()
            }}
          />
          <Anchor href="/signup" label="sign up" />
        </Box>
      </Form>
    </Box>
  )
}
