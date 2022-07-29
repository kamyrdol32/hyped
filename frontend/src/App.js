// Imports
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThemeContext from "./Context/ThemeContext";
import useLocalStorage from "use-local-storage";
import useToken from "./Utils/JWT";
import {Container} from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Components
import MyNavBar from "./Components/MyNavbar";
import MyHome from "./Sites/MyHome";
import MyFilmList from "./Sites/MyFilmList";
import MyFilm from "./Sites/MyFilm";
import MyLogin from "./Sites/MyLogin";
import MyRegister from "./Sites/MyRegister";
import MyProfile from "./Sites/MyProfile";
import MySerialList from "./Sites/MySerialList";
import MySerial from "./Sites/MySerial";
import MyFooter from "./Components/MyFooter";

// CSS
import './Styles/App.css';


// Code
const queryClient = new QueryClient()

export default function App() {

	// JWT
	const { token, removeToken, setToken } = useToken();

	// Dark mode
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	// Root
	const root = document.getElementById('root');
	root.setAttribute("data-theme", theme);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeContext.Provider value={{theme, setTheme}}>
				<BrowserRouter>
					<MyNavBar token={token}/>
					<Container>
						<Routes>
							<Route path="/" element={<MyHome />} />
							<Route path="/films" element={<MyFilmList />} />
							<Route path="/serials" element={<MySerialList />} />

							<Route path="/film/:ID" element={<MyFilm token={token} setToken={setToken} />} />
							<Route path="/serial/:ID" element={<MySerial token={token} setToken={setToken} />} />

							<Route path="/login" element={<MyLogin setToken={setToken} />} />
							<Route path="/register" element={<MyRegister />} />
							<Route path="/profile" element={<MyProfile token={token} setToken={setToken} removeToken={removeToken} />} />
						</Routes>
					</Container>
					<MyFooter />
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</BrowserRouter>
			</ThemeContext.Provider>
		</QueryClientProvider>
	)
}
