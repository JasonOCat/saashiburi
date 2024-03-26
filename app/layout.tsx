import {Metadata} from 'next';

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
    <body>{children}</body>
    </html>
  );
}
