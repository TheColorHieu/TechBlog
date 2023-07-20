//here we are adding the helper function to format the date
module.exports = {
    format_date: date => {
        //format date as MM/DD/YYYY
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
}    