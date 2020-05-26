export const getDomainName = (hostName) => {
  return (
    hostName &&
    hostName
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
  );
};

export const getRelativeTime = (date) => {
  const minuteSeconds = 60;
  const hourSeconds = minuteSeconds * 60;
  const daySeconds = hourSeconds * 24;

  const now = parseInt(new Date().getTime() / 1000);
  const d = now - date;
  if (d < minuteSeconds * 2) {
    return `now`;
  } else if (d < hourSeconds) {
    const minutes = Math.floor(d / minuteSeconds);
    return `${minutes} minutes ago`;
  } else if (d < daySeconds) {
    const hours = Math.floor(d / hourSeconds);
    return `${hours} hour${hours > 1 ? `s` : ``} ago`;
  } else {
    const days = Math.floor(d / daySeconds);
    return `${days} day${days > 1 ? `s` : ``} ago`;
  }
};
