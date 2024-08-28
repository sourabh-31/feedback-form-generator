const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
};

const generateDeviceId = () => {
  const storedId = localStorage.getItem("deviceId");
  if (storedId) {
    return storedId;
  }

  const newId = generateUniqueId();
  localStorage.setItem("deviceId", newId);
  return newId;
};

export const getDeviceFingerprint = async () => {
  const deviceId = generateDeviceId();
  const colorDepth = window.screen.colorDepth;
  const pixelRatio = window.devicePixelRatio;
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const fingerprint = `${deviceId}|${colorDepth}|${pixelRatio}|${platform}|${language}|${hardwareConcurrency}|${timezone}|${userAgent}`;
  return btoa(fingerprint); // Base64 encode the fingerprint
};
