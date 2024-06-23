import React, { useState, useEffect, useRef } from 'react'
import axios from "../../axiosConfig";
import classes from "../Answer/Answer.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import { MdAccountCircle } from "react-icons/md";

function Answer() {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [previouslyAnsweredQuestionId, setPreviouslyAnsweredQuestionId] =
    useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const answerDom = useRef();

  const fetchQuestion = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.get(
          "/questions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          setQuestion(response?.data?.data);
          console.log(response.data.data);
        } else {
          setMessage("Failed to fetch question.");
        }
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching question:", error.message);
        setMessage("An error occurred while fetching question.");
      }
    };
    // console.log(question);
  const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.get(
          "/allAnswers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status, response);
  
        if (response.status === 200) {
          setAnswers(response?.data?.data);
          console.log(response?.data?.data);
        } else {
          setMessage("Failed to fetch answers.");
        }
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching answers:", error.message);
        setMessage("An error occurred while fetching answers.");
      }
  };
  // console.log(answers);
  const previouslyAnsweredQuestionInfo = localStorage.getItem("questionInfo");
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    console.log(previouslyAnsweredQuestionInfo);
    if (previouslyAnsweredQuestionInfo) {
      const previouslyAnsweredQuestion = JSON.parse(
        previouslyAnsweredQuestionInfo
      );
      setPreviouslyAnsweredQuestionId(previouslyAnsweredQuestion.questionid);
      console.log(previouslyAnsweredQuestion.questionid);
    }
    
  }, []);

  const handelPostAnswer = async () => {
      const answerValue = answerDom.current.value;
      // console.log(answerValue)
      if (!answerValue) {
        setError("Please provide all required fields.");
        return;
      }
      try {
       //  const token = localStorage.getItem("token");
   
        const response = await axios.post(
          "/answer",
          {
            answer: answerValue,
            questionid: previouslyAnsweredQuestionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
   
        if (response.status === 200) {
          setAnswer(response?.data?.answer);
          console.log(response.data);
          setMessage("Answer submitted successfully.");
          setSuccess("Question answered successfully");
        }
        setSuccess("Question answered successfully");
        fetchAnswers();
      } catch (error) {
        console.error("Error submitting answer:", error.message);
        setMessage("An error occurred while submitting the answer.");
      }
    };
   

return (
  <LayOut>
  <section className={classes.answer}>
    <section className={classes.answer_container}>
      <h2>Question:</h2>
      <div className={classes.questionContent}>
        <div className={classes.questionTitle}>
          <h3>{JSON.parse(previouslyAnsweredQuestionInfo)?.title}</h3>

          <h4>{JSON.parse(previouslyAnsweredQuestionInfo)?.description}</h4>
        </div>
        <hr />
      </div>
      <h1>Answer From The Community</h1>
      <hr />
      <div>
        {message && <p>{message}</p>}
        {answers.length > 0 ? (
          <div>
            {console.log(
              "previouslyAnsweredQuestionId",
              previouslyAnsweredQuestionId
            )}
            {answers.map(
              (ans, index) =>               
               {
                return(
                  ans.questionid === previouslyAnsweredQuestionId && (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div className={classes.answerUser}>
                        <MdAccountCircle
                          style={{
                            marginRight: "10px",
                            fontSize: "60px",
                            color: "gray",
                          }}
                        />
                        <b>{ans.user_name}</b>
                      </div>
                      
                      <div className={classes.answerfromusers}>
                        <br />
                        {ans.answer}
                        {console.log(ans.answer)}
                        <br />                        
                      </div>
                    </div>
                  )
                )
               }
            )}
          </div>
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
      {/* <h1>Answer the top Question</h1> */}
      {/* <div className={classes.backButton}>
        <Link to="/">Go To Question page</Link>
      </div> */}
      {error && <p style={{ padding: "5px", color: "red" }}>{error}</p>}
      <div className="answer_container">
        <input
          className={classes.first_input}
          ref={answerDom}
          type="textarea"
          value={answer}
          placeholder="Your answer..."
          onChange={(e) => setAnswer(e.target.value)}
        />
        {/* <textarea rows="10" cols="134" className={classes.first_input}
          ref={answerDom}
          type="textarea"
          value={answer}
          placeholder={`\n\t Your answer...`}

          onChange={(e) => setAnswer(e.target.value)}>          
        </textarea> */}
      </div>
      <div>
        {success && (
          <p style={{ padding: "5px", color: "green" }}>{success}</p>
        )}
        <button onClick={handelPostAnswer}>
          <Link>Post Your Answer</Link>
        </button>
      </div>
    </section>
  </section>
</LayOut>
)
}

export default Answer;