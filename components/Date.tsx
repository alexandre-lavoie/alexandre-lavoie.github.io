import { MonthType, YearType } from "@/types/date";

export type DateProps =
    | {
          month: MonthType;
          year: YearType;
      }
    | {
          now: boolean;
      };

function monthToText(month: MonthType): string {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

export default function DateComponent(props: DateProps) {
    let month: MonthType = 1;
    let year = 0;
    if ("now" in props) {
        const date = new Date();
        month = (date.getMonth() + 1) as MonthType;
        year = date.getFullYear();
    } else {
        month = props.month;
        year = props.year;
    }

    return <span>{`${monthToText(month)}, ${year}`}</span>;
}
