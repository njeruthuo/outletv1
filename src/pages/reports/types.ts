import { formatDate } from "@/utils/date";

export type ColTypes = {
  headerName: string;
  flex: number;
  field: string;
  valueGetter?: (arg: unknown) => unknown;
  valueFormatter?: (arg: unknown) => unknown;
};

export type ReportType = "Sales" | "Transactions" | "Disbursements";

export const TransactionColDefs: ColTypes[] = [
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

export const DisbursementTypes: ColTypes[] = [
  {
    headerName: "Disbursed By",
    flex: 1,
    field: "disbursed_by",
  },
  {
    headerName: "Product Disbursed",
    flex: 1,
    field: "product",
  },
  {
    headerName: "Shop",
    flex: 1,
    field: "shop",
  },
  {
    headerName: "Quantity",
    flex: 1,
    field: "disbursement_quantity",
  },
  {
    headerName: "Disbursement Date",
    flex: 1,
    field: "timestamp",
    valueFormatter: (arg: unknown) => {
      const p = arg as { value: Date };
      return formatDate(p.value);
    },
  },
  {
    headerName: "status",
    flex: 1,
    field: "status",
  },
];
