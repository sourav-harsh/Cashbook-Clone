export const formatAmount = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(Math.abs(amount));
};

export const formatCurrency = (value) => `\u20B9 ${formatAmount(value)}`;

export const formatDate = (iso) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (iso) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const relativeDay = (iso) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();

  const diff = Math.floor(
      (today.setHours(0, 0, 0, 0) -
          new Date(iso).setHours(0, 0, 0, 0)) /
      86400000
  );

  if (diff === 0) {
    return "Today";
  }

  if (diff === 1) {
    return "Yesterday";
  }

  return formatDate(iso);
};

export const createId = () =>
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
