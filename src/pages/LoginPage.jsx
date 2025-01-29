import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { SessionContext } from "../contexts/SessionContext";

const LoginPage = () => {
  const { setToken, setUser, user } = useContext(SessionContext);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      if (response.status === 200) {
        const data = await response.json();

        setToken(data.token);

        // fetching user data and use the setUser from context ???
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${data.token}` },
        })

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <AuthForm
        submitCallback={handleLogin}
        fields={[
          { name: "username", label: "Username", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ]}
        buttonLabel="Log In"
      />
    </>
  );
};

export default LoginPage;
