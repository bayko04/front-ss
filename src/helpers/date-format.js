export const timestampToTime = function (timestamp) {
    const date = new Date(timestamp * 1000);

    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const formattedTime = hours + ':' + minutes + ':' + seconds;

    return formattedTime;
}