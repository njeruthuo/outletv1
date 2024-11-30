import { useEffect, useState } from "react";

export function useMpesaTransaction(receiptId: string) {
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket(
      `ws://localhost:8000/ws/transaction/`
    );

    console.log("WebSocket created:", socket);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Filter messages by receipt ID
      if (data.receipt_id === receiptId) {
        console.log("Transaction Update:", data);
        setTransactionStatus(data);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup WebSocket on component unmount
    return () => {
      console.log("Closing WebSocket connection");
      socket.close();
    };
  }, [receiptId]);

  return transactionStatus;
}
