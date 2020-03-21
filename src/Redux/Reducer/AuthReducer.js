const INNITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: '',
    logged: false
}

export const AuthReducer = (state=INNITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN' :
            return{
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                logged: true
            }
        case 'LOGOUT' :
            return INNITIAL_STATE
        default :
            return state
    }
}