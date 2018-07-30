export default class AuthAction {

    static SIGNUP = "SIGNUP";
    static SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    static SIGNUP_FAILURE = "SIGNUP_FAILURE";
    static SIGNIN = "SIGNIN";
    static SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
    static SIGNIN_FAILURE = "SIGNIN_FAILURE";
    static SIGNOUT = "SIGNOUT";
    static SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
    static SIGNOUT_FAILURE = "SIGNOUT_FAILURE";
    static DATA = "DATA";
    static DATA_SUCCESS = "DATA_SUCCESS";
    static DATA_FAILURE = "DATA_FAILURE";
    static UPDATE = "UPDATE";
    static UPDATE_SUCCESS = "UPDATE_SUCCESS";
    static UPDATE_FAILURE = "UPDATE_FAILURE";
    static POST = "POST";
    static POST_SUCCESS = "POST_SUCCESS";
    static POST_FAILURE = "POST_FAILURE";
    static COMPANY = "COMPANY";
    static COMPANY_SUCCESS = "COMPANY_SUCCESS";
    static COMPANY_FAILURE = "COMPANY_FAILURE";
    static DELETE = "DELETE";
    static DELETE_SUCCESS = "DELETE_SUCCESS";
    static DELETE_FAILURE = "DELETE_FAILURE";
    static STUDENT = "STUDENT";
    static STUDENT_SUCCESS = "STUDENT_SUCCESS";
    static STUDENT_FAILURE = "STUDENT_FAILURE";
    static ALL_USERS = "ALL_USERS";
    static ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
    static ALL_USERS_FAILURE = "ALL_USERS_FAILURE";
    static REMOVE = "REMOVE";
    static REMOVE_SUCCESS = "REMOVE_SUCCESS";
    static REMOVE_FAILURE = "REMOVE_FAILURE";
    static ALL_JOBS = "ALL_JOBS";
    static ALL_JOBS_SUCCESS = "ALL_JOBS_SUCCESS";
    static ALL_JOBS_FAILURE = "ALL_JOBS_FAILURE";
    static APPLY = "APPLY";
    static APPLY_SUCCESS = "APPLY_SUCCESS";
    static APPLY_FAILURE = "APPLY_FAILURE";

    static signup(Email, Password, Name, Catogary) {
        return {
            type: AuthAction.SIGNUP,
            isLoading: true,
            payload: {
                Name,
                Email,
                Password,
                Catogary,
            },
        }
    }

    static signin(Email, Password) {
        return {
            type: AuthAction.SIGNIN,
            isLoading: true,
            isError: false,
            payload: {
                Email,
                Password
            },
        }
    }

    static signout() {
        return {
            type: AuthAction.SIGNOUT,
            isLoading: true,
        }
    }

    static data() {
        return {
            type: AuthAction.DATA,
            isLoading: true,
        }
    }

    static update(obj, uid) {
        return {
            type: AuthAction.UPDATE,
            isLoading: true,
            obj,
            uid,
        }
    }

    static post(job) {
        return {
            type: AuthAction.POST,
            isLoading: true,
            payload: job,
        }
    }

    static companyjobs(Uid) {
        return {
            type: AuthAction.COMPANY,
            isLoading: true,
            Uid
        }
    }

    static delete(index, Uid) {
        return {
            type: AuthAction.DELETE,
            isLoading: true,
            index,
            Uid
        }
    }

    static studentjobs(Uid) {
        return {
            type: AuthAction.STUDENT,
            isLoading: true,
            Uid
        }
    }

    static getusers() {
        return {
            type: AuthAction.ALL_USERS,
            isLoading: true,
        }
    }

    static remove(index,jobs) {
        return {
            type: AuthAction.REMOVE,
            isLoading: true,
            index,
            jobs
        }
    }

    static getjobs() {
        return {
            type: AuthAction.ALL_JOBS,
            isLoading: true,
        }
    }

    static apply(index,data) {
        return {
            type: AuthAction.APPLY,
            isLoading: true,
            index,
            data
        }
    }






}