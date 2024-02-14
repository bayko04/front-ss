export const timestampToTime = function (dateString) {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return hours + ':' + minutes + ':' + seconds;
}

export const timestampToDate = function (dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDay()).slice(-2);
    const month = ('0' + date.getMonth()).slice(-2);
    const year = date.getFullYear();

    return day + '-' + month + '-' + year;
}