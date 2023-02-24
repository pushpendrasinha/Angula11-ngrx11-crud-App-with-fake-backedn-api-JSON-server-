import { Action, createAction, props } from '@ngrx/store';
import { Student } from '../models/studentModel';


/****************************************
 * GET all the students
 ****************************************/

export const ShowAllAction = createAction(
    '[STUDENT] Show All');

export const ShowAllSuccessAction = createAction(
    '[STUDENT] Show All Success',
    props<{ payload: Student[] }>()
);

/****************************************
 * ADD new student
 ****************************************/

export const CreateAction = createAction(
    '[STUDENT] Create',
    props<{ payload: Student }>()
);

export const CreateSuccessAction = createAction(
    '[STUDENT] Create Success',
    props<{ payload: Student }>()
);

export const CreateFailureAction = createAction(
    '[STUDENT] Create Failure',
    props<{ payload: any }>()
);

/****************************************
 * Get By Id student
 ****************************************/


export const GetByIdStudent = createAction(
    '[STUDENT] Get by Id',
    props<{ id: number }>()
);

export const GetByIdSuccessAction = createAction(
    '[STUDENT] Get by Id Success',
    props<{ payload: Student }>()
);

export const GetByIdFailedAction = createAction(
    '[STUDENT] Get by Id Failed',
    props<{ error: string }>()
);

/****************************************
 * Delete student
 ****************************************/

export const deleteRequestAction = createAction(
    '[STUDENT] Delete Requested',
    props<{ id: number }>()
  );
   
  export const deleteFailureAction = createAction(
    '[STUDENT] Deleted failed',
    props<{ error: string }>()
  );
     
  export const deleteSuccessAction = createAction(
    '[STUDENT] Deleted Successfully',
    props<{ id: number }>()
  );

  /****************************************
 * Update student
 ****************************************/

  export const updateRequestAction = createAction(
    '[STUDENT] Update requested',
    props<{ payload: Student }>()
  );
   
  export const updateFailureAction = createAction(
    '[STUDENT] Update failed',
    props<{ error: string }>()
  );
   
  export const updateSuccessAction = createAction(
    '[STUDENT] Updated Succesfully',
    props<{ payload: Student }>()
  );
