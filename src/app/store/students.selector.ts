import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Student } from "../models/studentModel";
import { State } from "./students.reducer";
import * as studentAction from "./students.action";

//'createFeatureSelector' is used to fetch all the data from our feature module(eg: 'students' module).

const getStudentFeatureState = createFeatureSelector<State>('studentsState');

// Here the name of our selector 'studentsState' must be used to register the 'studentReducer' 
// into the 'students.modulet.ts' to register the feature store or child store.

export const getStudents = createSelector(
    getStudentFeatureState,
    state => state.students
)

export const getStudentsError = createSelector(
    getStudentFeatureState,
    state => state.error
)
   
  export const getSelectedStudent = createSelector(
    getStudentFeatureState,
    (state: State) => state.selected,
  );

// export const getStudentById = (id: any) => createSelector(
//     getStudentFeatureState, (students:Student) => {
//     if(students){
//         return students.filter((student:any) => {
//             return student.id === id;
//         });
//     } else {
//         return {}
//     }
// }) 


