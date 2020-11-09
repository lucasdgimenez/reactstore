import React, {useState, useEffect} from "react"
import {withRouter} from "react-router-dom"
import "../AuthWrapper/styles.scss"
import {useDispatch, useSelector} from "react-redux"
import {signUpUser, resetAllAuthForms} from "./../../redux/User/user.actions"
import AuthWrapper from "./../AuthWrapper"
import FormInput from "./../forms/FormInput"
import Button from "./../forms/Button"

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const Signup = props => {
  const {signUpSuccess, signUpError} = useSelector(mapState)
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (signUpSuccess) {
      reset();
      dispatch(resetAllAuthForms())
      props.history.push("/")      
    }
   
  }, [signUpSuccess])

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
    }
    
  }, [signUpError])

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([])
  }
  
  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUser({
      displayName, email, password, confirmPassword
    }))

    {/*if(password !== confirmPassword) {
      const err = ['Senha não bate'];
      
      setErrors(err)
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName });
      reset();
      props.history.push("/")

    } catch (err) {
      //console.log(err)
    }*/}
  }
    const configAuthWrapper = {
      headline: 'Registration'
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
            {errors.length > 0 &&
              <ul>
                {errors.map((err, index) => {
                  return (
                    <li key={index}>
                      {err}
                    </li>
                  )
                })} 
            </ul>}
            <form onSubmit={handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={e => setDisplayName(e.target.value)}
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={e => setConfirmPassword(e.target.value)}
              />

              <Button type="submit">
                Sign Up
              </Button>

            </form>
          </div>
      </AuthWrapper>
    )
  }


export default withRouter(Signup);