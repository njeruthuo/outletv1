import React from "react";
import GlobalCard from "./GlobalCard";
import NotificationCard from "./NotificationCard";

export { GlobalCard, NotificationCard };

export type GlobalCardType = {
  title: React.ReactNode;
  description: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
};
