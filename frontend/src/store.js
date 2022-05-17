import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    blogListReducer,
    blogDetailsReducer,
    blogCreateReducer,
    blogUpdateReducer,
    blogDeleteReducer,
    blogCategoryListReducer
} from './reducers/blogReducers'
import {
    userSigninReducer,
    userRegisterReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers'

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    }
}

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    blogList: blogListReducer,
    blogCategoryList: blogCategoryListReducer,
    blogCreate: blogCreateReducer,
    blogUpdate: blogUpdateReducer,
    blogDelete: blogDeleteReducer,
    blogDetails: blogDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store