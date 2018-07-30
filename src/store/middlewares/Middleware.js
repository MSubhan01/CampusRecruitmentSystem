import AuthAction from "../actions/AuthAction";
import firebase from "firebase"
import { Observable } from "rxjs";

export default class Middleware {

    ////////////////////////////////////
    //////*     Authentication   *//////
    ////////////////////////////////////

    static signup(action$) {
        return action$.ofType(AuthAction.SIGNUP)
            .switchMap((payload) => {
                let { Name, Email, Password, Catogary } = payload.payload
                return firebase.auth().createUserWithEmailAndPassword(Email, Password)
                    .then((user) => {
                        let Skills = "None";
                        let Education = "Matric";
                        let Experience = "None";
                        if (Catogary === "Company") {
                            firebase.database().ref('User').child(user.uid).set({
                                Name, Email, Password, Uid: user.uid, Catogary
                            })
                        } else {
                            firebase.database().ref('User').child(user.uid).set({
                                Name, Email, Password, Uid: user.uid, Catogary, Skills, Education, Experience
                            })
                        }
                        return {
                            type: AuthAction.SIGNUP_SUCCESS,
                            isLoading: false, isLoggedIn: true, isError: false,
                            payload: {
                                Name, Email, Password, Uid: user.uid, Catogary, Skills, Education, Experience
                            }
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNUP_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    });
            })
    }

    static signin(action$) {
        return action$.ofType(AuthAction.SIGNIN)
            .mergeMap((payload) => {
                let email = payload.payload.Email
                let password = payload.payload.Password
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        return firebase.database().ref('User/' + user.uid).once("value")
                            .then((data) => {
                                if (data.val()) {
                                    return {
                                        type: AuthAction.SIGNIN_SUCCESS,
                                        isLoading: false, isLoggedIn: true, isError: false,
                                        payload: {
                                            Experience: data.val().Experience, Education: data.val().Education,
                                            Catogary: data.val().Catogary, Password: data.val().Password,
                                            Skills: data.val().Skills, Email: data.val().Email,
                                            Name: data.val().Name, Uid: data.val().Uid
                                        }
                                    }
                                } else {
                                    user.delete().then(() => {
                                        alert("Your User Has Been Deleted By The Admin")
                                        return {
                                            type: AuthAction.SIGNIN_FAILURE,
                                            error: "Your User Has Been Deleted By The Admin",
                                            isLoading: false, isError: true,
                                        }
                                    }).catch(
                                        (error) => {
                                            alert(error.message)
                                            return {
                                                type: AuthAction.SIGNIN_FAILURE,
                                                isError: true, isLoading: false, error: error.message
                                            }
                                        }
                                    )
                                }
                            })
                            .catch((error) => {
                                alert(error.message)
                                return {
                                    type: AuthAction.SIGNIN_FAILURE,
                                    isError: true, isLoading: false, error: error.message
                                }
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNIN_FAILURE,
                            isError: true, isLoading: false, error: error.message
                        }
                    })
            })
    }

    static signout(action$) {
        return action$.ofType(AuthAction.SIGNOUT)
            .switchMap((payload) => {
                return firebase.auth().signOut()
                    .then(() => {
                        return {
                            type: AuthAction.SIGNOUT_SUCCESS,
                            isLoggedIn: false, isLoading: false, isError: false,
                            payload: {
                                Name: "", Email: "", Password: "", Catogary: "",
                                Skills: "", Education: "", Experience: "", Uid: "",
                            },
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNOUT_FAILURE,
                            isError: true, isLoading: false, error: error.message
                        }
                    });
            })
    }

