export type TransactionType = {
  customer_number: string;
  date_created: Date;
  id: number;
  mpesa_transaction_code: string | null;
  product_quantities: unknown;
  products: unknown;
  profit: number | string;
  receipt_ID: string;
  shop: { branch_name: string };
  transaction_status: string;
  transaction_type: string;
  user: { email: string };
};

export type DisbursementType = {
  disburse_quantity: number;
  disbursed_by: string;
  id: number;
  product: { name: string };
  shop: { branch_name: string };
  status: string;
  timestamp: string;
};
export type SalesType = { name: string };
