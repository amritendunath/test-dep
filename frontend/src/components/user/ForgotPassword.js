import React, { Fragment, useState, useEffect } from 'react'
import forgotImg from '../../assets/forgot.png'
import MetaData from '../layout/MetaData'
import styles from './auth.module.scss'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const alert = useAlert()
  const dispatch = useDispatch()

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (message) {
      alert.success(message)
    }
  }, [dispatch, alert, error, message])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('email', email)

    dispatch(forgotPassword(formData))
  }

  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgotImg} alt='Login' width='350' />
        </div>
        <div className={`row  wrapper forgot${styles.auth}`}>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  )
}

export default ForgotPassword
