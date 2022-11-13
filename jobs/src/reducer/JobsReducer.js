export const reducer = (state, { type, payload }) => {
  if (type === "SET_ISLOADING") {
    return { ...state, isLoading: true, editComplete: false };
  }
  if (type === "FETCH_JOBS_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: payload,
    };
  }
  if (type === "CREATE_JOB_SUCCESS") {
    return { ...state, isLoading: false, jobs: [...state.jobs, payload] };
  }
  if (type === "CREATE_JOB_ERROR") {
    return { ...state, isLoading: false, showAlert: true };
  }
  if (type === "DELETE_JOB_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      jobs: state.jobs.filter((item) => {
        return item._id !== payload.id;
      }),
    };
  }
  if (type === "DELETE_JOB_ERROR") {
    return { ...state, isLoading: false, showAlert: true };
  }
  if (type === "FETCH_SINGLE_JOB") {
    return { ...state, isLoading: true, editItem: payload, editComplete: true };
  }
  if (type === "FETCH_SINGLE_JOB_ERROR") {
    return { ...state, isLoading: false, editItem: "", singleJobError: true };
  }
  if (type === "EDIT_JOB_SUCCESS") {
    return {
      ...state,
      isLoading: true,
      editComplete: true,
      jobs: state.jobs.map((item) => {
        if (item.id === payload.jobId) {
          return payload.data.job;
        }
        return item;
      }),
    };
  }
  return state;
};
