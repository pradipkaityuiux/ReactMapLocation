import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    error: ""
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action){
    switch(action.type){
        case "login":
            return{
                ...state, user: action.payload, isAuthenticated: true
            }
        case "logout":
            return{
                ...state, user: null, isAuthenticated: false
            }
        case "error":
            return{
                ...state, error: action.payload
            }
        default: throw new Error("Error in Auth")
            
    }
}

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {user, isAuthenticated, error} = state;
    function login(username, password){
        if(FAKE_USER.email == username && FAKE_USER.password == password){
            dispatch({type: "login", payload: FAKE_USER})
        }else{
            dispatch({type: "error", payload: new Error("Email or Password not matching.")})
        }
    }
    function logout(){

    }
    return <AuthContext.Provider value={[user, isAuthenticated, login, logout]}>{children}</AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context == undefined)
        throw new Error('Authcontext is used outside of the AuthProvider.')
}

export {AuthProvider, useAuth}