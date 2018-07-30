import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducers/AuthReducer';
import Users from './reducers/Users';
import Jobs from './reducers/Jobs';
import logger from 'redux-logger';
import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Middleware from "./middlewares/Middleware";


let store = createStore(
    combineReducers({
        AuthReducer,
        Jobs,
        Users
    }),
    composeWithDevTools(
        applyMiddleware(
            createEpicMiddleware(
                combineEpics(
                    Middleware.signup,
                    Middleware.signin,
                    Middleware.signout,
                    Middleware.data,
                    Middleware.update,
                    Middleware.post,
                    Middleware.companyjobs,
                    Middleware.delete,
                    Middleware.studentjobs,
                    Middleware.getusers,
                    Middleware.remove,
                    Middleware.getjobs,
                    Middleware.apply,
                )
            ),
            logger
        )
    )
)



export default store;