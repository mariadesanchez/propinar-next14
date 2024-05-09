'use client'
import React, { useState } from "react";
import QRCode from "qrcode.react";

interface QRCodeGeneratorProps {
  defaultUrl: string;
  size?: number;
}
export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ defaultUrl, size = 60 }) => {
  const [url, setUrl] = useState<string>(defaultUrl);
  return (
    <div className="flex flex-col items-center">
      <QRCode value={url} size={size} />
    </div>
  );
};



