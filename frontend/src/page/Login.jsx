import { useState, useEffect } from 'react';
import '../style/login.css'
import { signupAction, loginAction, resetAction, otpVerifyAction, changePasswordAction } from '../actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import Loader from '../components/Loader';

const Login = () => {
    const otpVerifyState = useSelector((state)=> state.otpVerifyReducer)
    const { otpVerifyloading, otpVerifysuccess } = otpVerifyState;
    useEffect(()=> {
        if(otpVerifysuccess === true) 
        {
            setChangePasswordState(true);
        }
    }, [otpVerifyState])

    const [state, setState] = useState("Log In");
    const [otpState, setOtpState] = useState(false)
    const [reset, setReset] = useState(false);
    const [otp, setOtp] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();


    const [changePasswordState, setChangePasswordState] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [comfirmNewPassword, setConfirmNewPassword] = useState('');



    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleChangePassword = () => {
        if(comfirmNewPassword === newPassword ){
            dispatch(changePasswordAction({email, newPassword}))
        }else{
            alert("Confirm Password Not matched!!")
        }
    }
    const changePassState = useSelector((state)=> state.changePasswordReducer)
    const {changePasswordloading, changePasswordsuccess } = changePassState;
    if(changePasswordsuccess === true){
        window.location.reload(false);
    }



    useEffect(()=> {
        if(localStorage.getItem('currentUser')){
            window.location.href = '/';
        }
    }, []);


    const loginState = useSelector((state)=> state.loginUserReducer)
    const {loginLoading, loginSuccess, loginError} = loginState;

    const handleLogin = ()=> {
        const user = {email, password};
        if(email===""|| password === ""){
            alert("Fill all fields!!")
            return;
        }
        dispatch(loginAction(user));
        setPassword('');
    }
    useEffect(()=>{ 
        if(loginError){
            alert("Email or Password not matched⛔⛔")
        }
        if(loginSuccess){
            alert("You are logged in.")
        }
            
    }, [loginError, loginSuccess])

    const {loading, success} =  useSelector((state)=> state.signupReducer)
    const handleSignup = ()=> {
        if(email===""|| password === "" || password === "" || confirmPassword === ""){
            alert("Fill all fields!!")
            return;
        }
        if(password !== confirmPassword){
            alert("Confirm Password not matched")
        }else{
        const user = {name, email, password, confirmPassword};
        dispatch(signupAction(user));
        }
    }
    useEffect(()=> {
        if(success === true){
            window.location.reload(false);
            setPassword('');
            setName('')
            setConfirmPassword('');
            alert("Signup Successfull")
        }

    }, [success])

    const handleReset = () => {
        if(email === ""){
            alert("Enter Email!!")
            return;
        }
        if (email) {
          dispatch(resetAction(email));
          setOtpState(true);
          console.log('Dispatched reset action for email:', email);
        } else {
          alert('Invalid or missing email for reset action.');
        }
      };

    const handleOTPverify = async () => {
        if(otp === ""){
            alert("Enter OTP!!")
            return;
        }
        if(otp) {
            dispatch(otpVerifyAction(email,otp));
        }else{
            alert("Fill the Otp first.")
        }
    }
    return (

        <>
            {
            loginLoading || otpVerifyloading || changePasswordloading ? <Loader/> : 
        <div className='main-div'>
           <div className='login-container'>
            <div className='container-2nd'>
                <h5 className='h5-fisrt'>greenEarth</h5>
                { 
                changePasswordState ? (
                    <>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='Confirm New Password' 
                    value={comfirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)}></input>
                    <button className='password-toggle-btn' onClick={handleTogglePassword}>
                        {showPassword ? 'Hide' : 'Show'} Password
                    </button>
                    <p className='forget-password' onClick={()=> window.location.reload(false)}><span>Back to Login page.</span> click here!!</p>
                    </>
                ) :
                otpState ? (
                    <>
                    <input 
                    type="text" 
                    placeholder='Enter your email address' 
                    value={email} onChange={(e)=> setEmail(e.target.value)} 
                    readOnly></input>
                    <input 
                    type="text" 
                    placeholder='Enter your OTP' 
                    value={otp} onChange={(e)=> setOtp(e.target.value)}></input>
                     <p className='forget-password' onClick={()=> window.location.reload(false)}><span>Back to Login page.</span> click here!!</p>
                    </>
                )
                    :
                reset ? (
                    <>
                    <input 
                    type="text" 
                    placeholder='Enter your email address' 
                    value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <p className='forget-password' onClick={()=> setReset(!(reset))}><span>Back to Login page.</span> click here!!</p>
                    </>
                ) :
                (state==="Log In" ? 
                <> 
                    <input
                        type="email"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    ></input>
                    <button className='password-toggle-btn' onClick={handleTogglePassword}>
                        {showPassword ? 'Hide' : 'Show'} Password
                    </button>
                    <p className='forget-password' onClick={()=> setReset(!(reset))}><span>forget password.</span> click here!!</p>
                </> :
                <>
                    <input 
                    type="text" 
                    placeholder='email address' 
                    value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <input 
                    type="text" 
                    placeholder='Full Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    ></input>
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    ></input>
                    <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='Confirm Password'
                    value={confirmPassword} 
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    ></input>
                    <button className='password-toggle-btn' onClick={handleTogglePassword}>
                        {showPassword ? 'Hide' : 'Show'} Password
                    </button>
                </>)}
                {
                    changePasswordState ? (
                        <button className='signbtn' type='' onClick={handleChangePassword}>Change Password</button>
                    ) :

                    otpState ? (
                        <button className='signbtn' type='' onClick={handleOTPverify}>Verify OTP</button>
                    ) :
                    reset ? (<button className='signbtn' type='' onClick={handleReset}>Send OTP</button>) : (
                        <>
                            {/* <div className='orDiv'><span><hr/></span><p>OR</p><span><hr/></span></div> */}
                            {state==="Log In" ? 
                                <button className='signbtn' type='' onClick={handleLogin}>Log In</button> :
                                <button className='signbtn' onKeyDown={(e) => e.key === 'Enter' && handleSignup} type={loading === true ? "button" : "submit"} disabled={loading === true} onClick={handleSignup}>
                                    {loading ? <Loader/> : success ? "Sign Up Successfull" : "Sign Up" }
                                </button>

                            }
                        </>
                    )
                }

            </div>

            </div>
            {
                reset ? ("") : (
                    <div className='loginContainer'>
                        <p>{state === "Log In" ? "Havn't an account? ":" Have an account? "}<Link to='#' className='login-signup-btn-link' onClick={ () =>{setState( state == "Log In" ? "Sign Up" : "Log In")}}>{state === 'Log In' ? 'Sign Up' : 'Log In'}</Link></p>
                    </div>
                )
            }

        </div>
            }
        </>
    )
}

export default Login;