// // team selects
// var avengers = ["Captain America", "Iron Man", "Thor", "Hulk", "Black Widow", "Hawkeye"];
// var jla = ["Superman", "Batman", "Wonder Woman", "Flash", "Green Lantern", "Aquaman"];

// function teamSelected(teamValue) {

//     // alert(teamValue);
//     var heroSelect = document.getElementById("hero");
//     heroSelect.options.length = 0;
//     if (teamValue == "Avengers") {

//         avengers.forEach(function (item) {
//             var option = document.createElement("option");
//             option.text = item;
//             option.value = item;
//             heroSelect.add(option);
//         });

//         heroSelect.disabled = false;

//     } else if (teamValue == "JLA") {

//         jla.forEach(function (item) {
//             var option = document.createElement("option");
//             option.text = item;
//             option.value = item;
//             heroSelect.add(option);
//         });

//         heroSelect.disabled = false;

//     } else {

//         heroSelect.disabled = true;

//     }
// }