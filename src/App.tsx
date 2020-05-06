/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Grommet } from 'grommet'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Confirm } from './domain/Confirm'
import { Home } from './domain/Home'
import { Signin } from './domain/Signin'
import { Signup } from './domain/Signup'

export const App = () => {
  return (
    <Grommet>
      <Router>
        <Switch>
          {/* <Route path="/signup/:token"> */}
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/confirm">
            <Confirm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  )
}
