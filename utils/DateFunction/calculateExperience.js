const calculateExperienceWithWord = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end - start;
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);

  return `${Math.floor(diffInYears)}+ years of Experience.`;
};


module.exports = { calculateExperienceWithWord };
