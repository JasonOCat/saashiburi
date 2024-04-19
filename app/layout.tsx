import { Metadata } from 'next';
import "@/app/_styles/globals.css";
import AppLayout from "@/app/_components/app-layout";

export const metadata: Metadata = {
  title: {
    template: '%s | Epic SaaS',
    default: 'Epic SaaS',
  },
  description: 'My epic Saas.',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout />
        {children}
      </body>
    </html>
  );
}
