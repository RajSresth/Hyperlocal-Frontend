import { useState, useEffect } from "react";

const useCountdown = (expiryIso) => {
  const expiry = expiryIso ? new Date(expiryIso).getTime() : 0;
  const [left, setLeft] = useState(() => Math.max(0, expiry - Date.now()));

  useEffect(() => {
    let id = setInterval(() => setLeft(Math.max(0, expiry - Date.now())), 1000);

    return () => clearInterval(id);
  }, [expiry]);

  const s = Math.ceil(left / 1000);
  return {
    expired: left === 0,
    text: `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`,
  };
};

export default useCountdown;
