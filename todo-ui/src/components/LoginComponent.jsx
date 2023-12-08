import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const navigator = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginForm = async(e) => {
        e.preventDefault();
        

       await loginAPICall(username,password).then((response) => {
            console.log(response.data);

            const token = 'Basic ' + window.btoa(username + ':' + password);
            storeToken(token);

            saveLoggedInUser(username);
            navigator('/todos', { state: { username } });

            window.location.reload(false);
        }).catch((error) => {
            console.log(error);
        });

    }

  return (
    <div className='container'>
    <br /> <br />
    <div className='row'>
        <div className='col-md-6 offset-md-3'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='text-center'>Login Form</h2>
                </div>
                
                <div className='card-body'>
                    <form>
  
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'>UserName or Email</label>
                            <div className='col-md-9'>
                                <input 
                                type="text"
                                name='username'
                                className='form-control'
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                placeholder='Enter Username' 
                                />
                            </div>
                       
                        </div>
  
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'>Password</label>
                            <div className='col-md-9'>
                                <input 
                                type="password"
                                name='password'
                                className='form-control'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder='Enter Password' 
                                />
                            </div>
                       
                        </div>
                        <div className='form-group mb3'>
                                <button className='btn btn-primary'
                                type='submit'
                                onClick={ (e) => handleLoginForm(e) }
                                >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default LoginComponent