import { Action, createReducer, on } from "@ngrx/store";
import { Student } from "../models/studentModel";
import * as studentAction from "./students.action";

export interface State {
    students: Student[] | any;
    error?: string;
    selected? : any;
    action?: any;
}

const initialState: State = {
    students: [],
    error: '',
    selected: null,
    action: null
};

// Creating reducer
const _studentReducer = createReducer(
  initialState,
  on(studentAction.ShowAllSuccessAction, (state, {payload}) => ({ students: payload })),

  on(studentAction.CreateSuccessAction, (state, {payload}) => ({ students: [payload] })),
  on(studentAction.CreateFailureAction, (state, {payload}) => ({ students: [], message: payload })),

  //////
  on(studentAction.GetByIdStudent, (state) => {
    return {
      ...state,
    }
  }),
  on(studentAction.GetByIdSuccessAction, (state, {payload}) => {
    return{
      ...state,
      selected : payload
    }
  }),
  on(studentAction.GetByIdFailedAction, (state, { error }) => ({
    ...state,
    error: error
  })),
  

  ///////
  on(studentAction.deleteRequestAction, state => {
    return {
      ...state
    }
  }),
  on(studentAction.deleteSuccessAction, (state , {id} ) => {
    return {
      ...state,
      students: state.students.filter((x:any) => x.id != id)
    }
  }),
  on(studentAction.deleteFailureAction, (state , {error}) => {
    return {
      ...state,
      error: error
    }
  }),
 
  /////
  on(studentAction.updateRequestAction, state => ({
    ...state,
  })),
 
  on(studentAction.updateSuccessAction, (state, { payload }) => ({
    ...state,
    selected: payload,
  })),
 
  on(studentAction.updateFailureAction, (state, { error }) => ({
    ...state,
    error: error
  })), 


);

export function studentReducer(state: any, action: Action) {
    return _studentReducer(state, action);
  }
  