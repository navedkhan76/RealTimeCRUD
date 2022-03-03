export default (data = { records: [], loading: false }, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...data, loading: true };
    case "GET_RECORDS":
      return { records: action.payload, loading: false };
    case "ADD_RECORD":
      return {
        ...data,
        records: [...data.records, action.payload],
        loading: false,
      };
    case "DELETE":
      return {
        ...data,
        records: data.records.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case "EDIT_RECORD":
      return {
        ...data,
        records: data.records.map((item) => {
          if (item._id === action.payload.id) {
            item.name = action.payload.name;
            item.date = action.payload.date;
          }
          return item;
        }),
      };
    default:
      return data;
  }
};
