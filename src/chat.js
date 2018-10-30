
    // open connection
    var socket = new WebSocket("ws://localhost:8081");

    connection.onopen = function () {
        alert("Соединение установлено.");
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        alert("Ошибка " + error.message);
    };

    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message);
            console.log(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }
    }
