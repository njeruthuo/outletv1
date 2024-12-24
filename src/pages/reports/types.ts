import { formatDate } from "@/utils/date";

export type TransactionTableTypes = {
  headerName: string;
  flex: number;
  field: string;
  valueGetter?: (arg: unknown) => unknown;
  valueFormatter?: (arg: unknown) => unknown;
};

export type ReportType = "Sales" | "Transactions" | "Disbursements";


export const TransactionColDefs: TransactionTableTypes[] = [
  {
    headerName: "Shop",
    flex: 1,
    field: "shop",
  },
  {
    headerName: "Customer Phone",
    flex: 1,
    field: "customer_number",
  },

  {
    headerName: "Transaction Type",
    flex: 1,
    field: "transaction_type",
  },
  {
    headerName: "Transaction Status",
    flex: 1,
    field: "transaction_status",
  },
  {
    headerName: "Receipt Number",
    flex: 1,
    field: "receipt_number",
    valueGetter: (arg: unknown) => {
      const p = arg as { value: string };
      return p.value || "N/A";
    },
  },
  {
    headerName: "Returns",
    flex: 1,
    field: "profit",
  },
  {
    headerName: "Transaction code",
    flex: 1,
    field: "mpesa_transaction_code",
    valueGetter: (arg: unknown) => {
      const p = arg as { value: string };
      return p.value || "N/A";
    }, //{ value: string }
  },
  {
    headerName: "Date Created",
    flex: 1,
    field: "date_created",
    valueFormatter: (arg: unknown) => {
      const p = arg as { value: Date };
      return formatDate(p.value);
    },
  },
];