    static data(action$, store) {
        return action$.ofType(AuthAction.DATA)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                                return firebase.database().ref('User/' + user.uid).on("value", (data) => {
                                    if (data.val()) {
                                        return store.dispatch({
                                            type: AuthAction.DATA_SUCCESS,
                                            isLoading: false, isLoggedIn: true, isError: false,
                                            payload: {
                                                Experience: data.val().Experience, Education: data.val().Education,
                                                Catogary: data.val().Catogary, Password: data.val().Password,
                                                Skills: data.val().Skills, Email: data.val().Email,
                                                Name: data.val().Name, Uid: data.val().Uid
                                            }
                                        })
                                    } else {
                                        return store.dispatch({
                                            type: AuthAction.DATA_FAILURE,
                                            isError: true, isLoading: false, error: "Your User Has Been Deleted",
                                            payload: {
                                                Name: "", Email: "", Password: "", Catogary: "",
                                                Skills: "", Education: "", Experience: "", Uid: "",
                                            },
                                        })
                                    }
                                })
                            } else {
                                return store.dispatch({
                                    type: AuthAction.DATA_FAILURE,
                                    isError: true, isLoading: false, error: "You Are Signed Out",
                                    payload: {
                                        Name: "", Email: "", Password: "", Catogary: "",
                                        Skills: "", Education: "", Experience: "", Uid: "",
                                    },
                                })
                            }
                        })


                    })
                )
            })
    }

    static update(action$) {
        return action$.ofType(AuthAction.UPDATE)
            .switchMap((payload) => {
                return firebase.database().ref(`User/${payload.uid}`).update(payload.obj)
                    .then(() => {
                        return {
                            type: AuthAction.UPDATE_SUCCESS,
                            isLoading: false, isError: false,
                            payload: payload.obj
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.UPDATE_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    });
            })
    }

    //////////////////////////////
    //////*     JOBS       *//////
    //////////////////////////////

    static post(action$) {
        return action$.ofType(AuthAction.POST)
            .switchMap((payload) => {
                return firebase.database().ref('Jobs/').push(payload.payload)
                    .then(() => {
                        return {
                            type: AuthAction.POST_SUCCESS,
                            isLoading: false, isError: false,
                            payload: payload.payload,
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.POST_FAILURE,
                            isLoading: false, isError: true, error: error.message,
                            payload: {
                                shift: "", timing: "", salary: "", uid: "", name: "",
                                position: "", education: "", experience: "",
                            },
                        }
                    });
            })
    }

    static companyjobs(action$, store) {
        return action$.ofType(AuthAction.COMPANY)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        return firebase.database().ref('Jobs/').on("value", (data) => {
                            if (data.val() && firebase.auth().currentUser) {
                                let uid = firebase.auth().currentUser.uid
                                let keys = Object.keys(data.val());
                                let values = Object.values(data.val());
                                let value = [];
                                value = values
                                    .filter((index) => { return index.uid === uid })
                                    .map((index) => {
                                        index.index = keys[values.indexOf(index)]
                                        if (index.apply !== undefined) {
                                            index.apply = Object.values(index.apply);
                                            return index
                                        } else {
                                            index.apply = [];
                                            return index
                                        }
                                    })
                                return store.dispatch({
                                    type: AuthAction.COMPANY_SUCCESS,
                                    isLoading: false, isError: false,
                                    jobs: value
                                })
                            } else {
                                return store.dispatch({
                                    type: AuthAction.COMPANY_FAILURE,
                                    isLoading: false, isError: true, error: "There Are No Jobs",
                                    jobs: []
                                })
                            }
                        })
                    })
                )

            })
    }

    static delete(action$) {
        return action$.ofType(AuthAction.DELETE)
            .switchMap((payload) => {
                return firebase.database().ref(`Jobs/${payload.index}`).remove()
                    .then(() => {
                        return {
                            type: AuthAction.DELETE_SUCCESS,
                            isLoading: false, isError: false,
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.DELETE_FAILURE,
                            isLoading: false, isError: true, error: error.message,
                        }
                    });
            })
    }

    static studentjobs(action$, store) {
        return action$.ofType(AuthAction.STUDENT)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        return firebase.database().ref('Jobs/').on("value", (data) => {
                            if (data.val() && firebase.auth().currentUser) {
                                let uid = firebase.auth().currentUser.uid
                                let keys = Object.keys(data.val());
                                let values = Object.values(data.val());
                                let value = [];
                                value = values.map((index) => {
                                    index.index = keys[values.indexOf(index)];
                                    if (index.apply !== undefined) {
                                        Object.keys(index.apply)
                                            .filter((keys) => {
                                                if (keys === uid) {
                                                    return index.apply = true
                                                } else {
                                                    return index.apply = false
                                                }
                                            })
                                            .map((keys) => {
                                                console.log(index, keys);
                                                return index.apply = true
                                            })
                                    } else {
                                        index.apply = false
                                    }
                                    return index
                                })
                                return store.dispatch({
                                    type: AuthAction.STUDENT_SUCCESS,
                                    isLoading: false, isError: false,
                                    jobs: value
                                })
                            } else {
                                return {
                                    type: AuthAction.STUDENT_FAILURE,
                                    isLoading: false, isError: true, error: "There Are No Jobs",
                                    jobs: []
                                }
                            }
                        })
                    })
                )
            })
    }



    static apply(action$) {
        return action$.ofType(AuthAction.APPLY)
            .switchMap((payload) => {
                let {
                    Uid,
                    Name,
                    Education,
                    Experience,
                    Skills,
                } = payload.data
                return firebase.database().ref(`Jobs/${payload.index}/apply/${Uid}`).set({ Uid, Name, Education, Experience, Skills, })
                    .then(() => {
                        return {
                            type: AuthAction.APPLY_SUCCESS,
                            isLoading: false, isError: false,
                        }
                    })
                    .catch((error) => {
                        alert(error)
                        return {
                            type: AuthAction.APPLY_FAILURE,
                            isLoading: false, isError: true, error: error.message,
                        }
                    })
            })
    }

    static getjobs(action$, store) {
        return action$.ofType(AuthAction.ALL_JOBS)
            .switchMap(() => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        return firebase.database().ref("Jobs/").on("value", (data) => {
                            if (data.val()) {
                                let keys = Object.keys(data.val());
                                let values = Object.values(data.val());
                                let value = [];
                                value = values.map((index) => {
                                    index.index = keys[values.indexOf(index)];
                                    if (index.apply !== undefined) {
                                        index.apply = Object.values(index.apply);
                                    } else {
                                        index.apply = [];
                                    }
                                    return index
                                })
                                return store.dispatch({
                                    type: AuthAction.ALL_JOBS_SUCCESS,
                                    isLoading: false, isError: false,
                                    jobs: value
                                })
                            } else {
                                return store.dispatch({
                                    type: AuthAction.ALL_JOBS_FAILURE,
                                    isLoading: false, isError: true, error: "There Are No Jobs",
                                    jobs: []
                                })
                            }
                        })
                    })
                )
            })
    }

    //////////////////////////////
    //////*       Users    *//////
    //////////////////////////////

    static getusers(action$, store) {
        return action$.ofType(AuthAction.ALL_USERS)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        return firebase.database().ref('User/').on("value", (data) => {
                            if (data.val()) {
                                let Company = "Company"
                                let Student = "Student"
                                let students = Object.values(data.val()).filter((key) => {
                                    return key.Catogary === Student
                                })
                                let companies = Object.values(data.val()).filter((key) => {
                                    return key.Catogary === Company
                                })
                                return store.dispatch({
                                    type: AuthAction.ALL_USERS_SUCCESS,
                                    isLoading: false, isError: false,
                                    payload: {
                                        students,
                                        companies
                                    }
                                })
                            } else {
                                alert("Something Went Wrong")
                                return store.dispatch({
                                    type: AuthAction.ALL_USERS_FAILURE,
                                    isLoading: false, isError: true, error: "Something Went Wrong",
                                })
                            }
                        })
                    })
                )
            })
    }



    static remove(action$, store) {
        return action$.ofType(AuthAction.REMOVE)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        return firebase.database().ref(`User/${payload.index}`).remove()
                            .then(() => {
                                payload.jobs
                                    .filter((index) => { return index.uid === payload.index })
                                    .map((index) => {
                                        return firebase.database().ref('Jobs/' + index.index).remove()
                                    })
                                return store.dispatch({
                                    type: AuthAction.REMOVE_SUCCESS,
                                    isLoading: false, isError: false,
                                })
                            })
                            .catch((error) => {
                                alert(error)
                                return store.dispatch({
                                    type: AuthAction.REMOVE_FAILURE,
                                    isLoading: false, isError: true, error: error.message,
                                })
                            })
                    })
                )
            })
    }

}