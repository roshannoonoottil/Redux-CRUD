import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialValue = {
    isAuthenticated: false,
    isAdmin: false,
    user: {
        Date:'',
        email:'',
        image:'',
        mobile:'',
        userName:'',
        _id:''
    },
    admin: { 
        Date:'',
        email:'',
        image:'',
        mobile:'',
        userName:'',
        _id:''
    },
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
                user: { ...initialValue.user },
            };
            case 'ADMIN_LOGIN':
            return {
                ...prevState,
                isAuthenticated: true,
                isAdmin:true,
                admin: action.payload
            };
        case 'ADMIN_LOGOUT':
            return {
                ...prevState,
                isAuthenticated: false,
                isAdmin:false,
                admin: { ...initialValue.admin },
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
