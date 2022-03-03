import * as api from "../api/api";

export const getRecords = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const { data } = await api.getRecords();

    dispatch({ type: "GET_RECORDS", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const addRecords = (record) => async (dispatch) => {
  try {
    await api.addRecords(record);
   
  } catch (e) {
    console.log(e);
  }
};
