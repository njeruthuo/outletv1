import { useGetNotificationsQuery } from "@/features/notifications/notificationsApi";
import { NotificationCard } from "../cards";
import { useState } from "react";
import GlobalCloseButton from "../buttons/GlobalCloseButton";

export type NotificationType = {
  id: number;
  notification_status: string;
  notification_type: string;
  sender: number;
  sender_shop: string | null;
  date_created?: Date | string;
  shop_stocks_below_reorder: ProductType[];
};

type ProductType = {
  id: number;
  product: { name: string; price_per_item: string; reorder_level: number };
  quantity: number;
};

const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsQuery([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationType | null>(null);

  const handleNotificationClick = (notification: NotificationType) => {
    setSelectedNotification(notification);
  };

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error fetching notifications.</div>;

  return (
    <div>
      {selectedNotification ? (
        <NotificationDetail
          notification={selectedNotification}
          onBack={() => setSelectedNotification(null)}
        />
      ) : (
        <NotificationList
          notifications={notifications || []}
          onNotificationClick={handleNotificationClick}
        />
      )}
    </div>
  );
};

const NotificationList = ({
  notifications,
  onNotificationClick,
}: {
  notifications: NotificationType[];
  onNotificationClick: (notification: NotificationType) => void;
}) => {
  if (notifications.length === 0) return <div>No notifications available.</div>;

  return (
    <div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="my-1 hover:cursor-pointer"
          onClick={() => onNotificationClick(notification)}
        >
          <NotificationCard notification={notification} />
        </div>
      ))}
    </div>
  );
};

const NotificationDetail = ({
  notification,
  onBack,
}: {
  notification: NotificationType;
  onBack: () => void;
}) => {
  return (
    <div className="">
      <GlobalCloseButton closeModal={onBack}>
        Back to Notifications
      </GlobalCloseButton>
      <h2 className="font-bold text-md">Notification Details</h2>
      <p className="text-md font-light">
        {notification.sender_shop
          ? `Sender Shop: ${notification.sender_shop || "N/A"}`
          : "Stock levels are low."}
      </p>
      <h3 className="text-md font-light">Shop Stocks Below Reorder Level:</h3>
      <ul>
        {notification.shop_stocks_below_reorder.map((stock) => (
          <li key={stock.id} className="text-md text-blue-500">
            {stock.product.name} - Quantity: {stock.quantity} (Reorder Level:{" "}
            {stock.product.reorder_level})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
