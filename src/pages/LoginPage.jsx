import { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  const { setToken } = useContext(SessionContext)

  const handleLogin = async credentials => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setToken(data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <AuthForm submitCallback={handleLogin} />
    </>
  )
}

export default LoginPage
