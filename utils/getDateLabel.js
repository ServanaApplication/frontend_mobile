// utils/getDateLabel.js
export const getDateLabel = (timestamp) => {
  const messageDate = new Date(timestamp);
  const now = new Date();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(messageDate, now)) {
    return "Today";
  } else if (isSameDay(messageDate, yesterday)) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }); // e.g. "13 Feb, 1:13 PM"
  }
};
