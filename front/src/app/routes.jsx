import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from '../pages/login/login'
import WizardAdd from '../pages/wizard/add/wizardAdd'
import WizardList from '../pages/wizard/list/wizardList'

export default function Routes () {
    return (
        <Switch>
            <Route path='/wizard/list' component={WizardList} />
            <Route path='/wizard/add/:id?' component={WizardAdd} />
            <Route path='/login' component={Login} />
            <Redirect exact from='/' to='login' />
        </Switch>
    )
}
