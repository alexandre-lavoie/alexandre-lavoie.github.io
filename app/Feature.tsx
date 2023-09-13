import DateComponent from "@/components/Date";
import { Feature } from "@/data/features";
import Image from "next/image";
import Link from "next/link";

export default function FeatureComponent(feature: Feature) {
    return (
        <div
            key={feature.title}
            className="grid gap-2 rounded p-4 bg-black text-white"
        >
            <div className="grid gap-2 col-span-1 h-min">
                <div className="grid grid-cols-2 text-sm">
                    <div>
                        <span>{feature.category}</span>
                    </div>
                    <div className="grid justify-end">
                        {feature.date === "now" ? (
                            <DateComponent now />
                        ) : (
                            <DateComponent
                                month={feature.date.month}
                                year={feature.date.year}
                            />
                        )}
                    </div>
                </div>
                <div className="grid justify-center">
                    <Image
                        src={feature.image.href}
                        alt="Feature Image"
                        width={feature.image.width}
                        height={feature.image.height}
                    />
                </div>
                <h2 className="text-center text-lg font-black">
                    {feature.title}
                </h2>
                <div className="text-justify text-gray-400 grid gap-2">
                    {feature.description.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
            </div>
            {feature.readMore ? (
                <div className="grid items-end text-center">
                    <Link
                        target={feature.readMore.target}
                        className="hover:underline hover:text-blue-500 transition-colors"
                        href={feature.readMore.href}
                    >
                        Read More
                    </Link>
                </div>
            ) : undefined}
        </div>
    );
}
