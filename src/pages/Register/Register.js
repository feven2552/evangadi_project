import {useRef, useState} from 'react'
import axios from '../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'
import classes from '../Register/Register.module.css'
import LayOut from '../../Components/LayOut/LayOut'
function Register() {

   const navigate =useNavigate()
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState("");

    const usernameDom = useRef()
    const FirstnameDom = useRef()
    const LastnameDom = useRef()
    const EmailDom = useRef()
    const PasswordDom = useRef()
    // const target = new EventTarget();

    async function handleSubmit(e){
        e.preventDefault();

        const usernamevalue = usernameDom.current.value
        const Firstnamevalue = FirstnameDom.current.value
        const Lastnamevalue = LastnameDom.current.value
        const Emailvalue = EmailDom.current.value
        const Passwordvalue = PasswordDom.current.value

        if(!usernamevalue||
            !Firstnamevalue||
            !Lastnamevalue||
            !Emailvalue||
            !Passwordvalue){
            // alert('Please Provide all required information');
            setError("please provide all required fields !");
            return;
        }
       try{
            await axios.post('/users/register', {
                username:usernamevalue,
                firstname:Firstnamevalue,
                lastname:Lastnamevalue,
                email:Emailvalue,
                password:Passwordvalue,
            });
            // alert('Sucessfully registered. Please login')
            navigate('/login')
            setSuccess("register successfully. please login");
       } catch(error){
        console.log(error.response);
        setError("something went wrong!");
       }
    }
    // target.removeEventListener('end',handleSubmit);
  return (
        <LayOut>
            <div className={classes.bg}>
                <section className={classes.both}>
                    <section className={classes.register}>
                        <div className={classes.register_container}>
                            <h2>Join the network</h2>
                            {success && (
                                <p
                                style={{
                                    textAlign: "center",
                                    color: "green",
                                    marginBottom: "13px",
                                }}
                                >
                                {success}
                                </p>
                            )}
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
                                <span>Already have an account?</span>
                                <Link to={"/login"} style={{ marginTop: "0px" }}>
                                sign in
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit} className={classes.registration__form}>
                                <div>
                                    <span>Username</span>
                                    <input ref = {usernameDom} type='text' placeholder='Username'/>
                                </div>
                                <br />
                                <div className={classes.first_last_name}>
                                    <div>
                                        <span>First Name</span>
                                         <input ref = {FirstnameDom} type='text' placeholder='First name'/>
                                    </div>
                                    {/* <br /> */}
                                    <div>
                                        <span>Last Name</span>
                                        <input ref = {LastnameDom} type='text' placeholder='Last name'/>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <span>Email</span>
                                    <input ref = {EmailDom} type='email' placeholder='Email'/>
                                </div>
                                <br />
                                <div>
                                    <span>Password</span>
                                    <input ref = {PasswordDom} type='password' placeholder='Password'/>
                                </div>
                                <br />
                                <br />
                                <button className={classes.btn} type='submit'>Register</button>
                            </form>
                            <p>I agree to the
                            <Link to = {'/login'}> privacy policy </Link> and
                            <Link to = {'/login'}> terms of serivice. </Link>
                            </p>
                            <br/>
                            <br/>
                            <Link to = {'/login'}>Already have an account</Link>
                            <br/>
                            <br/>
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
                            starting elementary school or being promoted to CEO of a
                            Fortune 500 company, you have much to offer to those who are
                            trying to follow in your footsteps.
                            </p>
                            <p>
                            Wheather you are willing to share your knowledge or you are
                            just looking to meet mentors of your own, please start by
                            joining the network here.
                            </p>
                        </div>
                        <button>How it Works</button>
                        </div>
                    </section>
                </section>
            </div>
        </LayOut>
  )
}

export default Register