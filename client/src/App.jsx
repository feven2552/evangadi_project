import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { useEffect, useState, createContext, useCallback } from "react";
import axios from "./axiosConfig.js";
import AskQuestion from "./Pages/Question/AskQuestion.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";

export const AppState = createContext();

function App() {
	const [user, setUser] = useState({});
	const [toggle, setToggle] = useState(true);
	async function handleToggle(e) {
		e.preventDefault();
		setToggle(!toggle);
	}

	function Logout() {
		localStorage.removeItem("token");
		// setUser(null);
		// setToggle(!toggle)
		navigate("/");
		// window.location.reload();
	}

	// useEffect(() => {
	// 	const checkUser = async () => {
	// 		try {
	// 			const { data } = await axiosInstance.get("/users/check", {
	// 				headers: { authorization: "Bearer " + token },
	// 			});
	// 			setUser(data);
	// 		} catch (error) {
	// 			console.log(error?.response?.data?.error);
	// 			setUser(null); // Explicitly set user to null if check fails
	// 			navigate("/login");
	// 		}
	// 	};
	// 	if (token) {
	// 		checkUser();
	// 	} else {
	// 		setUser(null); // Explicitly set user to null if no token
	// 	}
	// }, [token]);

	const token = localStorage.getItem("token");
	const currentPath = window.location.pathname;
	const navigate = useNavigate();
	async function checkUser() {
		if (currentPath === "/") {
			return;
		}
		try {
			const { data } = await axios.get("/users/check", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setUser(data);
			console.log(data);
		} catch (error) {
			console.log(error?.response);
			navigate("/login");
		}
	}

	useEffect(() => {
		checkUser();
	}, [token, checkUser]);

	// useEffect(() => {
	// 	if (token) {
	// 		checkUser();
	// 	} else {
	// 		setUser(null); // Explicitly set user to null if no token
	// 	}
	// }, [token, checkUser]);

	// const checkUser = useCallback(async () => {
	// 	// if (currentPath === "/register") {
	// 	// 	return;
	// 	// }

	// 	try {
	// 		const { data } = await axios.get("/users/check", {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 			},
	// 		});

	// 		setUser(data);
	// 	} catch (error) {
	// 		console.log(error);
	// 		navigate("/login");
	// 	}
	// }, [navigate]);

	// useEffect(() => {
	// 	checkUser();
	// }, [checkUser]);

	return (
		<AppState.Provider value={{ user, setUser, handleToggle, Logout }}>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/answers/:questionid" element={<Answer />} />
				{/* <Route path="/register" element={<Register />} /> */}
				<Route path="/askquestion" element={<AskQuestion />} />
			</Routes>
		</AppState.Provider>
	);
}

export default App;
