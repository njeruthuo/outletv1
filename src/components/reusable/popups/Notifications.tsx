import { useGetNotificationsQuery } from "@/features/notifications/notificationsApi";
import { NotificationCard } from "../cards";
// import React from "react";

const Notifications = () => {
  const { data: Notifications } = useGetNotificationsQuery([]);
  console.log(Notifications, "Notifications");

  return (
    <div>
      {Notifications?.map((notification: NotificationType, index: number) => {
        return (
          <div key={index}>
            <NotificationCard notification={notification} />
            {/* <hr /> */}
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;

export type NotificationType = {
  id: number;
  notification_status: string;
  notification_type: string;
  sender: number;
  sender_shop: string | null;
  date_created?: Date | string;
};
