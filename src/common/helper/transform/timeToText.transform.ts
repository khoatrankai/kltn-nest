
/**
 * @requires time must be timepstamp
 * @param {number | string} time
 * @param {string} lang
 *
 * @returns {string}
 */


export function timeToTextTransform(time: number | string | Date, lang: string): string {
    if (typeof time === 'string') {
        time = parseInt(time);
    }
    if (time instanceof Date) {
        time = time.getTime();
    }
    return formatPostedTime(time, lang);
}

const formatPostedTime = (time: number, lang: string) => {

    const minutes = Math.floor((Date.now() - time) / 60000);
    const hours = Math.floor((Date.now() - time) / 3600000);
    const days = Math.floor((Date.now() - time) / 86400000);
    const months = Math.floor((Date.now() - time) / 2592000000);

    if (minutes < 30) {
        return newPostTime(lang);
    }
    else if (minutes >= 30 && minutes < 60) {
        return thirtyTo59MinutesAgo(lang, time);
    }
    else if (hours >= 1 && hours < 24) {
        return oneTo23HoursAgo(lang, time);
    }
    else if (days >= 1 && days < 30) {
        return oneTo30DaysAgo(lang, time);
    }
    else if (months >= 1 && months < 12) {
        return oneTo11MonthsAgo(lang, time);
    }
    else {
        return oldPostTime(lang);
    }
    
}

const newPostTime = (lang: string) => {
    
    switch (lang) {
        case "vi":
            return "Mới";
        case "en":
            return "New";
        case "ko":
            return "최신";
        default:
            return "Mới đăng";
    }
}

const thirtyTo59MinutesAgo = (lang: string, time: number) => {

    //get minutes from posted time to now
    const minutes = Math.floor((Date.now() - time) / 60000);

    switch (lang) {
        case "vi":
            return `${minutes} phút trước`;
        case "en":
            return `${minutes} minutes ago`;
            
        case "ko":
            return `${minutes} 분 전`;
        default:
            return `${minutes} phút trước`;
    }
}


const oneTo23HoursAgo = (lang: string, time: number) => {

    //get hours from posted time to now
    const hours = Math.floor((Date.now() - time) / 3600000);

    switch (lang) {
        case "vi":
            return `${hours} giờ trước`;
        case "en":
            if (hours === 1) {
                return `${hours} hour ago`;
            }
            else {
                return `${hours} hours ago`;
            }
        case "ko":
            return `${hours} 시간 전`;
        default:
            return `${hours} giờ trước`;
    }
}

const oneTo30DaysAgo = (lang: string, time: number) => {

    //get days from posted time to now
    const days = Math.floor((Date.now() - time) / 86400000);

    switch (lang) {
        case "vi":
            return `${days} ngày trước`;
        case "en":
            if (days === 1) {
                return `${days} day ago`;
            }
            else {
                return `${days} days ago`;
            }
        case "ko":
            return `${days} 일 전`;
        default:
            return `${days} ngày trước`;
    }
}

const oneTo11MonthsAgo = (lang: string, time: number) => {

    //get months from posted time to now
    const months = Math.floor((Date.now() - time) / 2592000000);

    switch (lang) {
        case "vi":
            return `${months} tháng trước`;
        case "en":
            if (months === 1) {
                return `${months} month ago`;
            }
            else {
                return `${months} months ago`;
            }
        case "ko":
            return `${months} 달 전`;
        default:
            return `${months} tháng trước`;
    }
}


const oldPostTime = (lang: string) => {
    switch (lang) {
        case "vi":
            return "Cũ";
        case "en":
            return "Old";
        case "ko":
            return "오래된";
        default:
            return "Cũ";
    }
}

export default formatPostedTime;