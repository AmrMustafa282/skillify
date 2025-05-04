"use client";

import type React from "react";

import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";

interface AnimatedAlertProps {
  message: string | null;
  title?: string | null;
  variant?: AlertVariant;
  className?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertIcons = {
  default: <Info className="h-4 w-4" />,
  destructive: <AlertCircle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

export function AnimatedAlert({
  message,
  title,
  variant = "default",
  className,
  icon,
  dismissible = false,
  onDismiss,
}: AnimatedAlertProps) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(!!message);
  }, [message]);

  if (!message) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  const customStyles = {
    success:
      "border-green-500 text-green-500 bg-green-50 dark:bg-green-950/50 dark:border-green-500/50",
    warning:
      "border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-950/50 dark:border-yellow-500/50",
    info: "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-950/50 dark:border-blue-500/50",
  };

  const alertStyle =
    variant === "success" || variant === "warning" || variant === "info"
      ? customStyles[variant]
      : "";

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <Alert
            variant={
              variant === "success" || variant === "warning" || variant === "info"
                ? "default"
                : variant
            }
            className={cn("mb-4 relative", alertStyle, className)}
          >
            <div className="flex items-start">
              <span className="mr-2 mt-0.5">{icon || alertIcons[variant]}</span>
              <div className="flex-1">
                {title && <AlertTitle className="mb-1">{title}</AlertTitle>}
                <AlertDescription>{message}</AlertDescription>
              </div>

              {dismissible && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-md bg-background/80 backdrop-blur-sm hover:bg-background/90 ml-2 -mr-1 -mt-1 shadow-sm hover:border border-border/50 hover:text-red-600"
                    onClick={handleDismiss}
                    aria-label="Dismiss"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
