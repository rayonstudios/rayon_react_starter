import HCaptcha from "@hcaptcha/react-hcaptcha";
import React from "react";

interface Props {
  onChange?: (token: string) => void;
}

const Captcha: React.FC<Props> = ({ onChange }) => {
  return (
    <HCaptcha
      sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
      onVerify={(token) => onChange?.(token)}
    />
  );
};

export default Captcha;
