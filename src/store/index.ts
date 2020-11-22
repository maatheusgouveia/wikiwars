import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
	key: '@wikiwars',
	storage: AsyncStorage,
	whitelist: ['favorite'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

//criar o middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

//criar store para exportar
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

//iniciar redux-saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

//mostrar ações do redux no terminal
store.subscribe(() => console.log(store.getState()));

export default store;
