import Link from "next/link";
import { FC, createElement } from "react";

export interface IconLinkProps {
    href: string;
    icon: FC;
    dark?: boolean;
}

export default function IconLink(props: IconLinkProps) {
    return (
        <Link
            href={props.href}
            className={
                (props.dark ? "bg-black fill-white" : "bg-white fill-black") +
                " focus:bg-blue-500 focus:fill-white hover:bg-blue-500 hover:fill-white transition-colors p-1 rounded-full w-10 h-10"
            }
        >
            {createElement(props.icon)}
        </Link>
    );
}
