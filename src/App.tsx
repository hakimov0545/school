import { createTheme } from "@mui/material";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Auth, { UserProvider, useUser } from "./components/auth";
import ProtectedComponent from "./components/protected";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import { getUser } from "./components/Api";

const theme = createTheme({
	palette: {
		primary: {
			main: "#3700b3",
		},
	},
});

export const RouteContext = React.createContext({
	activePage: "Dashboard",
	setActivePage: (value: string) => {},
});

function App() {
	const { user, setUser } = useUser();

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<Router>
					<Routes>
						<Route
							path="/pro"
							element={<ProtectedComponent />}
						/>
						<Route path="/" element={<Auth />} />
					</Routes>
				</Router>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
