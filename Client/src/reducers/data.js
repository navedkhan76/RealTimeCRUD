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
    case "ADD_IMAGE":
      return {
        ...data,
        records: data.records.map((item) => {
          if (item.id === action.payload._id)
            item.image = action.payload.images;
          return item;
        }),
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
          console.log(item,action.payload)
          if (item._id === action.payload.id) {
            item.name = action.payload.name;
            item.date = action.payload.date;
            item.image  = action.payload.images
          }
          return item;
        }),
      };
    default:
      return data;
  }
};
