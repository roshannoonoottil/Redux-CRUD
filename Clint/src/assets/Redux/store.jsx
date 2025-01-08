import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Initial state
const initialValue = {
    isAuthenticated: false,
    isAdmin: false,
    user: {
        Date: '',
        email: '',
        image: '',
        mobile: '',
        userName: '',
        _id: '',
    },
    admin: {
        Date: '',
        email: '',
        image: '',
        mobile: '',
        userName: '',
        _id: '',
    },
    count:0
};

const INCREMENT = 'INCREMENT'
const DECREMENT = "DECREMENT"

export const increment = ()=>( {type:INCREMENT})
export const decrement= ()=>( {type:DECREMENT})

// Reducer
const reducer = (prevState = initialValue, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...prevState,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...prevState,
                isAuthenticated: false,
                user: { ...initialValue.user },
            };
        case 'ADMIN_LOGIN':
            return {
                ...prevState,
                isAuthenticated: true,
                isAdmin: true,
                admin: action.payload,
            };
        case 'ADMIN_LOGOUT':
            return {
                ...prevState,
                isAuthenticated: false,
                isAdmin: false,
                admin: { ...initialValue.admin },
            };
        case INCREMENT:{
            return{...prevState, count : prevState.count + 1}
        }
        case DECREMENT :{
            return{...prevState, count : prevState.count - 1}
        }
        default:
            return prevState;
    }
};

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Enable Redux DevTools
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with Redux DevTools
const store = createStore(
    persistedReducer,
    composeEnhancers() // Apply DevTools enhancer
);

// Create persistor
export const persistor = persistStore(store);

export default store;
