import React, {
	useState,
	useContext,
	createContext,
	ReactNode,
	useEffect,
} from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProtectedComponent from "./protected";

interface UserContextType {
	user: any;
	setUser: (user: any) => void;
}

export let userId: number;

const defaultContextValue: UserContextType = {
	user: {},
	setUser: () => {},
};

const UserContext = createContext<UserContextType>(
	defaultContextValue
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

const Auth: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [id, setUserId] = useState<number>();
	const [error, setError] = useState("");
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (id) userId = id;
	}, [id]);

	const handleLogin = async () => {
		try {
			const res = await fetch(
				"https://7da6d4a4bea8c10a.mokky.dev/auth",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						login: username,
						password: password,
					}),
				}
			);

			const data = await res.json();

			console.log("Response data:", data);

			if (res.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem(
					"user",
					JSON.stringify(data.data)
				);
				console.log("user data:", data.data);

				setUserId(data.data.id);

				setUser(data.data);
				navigate("/pro");
			} else {
				setError(data.error);
			}
		} catch (e) {
			setError("An error occurred");
		}
	};

	if (localStorage.getItem("token")) {
		return <ProtectedComponent />;
	} else {
		return (
			<div className="mx-auto my-20 w-[200px]">
				<TextField
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					sx={{ marginBlock: "10px" }}
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button variant="contained" onClick={handleLogin}>
					Login
				</Button>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		);
	}
};

export default Auth;

export const useUser = () => useContext(UserContext);
