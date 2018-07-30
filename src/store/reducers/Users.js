import AuthAction from '../actions/AuthAction'

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    remove: "",
    users: {
        companies: [],
        students: [],
    },
}

function Users(state = INITIAL_STATE, action) {
    switch (action.type) {

        case AuthAction.ALL_USERS:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

        case AuthAction.ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                users: { ...action.payload }
            });

        case AuthAction.ALL_USERS_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case AuthAction.REMOVE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                remove: action.index
            });

        case AuthAction.REMOVE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                // users: { ...action.payload }
            });

        case AuthAction.REMOVE_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        default:
            return state;
    }

}

export default Users;