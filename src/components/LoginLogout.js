import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ message,setMessage ] = useState('')
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setMessage(`Hello ${username}, you have successfully logged in! ✅`);
      setTimeout(() => {
        navigate('/inventory');
      }, 1000);
    } else {
      setMessage('Login failed. Please try again ❌');
    }
  };
  return (
    <div className='login-page'>
         <div className="login-container">
      <h2 className='heading'>Login to view our inventory</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
        <input
          className='input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className='form-group'>
        <input
          className='input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='login-button'>Login</button>
        </div>
        
      </form>
      {message && <p className="login-message">{message}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link">Sign up here</Link>
      </p>
    </div>
    </div>
   
  );
}

export default Login;