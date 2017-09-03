angular.module("app", []).controller("personController", function($scope, $http) {
    $scope.cities = [];
    $scope.teams = [];
    $scope.results = [];
    $scope.seasons = [];

    function CSVToArray(strData) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = ",";
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp((
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [
            []
        ];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"), "\"");
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return (arrData);
    }

    function CSV2JSON(csv) {
        var array = CSVToArray(csv);
        var objArray = [];
        for (var i = 1; i < array.length; i++) {
            objArray[i - 1] = {};
            for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                var key = array[0][k];
                objArray[i - 1][key] = array[i][k]
            }
        }
        return objArray;
    }

    $scope.readMatch = function() {
        // http get request to read CSV file content
        $http.get("matches.csv")
            .then(function(response) {
                var csv = response.data;

                $scope.iplData = CSV2JSON(csv);
                angular.forEach($scope.iplData, function(x) {
                    var d = new Date(x.date);
                    x.date = d.toDateString(); /// converting date to readable string
                    if ($scope.cities.indexOf(x.city) == -1) {
                        $scope.cities.push(x.city);
                        $scope.cities = $scope.cities.filter(Boolean); ///removing undefined
                    };
                    if ($scope.teams.indexOf(x.team1) < 0) {
                        $scope.teams.push(x.team1);
                        $scope.teams = $scope.teams.filter(Boolean); ///removing undefined
                    };
                    if ($scope.results.indexOf(x.result) < 0) {
                        $scope.results.push(x.result);
                        $scope.results = $scope.results.filter(Boolean); ///removing undefined
                    };
                    if ($scope.seasons.indexOf(x.season) < 0) {
                        $scope.seasons.push(x.season);
                        $scope.seasons = $scope.seasons.filter(Boolean); ///removing undefined
                    };
                });
            });
    }();

    $scope.readDelivery = function() {
        // http get request to read CSV file content
        $http.get("deliveries.csv")
            .then(function(response) {
                var csv = response.data;
                $scope.iplDelivery = CSV2JSON(csv);
                console.log($scope.iplDelivery);
            });

    }();
    $scope.scroll = function(x, index) {
        $scope.pop = index;
        if (screen.width > 480) {
            window.setTimeout(function() {
                var speed = 0;
                var scroll = 0;
                var container = $('.carousel-frame');
                var container_w = container.width();
                var max_scroll = container[0].scrollWidth - container.outerWidth();

                container.on('mousemove', function(e) {
                    var mouse_x = e.pageX - container.offset().left;
                    var mouseperc = 100 * mouse_x / container_w;
                    speed = mouseperc - 50;
                }).on('mouseleave', function() {
                    speed = 0;
                });

                function updatescroll() {
                    if (speed !== 0) {
                        scroll += speed / 5;
                        if (scroll < 0) scroll = 0;
                        if (scroll > max_scroll) scroll = max_scroll;
                        $('.carousel-frame').scrollLeft(scroll);
                    }
                    window.requestAnimationFrame(updatescroll);
                }
                window.requestAnimationFrame(updatescroll);
            }, 1000);
        }
    }

});