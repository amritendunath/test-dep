import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import loginImg from '../../assets/login.png'

import styles from './auth.module.scss'

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const alert = useAlert()
  const dispatch = useDispatch()

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect)
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Login'} />

          {/* <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mb-3'>Login</h1>
                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password_field'>Password</label>
                  <input
                    type='password'
                    id='password_field'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to='/password/forgot' className='float-right mb-4'>
                  Forgot Password?
                </Link>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                >
                  LOGIN
                </button>

                <Link to='/register' className='float-right mt-3'>
                  New User?
                </Link>
              </form>
            </div>
          </div> */}

          {/* divide */}
          <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
              <img src={loginImg} alt='Login' width='350' />
            </div>

            <div className={`row wrapper login${styles.form}`}>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <input
                  placeholder='Email'
                  type='email'
                  id='email_field'
                  className='form-control'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder='Password'
                  type='password'
                  id='password_field'
                  className='form-control'
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-1.5 '
                >
                  Login
                </button>

                <div className={styles.links}>
                  <Link to='/password/forgot'>Reset Password</Link>
                </div>
                <p>-- or --</p>

                <span className={styles.register}>
                  <p>Don't have an account?</p>
                  <Link to='/register'>Register</Link>
                </span>
              </form>
            </div>
          </section>
        </Fragment>
      )}
    </>
  )
}

export default Login
