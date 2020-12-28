import {act} from "@testing-library/react";

const SET_STATE = 'SET_STATE'
const UPDATE_FIRST_FIELD_TEXT = 'UPDATE_FIRST_FIELD_TEXT'
const UPDATE_SECOND_FIELD_TEXT = 'UPDATE_SECOND_FIELD_TEXT'
const UPDATE_THIRD_FIELD_OPTION = 'UPDATE_THIRD_FIELD_OPTION'
const DATA_IS_FETCHING = 'DATA_IS_FETCHING'
const CANCEL_REQUEST = 'CANCEL_REQUEST'

let initialState = {
    title: '',
    image: '',
    fields: null,
    firstFieldText:'',
    secondFieldText:'',
    thirdFieldOption: '',
    isFetching: true,
    isRequestCanceled: false
    /*[{
            title: '',
            name: '',
            type: ''
        },
        {
            title: '',
            name: '',
            type: ''
        },
        {
            title: '',
            name: '',
            type: '',
            values: {
                none: '',
                v1: '',
                v2: '',
                v3: ''
            }
        }
    ]*/
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_STATE:
            return{
                ...state,
                title: action.title,
                image: action.image,
                fields: action.fields,
                thirdFieldOption: action.fields[2].values.none,
                isFetching: false
            }
        case UPDATE_FIRST_FIELD_TEXT:
            return {
                ...state,
                firstFieldText: action.newText
            }
        case UPDATE_SECOND_FIELD_TEXT:
            return {
                ...state,
                secondFieldText: action.newText
            }
        case UPDATE_THIRD_FIELD_OPTION:
            return {
                ...state,
                thirdFieldOption: action.option
            }
        case DATA_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case CANCEL_REQUEST:
            return {
                ...state,
                isRequestCanceled: true
            }
        default:
            return state;
    }
}

export const setState = (title, image, fields) => ({type:SET_STATE, title: title, image: image, fields: fields});
export const updateFirstFieldText = (newText) => ({type: UPDATE_FIRST_FIELD_TEXT, newText: newText});
export const updateSecondFieldText = (newText) => ({type: UPDATE_SECOND_FIELD_TEXT, newText: newText});
export const updateThirdFieldOption = (option) => ({type: UPDATE_THIRD_FIELD_OPTION, option: option});
export const dataIsFetching = (value) => ({type: DATA_IS_FETCHING, value: value});
export const cancelRequest =() => ({type: CANCEL_REQUEST});
export default appReducer;