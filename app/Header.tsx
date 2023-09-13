import Link from "next/link";

export default function Header() {
    return (
        <header className="p-4 grid grid-cols-1 bg-black text-white">
            <div className="grid justify-end items-center">
                <div className="grid gap-2 grid-flow-col">
                    <Link
                        href="/"
                        className="hover:underline transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </header>
    );
}
