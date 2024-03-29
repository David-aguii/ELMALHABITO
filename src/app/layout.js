import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";

import { AppBar, Paper } from "@mui/material";
import Busqueda from "./Busqueda/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EL MAL HABITO",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Paper>{children}</Paper>
      </body>
    </html>
  );
}
