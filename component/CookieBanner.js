"use client";

import { useEffect, useState } from "react";
import CookieConsent, { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";

export default function CookieBanner() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = getCookieConsentValue("cookiePreferences");
    if (savedConsent) {
      setPreferences(JSON.parse(savedConsent));
    }
  }, []);

  const handleAccept = () => {
    document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; path=/; max-age=31536000`;
  };

  const handleDecline = () => {
    resetCookieConsentValue();
    setPreferences({ necessary: true, analytics: false, marketing: false });
  };

  return (
    <CookieConsent
      location="top"
      buttonText="Přijmout vybrané"
      enableDeclineButton
      declineButtonText="Odmítnout vše"
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      <p>Tato stránka používá cookies pro vylepšení uživatelského zážitku.</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
          />
          Analytické cookies
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
          />
          Marketingové cookies
        </label>
      </div>
    </CookieConsent>
  );
}
