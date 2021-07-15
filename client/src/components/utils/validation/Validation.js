import dayjs from "dayjs";

export const isEmpty = (value) => {
    if (!value) return true;
    return false;
};

export const isEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const isLength = (password) => {
    if (password.length < 6) return true;
    return false;
};

export const isMatch = (password, cf_password) => {
    if (password === cf_password) return true;
    return false;
};

export const isValidString = (string) => {
    if (string.length < 3 || string.length > 50) return true;
    return false;
};

export const isValidDescription = (string) => {
    if (string.length < 3 || string.length > 2000) return true;
    return false;
};

export const isInvalidDateTime = (startDateTime, endDateTime) => {
    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ":" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var now = dayjs(date).format("YYYY-MM-DDThh:mm");

    if (Date.parse(endDateTime) <= Date.parse(startDateTime) || Date.parse(startDateTime) <= Date.parse(now)) return true;
    return false;
};

export const isInValidDate = (startDateTime, endDateTime) => {
    var showdate = new Date();
    var showcurrentdate = showdate.getDate() + "/" + showdate.getMonth() + "/" + showdate.getFullYear();
    if (Date.parse(endDateTime) < Date.parse(showcurrentdate) || Date.parse(startDateTime) < Date.parse(showcurrentdate)) return true;
};

export const isYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    // var matches = url.match(p);
    // if (matches) {
    //     return matches[1];
    // }
    return p.test(url);
};
