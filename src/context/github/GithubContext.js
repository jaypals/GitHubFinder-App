import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		isLoading: false,
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	// set loading
	const setLoading = () => dispatch({ type: "SET_LOADING" });

	// GET USERS FROM GITHUB (FOR TESTING PURPOSE ONLY)
	// const fetchUsers = async () => {
	// 	setLoading();

	// 	const response = await fetch(`${GITHUB_URL}/users`, {
	// 		headers: {
	// 			Authorization: `token ${GITHUB_TOKEN}`,
	// 		},
	// 	});

	// 	const data = await response.json();
	// 	dispatch({
	// 		type: "GET_USERS",
	// 		payload: data,
	// 	});
	// };

	const searchUsers = async (text) => {
		setLoading();

		const params = new URLSearchParams({
			q: text,
		});

		const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		const { items } = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: items,
		});
	};

	// clear user from state
	const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				isLoading: state.isLoading,
				searchUsers,
				clearUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
