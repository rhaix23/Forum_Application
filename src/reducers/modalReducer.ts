export enum ActionTypes {
  HANDLE_VIEW_MODAL = "HANDLE_VIEW_MODAL",
  HANDLE_EDIT_MODAL = "HANDLE_EDIT_MODAL",
  HANDLE_DELETE_MODAL = "HANDLE_DELETE_MODAL",
}

export interface IModalActions {
  type: ActionTypes;
  payload: boolean;
}

export interface IModalState {
  viewModalIsOpened: boolean;
  editModalIsOpened: boolean;
  deleteModalIsOpened: boolean;
}

export const modalState: IModalState = {
  viewModalIsOpened: false,
  editModalIsOpened: false,
  deleteModalIsOpened: false,
};

export const modalReducer = (state: IModalState, action: IModalActions) => {
  switch (action.type) {
    case ActionTypes.HANDLE_VIEW_MODAL:
      return {
        ...state,
        viewModalIsOpened: action.payload,
      };
    case ActionTypes.HANDLE_EDIT_MODAL:
      return {
        ...state,
        editModalIsOpened: action.payload,
      };
    case ActionTypes.HANDLE_DELETE_MODAL:
      return {
        ...state,
        deleteModalIsOpened: action.payload,
      };
    default:
      return state;
  }
};
