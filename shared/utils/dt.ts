import dayjs from "dayjs";

export default class DT {
    static humanReadable(d?: Date) {
        if (!d) {
            return "";
        }
        const dt = dayjs(d);
        return dt.format('DD.MM.YYYY HH:mm:ss');
    }
}