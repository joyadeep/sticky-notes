import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NoteProvider from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalContextProvider from "@/context/ModalContext";
import ModalProvider from "@/providers/modal-provider";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sticky Notes",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NoteProvider>
          <ModalContextProvider>
            {children}
            <ModalProvider/>
          </ModalContextProvider>
          <ToastContainer />
        </NoteProvider>
      </body>
    </html>
  );
}
