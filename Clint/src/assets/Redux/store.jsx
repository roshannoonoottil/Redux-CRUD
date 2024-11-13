import {createStore} from 'redux'

const initialValue = {

    isAuthenticated: false,
    user: null
}

const reducer = (prevState = initialValue, action) => {

        switch(action.type){
            case 'LOGIN':
                return{
                    ...prevState,
                    isAuthenticated : true,
                    user : action.payload
                }
            case 'LOGOUT':
                return{
                    ...prevState,
                    isAuthenticated : false,
                    user : null
                }
            default :
                return prevState;

        }
}

 const store = createStore(reducer)
 export default store;