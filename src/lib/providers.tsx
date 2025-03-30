"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

// Create a custom context for PortfolioProvider
const PortfolioContext = {
  portfolio: {
    skills: [],
    projects: [],
    certificates: [],
    mentorshipSessions: []
  },
  isLoading: false,
  isVerifying: false,
  walletConnected: false,
  verifySkill: async () => {},
  verifyProject: async () => {},
  verifyCertificate: async () => {},
  verifyMentorshipSession: async () => {},
  connectToWallet: async () => {}
};

// Create a mock PortfolioProvider that doesn't throw errors
export function PortfolioProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </ThemeProvider>
  );
} 