import './App.css';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Config from "./views/config/Config";
import { ThemeContext, themes } from './context/theme-context';
import NotFound from './views/errors/NotFound';
import Welcome from './views/welcome/Welcome';
import MenuSelection from './views/selection/MenuSelection';
import OrderRecap from './views/order-recap/OrderRecap';
import Game from './views/game/Game';
import OrderStatusGeneralDisplay from './views/order-status/OrderStatusGeneralDisplay';
import { useState } from 'react';
import BillComplete from './views/bill/BillComplete';


function App() {
	const [theme, setTheme] = useState(themes.dark);

	const toggleTheme = () => {
		setTheme(theme === themes.light ? themes.dark : themes.light);
	}

	return (
		<ThemeContext.Provider value={{
			theme: theme,
			toggleTheme: toggleTheme
		}}>
			<div className="App"
				 style={{
					 background: theme.background,
					 color: theme.text_color
				 }}>
				<Helmet>
					<link rel="icon" type="image/png" href="/logoFastFood.png" sizes="16x16"/>
					<meta charSet="utf-8"/>
					<title>MiamMiam</title>
				</Helmet>

				<link rel="stylesheet"
					  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>

				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<Config/>}/>
						<Route exact path="/welcome" element={<Welcome/>}/>
						<Route exact path="/menu" element={<MenuSelection/>}/>
						<Route exact path="/recap" element={<OrderRecap/>}/>
						<Route exact path="/game" element={<Game/>}/>
						<Route exact path="/status" element={<OrderStatusGeneralDisplay/>}/>
						<Route exact path="/bill" element={<BillComplete />} />
						<Route path="*" element={<NotFound/>}/>
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
