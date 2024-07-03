import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({ subsets: ["latin"] });

export const metadata = {
  title: "Baca Qur'an Online",
  description: "Made with ❤️ by Rayhan",
  icons: {
    icon: './logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lora.className}>{children}</body>
    </html>
  );
}
