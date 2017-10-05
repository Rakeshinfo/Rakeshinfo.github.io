(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$scope'];

    function HomeController(UserService, $rootScope, $scope) {
        initController();

        function initController() {}
        $scope.json = [{
            name: "johnX",
            rate: "4.5",
            lat: 12.933870,
            long: 77.566566,
            src: "koramangla",
            dst: "whitefield",
            car: "polo",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 3
        }, {
            name: "johnA",
            rate: "3.5",
            src: "hosur",
            lat: 12.927513,
            long: 77.653770,
            dst: "whitefield",
            car: "swift",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 2
        }, {
            name: "johnB",
            rate: "2.5",
            src: "whitefield",
            lat: 12.998108,
            long: 77.586479,
            dst: "mg road",
            car: "etios",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 2
        }, {
            name: "johnC",
            rate: "4.5",
            src: "koramangla",
            lat: 12.969002,
            long: 77.595062,
            dst: "whitefield",
            car: "polo",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 4
        }, {
            name: "johnD",
            rate: "5",
            src: "koramangla",
            lat: 12.912454,
            long: 77.585793,
            dst: "whitefield",
            car: "polo",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 3
        }, {
            name: "johnR",
            rate: "4.5",
            src: "koramangla",
            lat: 13.001788,
            long: 77.685013,
            dst: "whitefield",
            car: "polo",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 3
        }, {
            name: "johnS",
            rate: "4",
            src: "hsr layout",
            lat: 12.928851,
            long: 77.686043,
            dst: "kr puram",
            car: "etios",
            img: "http://www.wrc.com/fileadmin/upload/img/teaser_driver/thumb/thumb_46.jpg",
            seatAvail: 3
        }]
        $scope.setActive = function(item, list) {
            list.some(function(item) {
                if (item.active) {
                    return item.active = false;
                }
            });
            item.active = true;
        };

        $scope.confirm = function(d) {
            // $scope.popData={};
            // console.log($scope.popData.length);
            $scope.popData = d;
            console.log($scope.popData.length);
        };
        $scope.cancelB = function() {
            $scope.popData = {};
            $scope.json.map(function(item) {
                if (item.active) {
                    item.active = false;
                }
            })
            for (var i = 0; i < marker.length; i++)
    marker[i].setMap(null);
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(12.9716, 77.5946),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        makeMarker($scope.json);
        function makeMarker(data) {
            data.map(function(x) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(x.lat, x.long),
                    map: map
                })
            })
        }
        // for (i = 0; i < $scope.json.length; i++) {
        //     marker = new google.maps.Marker({
        //         position: new google.maps.LatLng($scope.json[i].lat, $scope.json[i].long),
        //         map: map
        //     });


        //     // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     //     return function() {
        //     //         infowindow.setContent(locations[i][0], locations[i][6]);
        //     //         infowindow.open(map, marker);
        //     //     }
        //     // })(marker, i));
        // }



    }

})();
