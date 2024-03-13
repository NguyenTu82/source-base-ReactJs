import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LocalStorage from '../utils/storage'
import Loading from '../components/loading'
import Page from '../components/page'
import Header from '../layout/header'
import SideBar from '../layout/side-bar'

import Utils from '../layout/utils'
import Wrapper from '../layout/wrapper'

import './style.scss'

const Login = lazy(() => import('../pages/login'))
const Home = lazy(() => import('../pages/home'))
const NotFound = lazy(() => import('../pages/not-found'))

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}

class Routes extends Component {
  renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

  renderAuthRoutes = () => (
    <>
      <Suspense fallback={<Page sidebar><Loading /></Page>}>
        <Utils />
        <SideBar />
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={this.renderLazyComponent(Home)} />
            <Redirect to="/not-found" />
          </Switch>
        </Wrapper>
      </Suspense>
    </>
  )

  render() {
    return (
      <Suspense fallback={<Page><Loading /></Page>}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Router>
          <Switch>
            <Route path="/login" component={this.renderLazyComponent(Login)} />
            <Route path="/not-found" component={this.renderLazyComponent(NotFound)} />
            <PrivateRoute
              condition={() => LocalStorage.get('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this.renderAuthRoutes}
            />
          </Switch>
        </Router>
      </Suspense>
    )
  }
}

export default Routes
