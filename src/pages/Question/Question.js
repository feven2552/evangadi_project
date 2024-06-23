import React,  { useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import classes from "../Question/Question.module.css";
import axios from "../../axiosConfig";
import LayOut from "../../Components/LayOut/LayOut";
import { FaArrowAltCircleRight } from "react-icons/fa";
function Question() {
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
  
    const titleDom = useRef();
    const descriptionDom = useRef();
  
    const askQuestion = async () => {
      const titleValue = titleDom.current.value;
      const descriptionValue = descriptionDom.current.value;
  
      if (!titleValue || !descriptionValue) {
        // alert("please provide all required fields !");
        setError("please provide all required fields ");
        return;
      }
  
      try {
        await axios.post(
          "/ask",
          {
            title: titleValue,
            description: descriptionValue,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSuccess("Question asked successfully");
        navigate("/");
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    };
  
    return (
      <LayOut>
        <section className={classes.ask}>
          <div className={classes.ask_container}>
            <h1>Steps to Write a good question</h1>
            <div className={classes.ask_container_list}>
              <ul>
                    <div className={classes.listofinstraction}><FaArrowAltCircleRight /><li>Summarize your problem in a one-line title.</li></div>
                    <div className={classes.listofinstraction}><FaArrowAltCircleRight /><li>Describe your problem in more detail.</li></div>
                    <div className={classes.listofinstraction}><FaArrowAltCircleRight /><li>Describe what you tried and what you expected to happen.</li></div>
                    <div className={classes.listofinstraction}><FaArrowAltCircleRight /><li>Review your question and post it to the site.</li></div>
              </ul>
            </div>
            <div>
              <h2>Post Your Question</h2>
              <Link to={"/"}>Go to Question page</Link>
            </div>
            {error && <p style={{ padding: "5px", color: "red" }}>{error}</p>}
            <div id={classes.ask_container_title}>
              <input ref={titleDom} type="text" placeholder="Title" />
            </div>
            <div className={classes.ask_container_dec}>
              <input
                ref={descriptionDom}
                type="text"
                placeholder="Question Description..."
              />
            </div>
            {success && (
              <p style={{ padding: "5px", color: "green" }}>{success}</p>
            )}
            <button onClick={askQuestion}>Post Your Question</button>
          </div>
        </section>
      </LayOut>
    );
}

export default Question;