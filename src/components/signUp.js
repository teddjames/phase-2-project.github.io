import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signup(username, password)) {
      setMessage(`Account created successfully for ${username}! ✅`);
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage('Username already taken. Try a different one ❌');
    }

  };

  return (
    <div className='signup-page'>
        <div className="signup-container">
      <h2 className='signup-heading'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='form-group'>
        <input
          type="text"
          className='input'
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className='form-group'>
        <input
          type="password"
          placeholder="Create password"
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit" className='signup-button'>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    
  );
}

export default SignUp;
