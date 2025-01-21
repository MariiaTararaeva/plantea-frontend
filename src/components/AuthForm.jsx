import { useState } from 'react'

const AuthForm = ({ submitCallback }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    submitCallback({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input required value={username} onChange={event => setUsername(event.target.value)} />
      </label>
      <label>
        Password
        <input
          type='password'
          required
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type='submit'>SignUp</button>
    </form>
  )
}

export default AuthForm
