"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ConnectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function ConnectButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: ConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const handleConnect = () => {
    // Mock wallet connection
    setConnected(true);
    setAddress("0xf29bbCF9987d3a18D5B5103c69F754182d1cE108");
  };

  const handleDisconnect = () => {
    setConnected(false);
    setAddress("");
  };

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md text-sm font-medium">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className={cn(className)}
          {...props}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className={cn(className)}
      variant={variant}
      size={size}
      {...props}
    >
      Connect Wallet
    </Button>
  );
} 