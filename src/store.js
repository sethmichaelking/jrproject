import { combineReducers, applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

const campusReducer = (state = [], action) => {
    if (action.type === "SET_CAMPUSES"){
        return action.campuses
    }
    if (action.type === "CREATE_SCHOOL"){
        return [...state, action.school]
    }
    if (action.type === "DELETE_CAMPUS"){
        return state.filter((campus) => campus.id !== action.campus)
    }
    if (action.type === "UPDATE_CAMPUS"){
        return state.map((campus) => campus.id !== action.campus.id ? campus : action.campus)
    }
    if (action.type === "GET_CAMPUS"){
        return state.map((campus) => campus.id !== action.campus.id ? campus : action.campus)
    }
    return state
}

const studentReducer = (state = [], action) => {
    if (action.type === "SET_STUDENTS"){
        return action.students
    }
    if (action.type === "CREATE_STUDENT"){
        return [...state, action.student]
    }
    if (action.type === "DELETE_STUDENT"){
        return state.filter(student => student.id !== action.id)
    }
    if (action.type === "UPDATE_STUDENT"){
        return state.map((student) => student.id !== action.student.id ? student : action.student)
    }
    return state
}

const reducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer
})

export const fetchStudents = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/students')
        const students = response.data
        dispatch({ type: "SET_STUDENTS", students })
    }
}

export const fetchCampuses = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/campuses')
        const campuses = response.data
        dispatch({ type: "SET_CAMPUSES", campuses })
    }
}

export const createStudent = (efe) => {
    return async(dispatch) => {
        const response = await axios.post('/api/students', efe)
        const student = response.data
        dispatch({ type: "CREATE_STUDENT", student })
    }
}

export const removeStudentFromCampus = (values, history) => {
    return async(dispatch) => {
      
        const studentReponse =  await axios.put(`/api/students/${values.studentId}`, { campusId: null })
        const student = studentReponse.data
        // // const response = await axios.get(`/api/campuses/${values.campusId}`)
        // // const campus = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
        history.push('/students')
        // dispatch({ type: "GET_CAMPUS", campus })
    }
}

export const removetStudent = (id) => {
    return async(dispatch) => {
        await axios.delete(`/api/students/${id}`)
        dispatch({ type: "DELETE_STUDENT", id })
    }
}

export const updateName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { name: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}
export const updateAddress = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { address: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}
export const updateDescription = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/campuses/${update.id}`, { description: update.value })
        const campus = response.data
        dispatch({ type: "UPDATE_CAMPUS", campus })
    }
}

export const updateFirstName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { firstName: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}

export const updateLastName = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { lastName: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}
export const updateTheEmail = (update) => {
    return async(dispatch) => {
        const response = await axios.put(`/api/students/${update.id}`, { email: update.value })
        const student = response.data
        dispatch({ type: "UPDATE_STUDENT", student })
    }
}


export const deleteCampus = (campus) => {
    return async(dispatch) => {
        await axios.delete(`/api/campuses/${campus}`)
        dispatch({ type: "DELETE_CAMPUS", campus })
    }
}
export const createSchool = (efe) => {
    return async(dispatch) => {
        const response = await axios.post('/api/campuses', efe)
        const school = response.data
        dispatch({ type: "CREATE_SCHOOL", school })
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store