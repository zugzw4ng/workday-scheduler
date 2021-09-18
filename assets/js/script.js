var dayInfo = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        todo: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        todo: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        todo: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        todo: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        todo: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        todo: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        todo: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        todo: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        todo: ""
    },

]

function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

function savetodos() {
    localStorage.setItem("dayInfo", JSON.stringify(dayInfo));
}

function displaytodos() {
    dayInfo.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.todo);
    })
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("dayInfo"));

    if (storedDay) {
        dayInfo = storedDay;
    }

    savetodos();
    displaytodos();
}

getHeaderDate();

dayInfo.forEach(function (thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourEntry = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-2 hour"
        });

    var hourPlan = $("<div>")
        .attr({
            "class": "col-9 p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr({
            "class": "past col-9 ",
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present col-9"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future col-9"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-1 saveBtn"
        });
    savePlan.append(saveButton);
    hourRow.append(hourEntry, hourPlan, savePlan);
})

init();

$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    dayInfo[saveIndex].todo = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    savetodos();
    displaytodos();
})