import Feature from "./Feature";
import Date from "@/components/Date";
import ExternalNav from "@/components/ExternalNav";
import { FEATURES } from "@/data/features";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home | Alexandre Lavoie",
    description: "Generated by create next app",
};

export default function Home() {
    return (
        <div>
            <div className="grid justify-center py-32 bg-black text-white gap-4">
                <div>
                    <h1 className="text-6xl font-black">
                        Hi, I'm <span className="text-blue-500">Alex</span>
                    </h1>
                </div>
                <div className="grid justify-center">
                    <ExternalNav />
                </div>
            </div>
            <div className="p-4 gap-4 grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {FEATURES.map((feature) => (
                    <Feature {...feature} />
                ))}
            </div>
        </div>
    );
}
