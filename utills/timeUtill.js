// return true if time1 is greater than time 2
function isTimeGreater(time1, time2) {
    // Convert time strings to Date objects for comparison
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Create Date objects with a fixed date and the extracted hours and minutes
    const date1 = new Date(2000, 0, 1, hours1, minutes1);
    const date2 = new Date(2000, 0, 1, hours2, minutes2);

    // Compare the Date objects to determine which time is greater
    return date1 > date2;
}


module.exports = {isTimeGreater};