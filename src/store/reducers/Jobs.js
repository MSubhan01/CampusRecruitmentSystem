import AuthAction from '../actions/AuthAction'

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    index: "",
    Uid: "",
    applicant: {
        Catogary:"",
        Education:"",
        Email:"",
        Experience:"",
        Name:"",
        Password:"",
        Skills:"",
        Uid:""
    },
    posted: {
        position: "",
        education: "",
        experience: "",
        shift: "",
        timing: "",
        salary: "",
        uid: "",
        name: ""
    },
    posting: {
        position: "",
        education: "",
        experience: "",
        shift: "",
        timing: "",
        salary: "",
        uid: "",
        name: ""
    },
    jobs: [],
}

function Jobs(state = INITIAL_STATE, action) {
    switch (action.type) {

        case AuthAction.POST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                posting: { ...action.payload }
            });

        case AuthAction.POST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                // jobs: action.jobs,
                posted: { ...action.payload }
            });

        case AuthAction.POST_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                posting: { ...action.payload }
            });

        case AuthAction.COMPANY:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                Uid: action.Uid
            });

        case AuthAction.COMPANY_SUCCESS:
            return Object.assign({}, state, {
                jobs: action.jobs,
                isLoading: action.isLoading,
            });

        case AuthAction.COMPANY_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                jobs: action.jobs,
                Uid: action.Uid
            });

        case AuthAction.DELETE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                index: action.index,
                Uid: action.Uid
            });

        case AuthAction.DELETE_SUCCESS:
            return Object.assign({}, state, {
                // jobs: action.jobs,
                isLoading: action.isLoading,
            });

        case AuthAction.DELETE_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                Uid: action.Uid
            });

        case AuthAction.STUDENT:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                Uid: action.Uid
            });

        case AuthAction.STUDENT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                jobs: action.jobs
            });

        case AuthAction.STUDENT_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                jobs: action.jobs,
                Uid: action.Uid
            });

        case AuthAction.ALL_JOBS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        case AuthAction.ALL_JOBS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                jobs: action.jobs,
            });

        case AuthAction.ALL_JOBS_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                jobs: action.jobs,
            });

        case AuthAction.APPLY:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                index: action.index,
                applicant: action.data
            });

        case AuthAction.APPLY_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                // jobs: action.jobs,
            });

        case AuthAction.APPLY_FAILURE:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

        default:
            return state;
    }

}

export default Jobs;