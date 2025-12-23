import { useAppDispatch } from "@/lib/redux/store";
import { profileActions } from "@/modules/auth/slices/profile.slice";
import { BellOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";

const NotificationPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if we should show the prompt
    if ("Notification" in window && Notification.permission === "default") {
      // Check if user has dismissed it before
      const dismissed = localStorage.getItem("notification-prompt-dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Register FCM token
        await dispatch(profileActions.upsertFcmToken());
        setShowPrompt(false);
      } else if (permission === "denied") {
        setShowPrompt(false);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("notification-prompt-dismissed", "true");
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <Alert
      message="Enable Notifications"
      description="Stay updated with real-time notifications. We'll notify you about important updates."
      type="info"
      showIcon
      icon={<BellOutlined />}
      className="mb-4"
      action={
        <div className="flex gap-2">
          <Button
            size="small"
            type="primary"
            onClick={handleEnableNotifications}
            loading={isRequesting}
          >
            Enable
          </Button>
          <Button size="small" onClick={handleDismiss}>
            Not Now
          </Button>
        </div>
      }
      closable
      onClose={handleDismiss}
    />
  );
};

export default NotificationPrompt;
