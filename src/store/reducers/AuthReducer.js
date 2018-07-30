import AuthAction from '../actions/AuthAction'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  error: "",
  loading: {
    Name: "",
    Email: "",
    Password: "",
    Catogary: "",
    Skills: "",
    Education: "",
    Experience: "",
    Uid: "",
  },
  auth: {
    Name: "",
    Email: "",
    Password: "",
    Catogary: "",
    Skills: "",
    Education: "",
    Experience: "",
    Uid: "",
  },
}

function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case AuthAction.SIGNUP:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        loading: {
          ...action.payload
        }
      });

    case AuthAction.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error
      });

    case AuthAction.SIGNIN:
      return Object.assign({}, 
        // state, 
        {...INITIAL_STATE},
        {
        isLoading: action.isLoading,
        isError: action.isError,
        error:"",
        loading: {
          ...action.payload
        }
      });

    case AuthAction.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNIN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error
      });

    case AuthAction.SIGNOUT:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case AuthAction.SIGNOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNOUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error
      });

    case AuthAction.DATA:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        // loading: {
        //   Uid: action.uid
        // }
      });

    case AuthAction.DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.DATA_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.UPDATE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        loading: {
          ...action.obj,
          Uid: action.uid
        }
      });

    case AuthAction.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        auth: {
          ...state.auth,
          ...action.payload
        }
      });

    case AuthAction.UPDATE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error
      });

    default:
      return state;
  }

}

export default AuthReducer;