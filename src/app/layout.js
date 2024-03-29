import "@/styles/reset.css";
import "./globals.css";

import { ReduxProvider } from "@/redux/ReduxProvider";
import SideMenu from "./components/sidemenu";

export const metadata = {
  title: "Dersigo",
  description: "Created by Suayb Kardas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className="sm:flex sm:flex-col lg:grid grid-cols-12 gap-x-3 mt-4">
          <div className="col-span-2 sm:mb-6 sm:px-5 lg:px-0 lg:mb-0">
            <SideMenu />
          </div>
          <div className="col-span-10 sm:px-5 lg:pr-5">{children}</div>
        </body>
      </ReduxProvider>
    </html>
  );
}
