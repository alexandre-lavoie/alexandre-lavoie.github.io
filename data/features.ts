import { MonthType, YearType } from "@/types/date";

export const FEATURE_CATEGORIES = ["News", "Project", "Job"] as const;
export type FeatureCategory = (typeof FEATURE_CATEGORIES)[number];

export type FeatureDate =
    | {
          month: MonthType;
          year: YearType;
      }
    | "now";

export interface FeatureImage {
    href: string;
    width: number;
    height: number;
}

export interface FeatureReadMore {
    target: "_blank";
    href: string;
}

export interface Feature {
    title: string;
    description: string[];
    image: FeatureImage;
    category: FeatureCategory;
    date: FeatureDate;
    readMore?: FeatureReadMore;
}

export const FEATURES: Feature[] = [
    {
        title: "SDE @ Amazon",
        description: [
            "Developed enterprise applications on AWS cloud.",
            "Maintained 100K+ user systems.",
            "Led multiple projects from start to completion.",
        ],
        image: {
            href: "https://m.media-amazon.com/images/G/15/gc/designs/livepreview/default_eng_noto_email_v2016_ca-main._CB652051262_.png",
            width: 546,
            height: 337,
        },
        category: "Job",
        date: "now",
    },
    {
        title: "F-Six",
        description: [
            "I built an arcade racer part of a Game Development class.",
            "I used Unity, NetCode, Discord API, and many more!",
        ],
        image: {
            href: "https://github.com/f6-476/f-six/blob/multiplayer/.github/images/overview.png?raw=true",
            width: 902,
            height: 503,
        },
        category: "Project",
        date: {
            month: 4,
            year: 2022,
        },
        readMore: {
            target: "_blank",
            href: "https://github.com/f6-476/f-six",
        },
    },
    {
        title: "Won a National Cybersecurity Competition",
        description: [
            "My team (Cubermitis) topped the leaderboard at the CyberSCI national Capture-The-Flag (CTF) cybersecurity competition.",
            "I represented Canada at the European and International cybersecurity competition in Prague and Athens.",
        ],
        image: {
            href: "https://www.concordia.ca/news/stories/2021/09/30/2-concordia-undergrads-win-at-national-cybersecurity-competition/_jcr_content/top-image.img.768.medium.jpg/1633006055482.jpg",
            width: 768,
            height: 372,
        },
        category: "News",
        date: {
            month: 9,
            year: 2021,
        },
        readMore: {
            target: "_blank",
            href: "https://www.concordia.ca/news/stories/2021/09/30/2-concordia-undergrads-win-at-national-cybersecurity-competition.html",
        },
    },
    {
        title: "Pentester @ Desjardins",
        description: [
            "Pentested industry applications and systems.",
            "Contributed to PwnDoc.",
            "Developed internal tooling.",
        ],
        image: {
            href: "https://scontent.fymq3-1.fna.fbcdn.net/v/t1.6435-1/89839448_2814815225222371_2094177078017523712_n.png?stp=dst-png_p148x148&_nc_cat=109&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=jS_R1oHmpRQAX_9f4Wn&_nc_ht=scontent.fymq3-1.fna&oh=00_AfCCRZXpi-qGN30JSFg4Cj9h_XoKsm4wRD4B-omSUIN9xA&oe=6528D8CB",
            width: 148,
            height: 148,
        },
        category: "Job",
        date: {
            month: 8,
            year: 2021,
        },
    },
    {
        title: "HackMtl",
        description: [
            "I worked on a cybersecurity startup that aims to make cybersecurity more accessible.",
            "Took part of the Centech Acceleration Program.",
        ],
        image: {
            href: "/features/hack_mtl.png",
            width: 800,
            height: 428,
        },
        category: "Project",
        date: {
            month: 8,
            year: 2020,
        },
        readMore: {
            target: "_blank",
            href: "https://github.com/hackmtlca",
        },
    },
];
