import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  transactionTable: [],
  salesTable: [],
  disbursementTable: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    populateTransactionTable: (state, { payload }) => {
      //   console.log(payload, "populateTransactionTable payload");
      return { ...state, transactionTable: payload };
    },
    populateDisbursementTable: (state, { payload }) => {
      //   console.log(payload, "populateDisbursementTable payload");
      return { ...state, disbursementTable: payload };
    },
    populateSalesTable: (state, { payload }) => {
      //   console.log(payload, "populateSalesTable payload");
      return { ...state, salesTable: payload };
    },
  },
});

export const {
  populateDisbursementTable,
  populateSalesTable,
  populateTransactionTable,
} = reportSlice.actions;

export default reportSlice.reducer;
