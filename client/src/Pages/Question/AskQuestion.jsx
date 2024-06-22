import React, { useState } from "react";
import classes from "./AskQuestion.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import axios from "../../axiosConfig";
function AskQuestion() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [successful, setSeccessful] = useState(false);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function addQuestion(e) {
		e.preventDefault();
		setSeccessful(!successful);
		try {
			if (title.length === 0 && description.length === 0) {
				alert("Please fill all the fields");
			} else if (title.length === 0) {
				alert("Please fill the title of your Question!");
			} else if (description.length === 0) {
				alert("Please fill the description of your Question!");
			}
			const { data } = await axios.post(
				"/questions/ask-questions",
				{ title, description },
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			console.log(data);
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		} catch (error) {
			console.log(error.response);
		}
	}

	return (
		<>
			<Header />
			<div className={classes.Full_page}>
				<div className={classes.container}>
					<div className={classes.instructions}>
						<h2>Steps to write a good question</h2>
						<ul>
							<li>Summerize your problem in a one-line title.</li>
							<li>Describe your problem in more detail.</li>
							<li>Describe what you tried and what you expected to happen.</li>
							<li>Review your question and post it to the site.</li>
						</ul>
					</div>
				</div>
				<section>
					<div className={classes.q_area}>
						<h2>Ask a public question</h2>

						<div>
							<small
								style={{
									display: successful ? "block" : "none",
									color: "green",
								}}
							>
								Question posted successfully. Redirecting to home page...
							</small>
						</div>

						<Link to="/home" style={{textDecoration: "none", color: "black"}}>
							<small className={classes.small}>Go to question page</small>
						</Link>

						<div>
							<form action="" onSubmit={addQuestion}>
								<div>
									<input
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)} // updating the state
										placeholder="Title"
									/>
								</div>
								<div>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)} // Updating the state
										rows="10"
										cols="125"
										placeholder="Question Description..."
									></textarea>
								</div>
								<div>
									<button type="submit">Post Your Question</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}

export default AskQuestion;
