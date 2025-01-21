import { useState } from 'react'

const AuthForm = ({ submitCallback }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstname] = useState('')
  const [surname, setLastname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    submitCallback({ username, password, firstName, surname, email }) 
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
      <label>
        First Name
        <input
          type='firstName'
          required
          value={firstName}
          onChange={event => setFirstname(event.target.value)}
        />
      </label>
      <label>
        Last Name
        <input
          type='surname'
          required
          value={surname}
          onChange={event => setLastname(event.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type='email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </label>
      <button type='submit'>SignUp</button>
    </form>
  )
}

export default AuthForm
