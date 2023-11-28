import moment from "moment";


export const useFormatDate = (timestamp) => {
    if (timestamp && typeof timestamp.toDate === "function") {
      return moment(timestamp.toDate()).format("YYYY-MM-DD");
    }
    return "Invalid Date";
};