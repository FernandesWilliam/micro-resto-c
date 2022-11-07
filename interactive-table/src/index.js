import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './app/store/store';

import './index.css';
import App from './app/App';
import { ThemeContext, themes } from './app/context/theme-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<ThemeContext.Provider value={{
			theme: themes.dark,
			toggleTheme: () => {}
		}}>
			<App/>
		</ThemeContext.Provider>
	</Provider>
);
