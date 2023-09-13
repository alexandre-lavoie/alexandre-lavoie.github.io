import IconLink from "./IconLink";
import { GitHubIcon, LinkedInIcon } from "./Icons";

export default function ExternalNav() {
    return (
        <div className="grid gap-2 grid-flow-col w-min">
            <IconLink
                href="https://github.com/alexandre-lavoie"
                icon={GitHubIcon}
            />
            <IconLink
                href="https://www.linkedin.com/in/alexandre-lavoie-00"
                icon={LinkedInIcon}
            />
        </div>
    );
}
