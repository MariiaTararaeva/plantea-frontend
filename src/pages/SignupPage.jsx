import AuthForm from '../components/AuthForm'

const SignupPage = () => {
  const handleSignup = async credentials => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      if (response.status === 201) {
        console.log('User created')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <AuthForm submitCallback={handleSignup} />
    </>
  )
}

export default SignupPage
