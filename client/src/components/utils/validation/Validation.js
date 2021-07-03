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

export const isMatch = (password, cf_password) => {-
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

export const isValidDateTime = (startDateTime, endDateTime) => {
    if (Date.parse(endDateTime) <= Date.parse(startDateTime)) return true;
    return false;
};

export const -isInValidDate = (startDateTime, endDateTime) => {
    var showdate = new Date();
    var showcurrentdate = showdate.getDate() + "/" + showdate.getMonth() + "/" + showdate.getFullYear();
    if (Date.parse(endDateTime) < Date.parse(showcurrentdate)  || Date.parse(startDateTime) < Date.parse(showcurrentdate)    ) return true;
};
