import React from "react";
import { NotificationType } from "../popups/Notifications";
import GlobalSubmitButton from "../buttons/GlobalSubmitButton";
import { useSetNotificationReadMutation } from "@/features/notifications/notificationsApi";
import { CircularProgress } from "@mui/material";

const NotificationCard: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const [setNotificationRead, { isLoading }] = useSetNotificationReadMutation();

  // notification_status: 'READ'
  const cardStyles = `flex w-full place-items-center  shadow-md p-2 ${
    notification.notification_status == "READ" ? "bg-gray-200" : "bg-gray-300"
  } rounded-md`;

  // console.log(notification, "notification");

  const changeNotificationStatus = async (arg: number) => {
    try {
      await setNotificationRead(arg).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cardStyles}>
      {notification.notification_type == "STOCK DEPLETED" && (
        <div>
          <img src="/trending_down_26dp.svg" alt="" />
        </div>
      )}
      <p className="mx-2">
        {notification.sender ? (
          <>Shop {notification.notification_type}</>
        ) : (
          <>Central {notification.notification_type.toLowerCase()}</>
        )}
      </p>

      <div className="ml-auto">
        <GlobalSubmitButton
          handleSubmit={() => changeNotificationStatus(notification.id)}
        >
          {isLoading ? (
            <>
              <CircularProgress size={"32px"} />
            </>
          ) : (
            <img src="/check_small_26dp.svg" alt="" />
          )}
        </GlobalSubmitButton>
      </div>
    </div>
  );
};

export default NotificationCard;
