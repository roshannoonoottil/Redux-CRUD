import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialValue = {
    isAuthenticated: false,
    user: {
        Date:'',
        email:'',
        image:'',
        mobile:'',
        userName:'',
        _id:''
    }
};


const reducer = (prevState = initialValue, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...prevState,
                isAuthenticated: true,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...prevState,
                isAuthenticated: false,
                user: null
            };
        default:
            return prevState;
    }
};

// Persist configuration
const persistConfig = {
    key: 'root', 
    storage,      
};

const persistedReducer = persistReducer(persistConfig, reducer);


const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
