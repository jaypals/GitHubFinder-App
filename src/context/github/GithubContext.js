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

	// GET USERS FROM GITHUB (FOR TESTING PURPOSE ONLY)
	const fetchUsers = async () => {
		setLoading();

		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		const data = await response.json();
		dispatch({
			type: "GET_USERS",
			payload: data,
		});
	};

	// set loading
	const setLoading = () => dispatch({ type: "SET_LOADING" });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				isLoading: state.isLoading,
				fetchUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
