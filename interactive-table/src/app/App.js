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


function App() {
	return (
		<ThemeContext.Provider value={ themes.light }>
			<div className="App">
				<Helmet>
					<link rel="icon" type="image/png" href="/logoFastFood.png" sizes="16x16"/>
					<meta charSet="utf-8"/>
					<title>MiamMiam</title>
				</Helmet>
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<Config />} />
						<Route exact path="/welcome" element={<Welcome />} />
						<Route exact path="/menu" element={<MenuSelection />} />
						<Route exact path="/recap" element={<OrderRecap />} />
						<Route exact path="/game" element={<Game />} />
						<Route exact path="/status" element={<OrderStatusGeneralDisplay />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
