import React, { Fragment, useState, useEffect } from 'react'
import styles from './auth.module.scss'
import MetaData from '../layout/MetaData'
import registerImg from '../../assets/register.png'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import '../../App.css'

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = user

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  )

  const alert = useAlert()
  const dispatch = useDispatch()

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, isAuthenticated, error, history])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('avatar', avatar)

    dispatch(register(formData))
  }

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <Fragment>
      <MetaData title={'Register User'} />

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={registerImg} alt='Register' width='400' />
        </div>
        <div className={`row wrapper register${styles.form} `}>
          <>
            <form className='shadow-lg'
              onSubmit={submitHandler}
              encType='multipart/form-data'
            >
              

              <div className='form-group'>
                
                <input
                  type='name'
                  placeholder='Name'
                  id='name_field'
                  className='form-control'
                  name='name'
                  value={name}
                  required
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                
                <input
                  type='email'
                  placeholder='Email'
                  id='email_field'
                  className='form-control'
                  name='email'
                  value={email}
                  required
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                
                <input
                  type='password'
                  placeholder='Password'
                  id='password_field'
                  className='form-control'
                  name='password'
                  value={password}
                  required
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                  <div>
                    <figure className='avatar mr-3 item-rtl'>
                      <img
                        src={avatarPreview}
                        className='rounded-circle'
                        alt='Avatar Preview'
                      />
                    </figure>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='avatar'
                      className='custom-file-input'
                      id='customFile'
                      accept='iamges/*'
                      onChange={onChange}
                      required
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Select Pic
                    </label>
                  </div>
                </div>
              </div>

              <button
                id='register_button'
                type='submit'
                className='btn btn-block py-2'
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </form>
          </>
        </div>
      </section>
    </Fragment>
  )
}

export default Register
