import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/JobsReducer";
import "../axios";

const JobContext = createContext();

const initialState = {
  isLoading: false,
  jobs: [],
  editItem: null,
  singleJobError: false,
  editComplete: false,
};

const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsJobLoading = () => {
    dispatch({ type: "SET_ISLOADING" });
  };

  const fetchJobs = async () => {
    setIsJobLoading();
    try {
      const { data } = await axios.get(`/jobs`);
      console.log("Dagta", data);
      dispatch({ type: "FETCH_JOBS_SUCCESS", payload: data.job });
    } catch (error) {
      dispatch({ type: "FETCH_JOBS_ERROR" });
    }
  };

  const createJob = async (userInput) => {
    setIsJobLoading();
    try {
      const { data } = await axios.post(`/jobs`, { ...userInput });
      dispatch({ type: "CREATE_JOB_SUCCESS", payload: data.job });
    } catch (error) {
      dispatch({ type: "CREATE_JOB_ERROR" });
    }
  };

  const fetchSingleJob = async (id) => {
    setIsJobLoading();
    try {
      const { data } = await axios.get(`/jobs/${id}`);
      console.log("data =>", data);
      dispatch({ type: "FETCH_SINGLE_JOB", payload: data.job });
    } catch (error) {
      dispatch({ type: "FETCH_SINGLE_JOB_ERROR" });
    }
  };

  const deleteJob = async (id) => {
    setIsJobLoading();
    try {
      await axios.delete(`/jobs/${id}`);
      dispatch({ type: "DELETE_JOB_SUCCESS", payload: { id } });
    } catch (error) {
      dispatch({ type: "DELETE_JOB_ERROR" });
    }
  };

  const editJob = async (jobId, userInput) => {
    setIsJobLoading();
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      });
      dispatch({ type: "EDIT_JOB_SUCCESS", payload: { jobId, data } });
    } catch (error) {
      dispatch({ type: "EDIT_JOB_ERROR" });
    }
  };
  return (
    <JobContext.Provider
      value={{
        ...state,
        dispatch,
        createJob,
        deleteJob,
        fetchJobs,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobGobalContext = () => {
  return useContext(JobContext);
};

export { JobContext, JobProvider };
