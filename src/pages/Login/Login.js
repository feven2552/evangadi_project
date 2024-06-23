import {useRef, useState} from 'react'
import axios from '../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import classes from '../Login/Login.module.css'
import LayOut from '../../Components/LayOut/LayOut'

function Login() {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState("null")

    const navigate =useNavigate()

    const EmailDom = useRef()
    const PasswordDom = useRef()

    async function handleSubmit(e){
        e.preventDefault();
        const Emailvalue = EmailDom.current.value
        const Passwordvalue = PasswordDom.current.value

        if(!Emailvalue||!Passwordvalue){
            setError("Please Provide all required information")
            // alert('Please Provide all required information');
            return;
        }
       try{
            const {data} = await axios.post('/users/login', {
                email:Emailvalue,
                password:Passwordvalue,
            });
            // alert('Sucessfully login.')
            localStorage.setItem('token',data.token)
            navigate('/')
            console.log(data);
            setSuccess("Sucessfully login.")
       } catch(error){
        // alert(error?.response?.data?.message)
        console.log(error?.response?.data?.message);
        setError("Invalid Credential");
       }
    }
  return (
    <LayOut>
        <section className={classes.both}>
            <section className={classes.login}>
                <div className={classes.login_container}>
                    <h2>Login to your account</h2>
                        {error && (
                        <p
                            style={{
                            textAlign: "center",
                            color: "red",
                            marginBottom: "13px",
                            }}
                        >
                            {error}
                        </p>
                        )}
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingBottom: "15px",
                        }}
                        >
                        <span>Don't Have an Account?</span>
                        <Link to={"/register"} style={{ marginTop: "0px" }}>
                            Create a new account
                        </Link>
                        </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>Email</span>
                            <input ref = {EmailDom} type='email' placeholder='email'/>
                        </div>
                        <br />
                        <div>
                            <span>Password</span>
                            <input ref = {PasswordDom} type='password' placeholder='password'/>
                        </div>
                        <br />
                        <button className={classes.btn} type='submit'>Login</button>
                    </form>
                    <Link to = {'/register'}>Register</Link>
                </div>
            </section>
            <section className={classes.para}>
                <div className={classes.para_container}>
                    <Link className={classes.para_about}>About</Link>
                    <div>
                        <h1>Evangadi Networks Q&A</h1>
                    </div>
                    <div>
                        <p>
                            No matter what stage of life you are in, whether you’re just
                            starting elementary school or being promoted to CEO of a Fortune
                            500 company, you have much to offer to those who are trying to
                            follow in your footsteps.
                        </p>
                        <p>
                            Wheather you are willing to share your knowledge or you are just
                            looking to meet mentors of your own, please start by joining the
                            network here.
                        </p>
                    </div>
                    <button>How it Works</button>
                </div>
            </section>
        </section>
    </LayOut>
  )
}

export default Login