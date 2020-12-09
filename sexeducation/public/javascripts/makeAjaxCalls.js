async function testAjax() {

    var response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: "foo=bar&lorem=ipsum"
    });

    console.log(response);

    //where we handle the data from the server
    if (response.ok) {
        var json = await response.json();
        alert(json.data);
    } else {
        alert(response.status + " " + response.statusCode);
    }

}

// post with Ajax
async function postWithAjax(elem) {

    var response = await fetch(elem.action, {
        method: elem.method,
        body: new FormData(elem)
    });

    console.log(response);

    var bookings = await response.json();

    console.log(bookings);

    //totalmark: Not in the booking database. 
    //How can I inserct totalmark in the data.js? 
    //Or how can I used totalmard rather than booking information?

    var aVotes = bookings.filter(function (booking) {
        return booking.totalmark == "0-4 points";
    });

    var bVotes = bookings.filter(function (booking) {
        return booking.totalmark == "5-8 points";
    });
    var cVotes = bookings.filter(function (booking) {
        return booking.totalmark == "9-12 points";   
    });

    
    chart1.data = [
        {
            totalmark: "0-4 points",
            votes: aVotes.length || 0
        },
        {
            totalmark: "5-8 points",
            votes: bVotes.length || 0
        },
        {
            totalmark: "9-12 points",
            votes: cVotes.length || 0
        }
    ];

}

//testAjax();


