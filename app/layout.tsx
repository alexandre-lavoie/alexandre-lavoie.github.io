import Footer from "./Footer";
import Header from "./Header";
import "./globals.css";
import { Noto_Sans } from "next/font/google";

const NotoSans = Noto_Sans({ subsets: ["latin"], weight: ["500", "900"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={NotoSans.className}>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-auto flex-shrink-0">{children}</main>
                </div>
            </body>
        </html>
    );
}
