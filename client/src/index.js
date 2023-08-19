import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';
import { recommendapi } from 'state/recommendapi';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
	reducer: {
		global: globalReducer,
		[api.reducerPath]: api.reducer,
		[recommendapi.reducerPath]: recommendapi.reducer,
	},
	middleware: (getDefault) =>
		getDefault().concat(api.middleware, recommendapi.middleware),
});
setupListeners(store.dispatch);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
