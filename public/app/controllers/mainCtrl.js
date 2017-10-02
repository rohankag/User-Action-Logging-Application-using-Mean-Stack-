angular.module('mainController', ['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){

 //var socket = io('http://localhost');
 // socket.on('connected', function (data) {
   // console.log(data);
    // socket.emit('user-interaction', { my: 'data', username: "Rohank Agarwal" });
  //});



   var app=this;

   $rootScope.$on('$routeChangeStart',function(){
      if(Auth.isLoggedin()){

   	app.isLoggedin= true;
   
   	Auth.getUser().then(function(data){
   		var series2 = new Array();
        var categories = new Array();
        var series3 = new Array();
        var categorie3 = new Array();
        var dateArray = new Array();
   		app.username= data.data.username;
       Auth.getLog(data.data).then(function(data){
       	 
       app.logs=data.data.loguser;
       })

       
       Auth.getAction(data.data).then(function(data){
      
       app.actions=data.data.events;
       actions=data.data.events
       upvoted=0;
       downvoted=0;
       shared=0;
       searched=0;
       commented=0;
       scrolled=0;
       app.d3loaded = false;
      for (var i = 0; i < actions.length; i++) { 
        
         if(actions[i].eventtype=="upvoted"){
          upvoted=upvoted+1;
         }

         if(actions[i].eventtype=="downvoted"){
          downvoted=downvoted+1;
         }
         if(actions[i].eventtype=="user shared the answer"){
          shared=shared+1;
         }
         
         if(actions[i].eventtype=="user searched in the search field"){
          searched=searched+1;
         }

         if(actions[i].eventtype=="user commented on the answer"){
          commented=commented+1;
         }

         if(actions[i].eventtype=="scrolled entire page"){
          scrolled=scrolled+1;
         }
       

         }

 app.ideas = [
    ['Upvote', upvoted],
    ['Downvote', downvoted],
    ['shared', shared],
    ['search', searched],
    ['Commented', commented],
    ['scrolled page', scrolled]
  ];

  console.log(app.ideas);
 
 $rootScope.$emit('somethingChangedInFirstDirective', app.ideas);
  
     app.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
  app.data = [300, 500, 100, 40, 120];
       })

       

       //Getting Action count
     Auth.getActioncount(data.data).then(function(data){
        totalactions=data.data.events;

         for (var i=0; i<totalactions.length; i++) {
           var value = totalactions[i]._id.action;
           var index = categories.findIndex(x=>x==value);
           if (index == -1) {
               categories.push(value);
           }
       };

        for (var i=0; i<totalactions.length; i++) {
           var user = totalactions[i]._id.username;
           var index = series2.findIndex(x=>x.name==user);
           if (index == -1) {
               var values = new Array(categories.length).fill(0);

               for(var j=0; j<totalactions.length; j++) {
                   if(totalactions[j]._id.username == user) {
                       var action = totalactions[j]._id.action;
                       var indexValue = categories.findIndex(x=>x==action);
                       values[indexValue] = totalactions[j].count;
                   }
               }

             //  console.log(user);
              // console.log(values);

               series2.push({
                   name: user,
                   data: values
               })
           }
       };

      app.categories=categories;
      app.series2= series2;
     // console.log(app.categories);
     // console.log(app.series2);
     $rootScope.$emit('somethingChangedInFirstDirective2', app.series2);

      
       });

     Auth.getLogcount(data.data).then(function(data){
     totallogins=data.data.events;
       // console.log(totallogins);

       for (var i=0; i<totallogins.length; i++) {
           var day = totallogins[i]._id.day;
           var month = totallogins[i]._id.month;
           var year = totallogins[i]._id.year;
           var date1 = month + "/" + day + "/" + year;
           var index = dateArray.findIndex(x=>x==date1);
           
           if(index == -1) {
               dateArray.push(date1);
           }
       }
     //  console.log("datearray");
      // console.log(dateArray);

       for (var i=0; i<totallogins.length; i++) {
           var user = totallogins[i]._id.user;
           var value = new Array(dateArray.length).fill(0);
           var index = series3.findIndex(x=>x.name==user);
           if (index == -1) {
               for (var j=0; j<totallogins.length; j++) {
                   if (totallogins[j]._id.user == user) {
                       var day = totallogins[j]._id.day;
                       var month = totallogins[j]._id.month;
                       var year = totallogins[j]._id.year;
                       var date2 = month + "/" + day + "/" + year;
                       var dateIndex = dateArray.findIndex(x=>x==date2);
                       value[dateIndex] = totallogins[j].count;
                   }
               }
               series3.push({
                   name: user,
                   data: value
               });
           }
       };
      // console.log(series3);
       app.series3=series3;
       app.datearray=dateArray;
       
       
     $rootScope.$emit('somethingChangedInFirstDirective3', app.series3,app.datearray);

});
     Auth.getTotalAction(data.data).then(function(data){
      
       
       totalactions=data.data.events
       totalupvoted=0;
       totaldownvoted=0;
       totalshared=0;
       totalsearched=0;
       totalcommented=0;
       totalscrolled=0;
       app.d3loaded = false;
      for (var i = 0; i < totalactions.length; i++) { 
        
         if(totalactions[i].eventtype=="upvoted"){
          totalupvoted=totalupvoted+1;
         }

         if(totalactions[i].eventtype=="downvoted"){
          totaldownvoted=totaldownvoted+1;
         }
         if(totalactions[i].eventtype=="user shared the answer"){
          totalshared=totalshared+1;
         }
         
         if(totalactions[i].eventtype=="user searched in the search field"){
          totalsearched=totalsearched+1;
         }

         if(totalactions[i].eventtype=="user commented on the answer"){
          totalcommented=totalcommented+1;
         }

         if(totalactions[i].eventtype=="scrolled entire page"){
          totalscrolled=totalscrolled+1;
         }
       

         }

 app.totalideas = [
    ['Upvote', totalupvoted],
    ['Downvote', totaldownvoted],
    ['shared', totalshared],
    ['search', totalsearched],
    ['Commented', totalcommented],
    ['scrolled page', totalscrolled]
  ];
console.log(app.totalideas);
      $rootScope.$emit('somethingChangedInFirstDirective4',app.totalideas);

app.a=['dd','dsfsf','dfsdf'];
      $rootScope.$emit('somethingChangedInFirstDirective5',app.a);
 
  
     app.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
  app.data = [300, 500, 100, 40, 120];
       })

   	});

    
   }else{
   	app.isLoggedin= false;
   	app.username= '';
   }
   });
   
   
  
	this.dologin= function(loginData){
		app.errorMsg=false;
         Auth.login(app.loginData).then(function(data){

			 if(data.data.success){

			 	app.successMsg= data.data.message + '..redirecting to dashboard';
			 	$timeout(function(){
			 		$location.path('/profile');
			 		app.loginData='';
			 		app.successMsg='';
                   app.errorMsg=false;
                   app.log="dd";
			 	},1000);
			 	

			 }  
			 else{
			 	app.errorMsg= data.data.message;
			 }
		})

        

	};

	this.logout= function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
          $location.path('/');
		},1000)
	};
	
}).directive('hcPie', function ($rootScope) {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container" style="margin: 0 auto"></div>',
    link: function (scope, element, attrs) {

      function loadChart(){
          //console.log("Loading");
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
            },
            title: {
              text: 'Personal User action frequency distribution'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage}%</b>',
              percentageDecimals: 1
            },
            plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
            series: [{
              type: 'pie',
              name: 'User Action percentage',
              data: scope.items
            }]
          });
      }


    $rootScope.$on('somethingChangedInFirstDirective', function (ev, data) {
        // render everything again i.e. reload the directive
        scope.items = data;

        loadChart();
    });
      
      
    }


  }
}).directive('hcPie2', function ($rootScope) {
  return {
    restrict: 'C',
    replace: true,
    scope2: {
      items: '=',
      name: '='

    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container2" style="margin: 0 auto"></div>',
    link: function (scope2, element, attrs) {

      function loadChart(){
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container2',
              type: 'column'
            },
            title: {
              text: ' Comparison  Chart of activities of different users'
            },
            legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    xAxis: {
        categories: ["downvoted", "scrolled entire page", "upvoted", "user commented on the answer", "user searched in the search field", "user shared the answer"],
        labels: {
            x: -10
        }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },

     series: scope2.items,


            responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
          });
      }

      //scope.showSecondChart = true;

    $rootScope.$on('somethingChangedInFirstDirective2', function (ev, data) {
        // render everything again i.e. reload the directive
        
        scope2.items = data;
       // console.log(scope2.items);
        loadChart();
    });
      
      
    }

    
  }
}).directive('hcPie3', function ($rootScope) {
  return {
    restrict: 'C',
    replace: true,
    scope3: {
      items: '=',
      name: '='

    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container3" style="margin: 0 auto"></div>',
    link: function (scope3, element, attrs) {

      function loadChart(){
         // console.log("Loading");
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container3',
             
            },
            
             title: {
        text: 'Comparison of Login activities of users with time'
    },

    subtitle: {
        text: 'Open Social Modeling'
    },

    yAxis: {
        title: {
            text: 'Login counts'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

     xAxis: {
        
        categories: scope3.name

    },

    series: scope3.items,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

          });
      }

      //scope.showSecondChart = true;

    $rootScope.$on('somethingChangedInFirstDirective3', function (ev, data,data2) {
        // render everything again i.e. reload the directive
        
        scope3.items = data;
        scope3.name= data2;
        loadChart();
    });

      
      
    }

    
  }
}).directive('hcPie4', function ($rootScope) {
  return {
    restrict: 'C',
    replace: true,
    scope4: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container4" style="margin: 0 auto"></div>',
    link: function (scope4, element, attrs) {

      function loadChart(){
          //console.log("Loading");
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container4',
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
            },
            title: {
              text: 'All USER  action frequency distribution'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage}%</b>',
              percentageDecimals: 1
            },
            plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
            series: [{
              type: 'pie',
              name: 'User Action percentage',
              data: scope4.items
            }]
          });
      }


    $rootScope.$on('somethingChangedInFirstDirective4', function (ev, data) {
        // render everything again i.e. reload the directive
        scope4.items = data;

        loadChart();
    });
      
      
    }


  }
}).directive('hcPie5', function ($rootScope) {
  return {
    restrict: 'C',
    replace: true,
    scope5: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container5" style="margin: 0 auto"></div>',
    link: function (scope5, element, attrs) {

      function loadChart(){
          //console.log("Loading");
          var chart = new Highcharts.Chart({
            chart: {
            renderTo: 'container5',
            width: 600,
            height: 600,
            plotBorderWidth: 1
        },
        series: [{
            type: 'wordcloud',
            data: scope5.items
        }],
        title: {
            text: 'Wordcloud of Stack Overflow Tags based on user frequency hit'
        }


              
          });
      }


    $rootScope.$on('somethingChangedInFirstDirective5', function (ev, data) {
        // render everything again i.e. reload the directive

(function(factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    (function(H) {
        /**
         * (c) 2016 Highsoft AS
         * Authors: Jon Arild Nygard
         *
         * License: www.highcharts.com/license
         *
         * This is an experimental Highcharts module which enables visualization
         * of a word cloud.
         */
        var each = H.each,
            extend = H.extend,
            Series = H.Series;

        /**
         * isRectanglesIntersecting - Detects if there is a collision between two
         *     rectangles.
         *
         * @param  {object} r1 First rectangle.
         * @param  {object} r2 Second rectangle.
         * @return {boolean} Returns true if the rectangles overlap.
         */
        var isRectanglesIntersecting = function isRectanglesIntersecting(r1, r2) {
            return !(
                r2.left > r1.right ||
                r2.right < r1.left ||
                r2.top > r1.bottom ||
                r2.bottom < r1.top
            );
        };

        /**
         * intersectsAnyWord - Detects if a word collides with any previously placed
         *     words.
         *
         * @param  {Point} point Point which the word is connected to.
         * @param  {Array} points Previously placed points to check against.
         * @return {boolean} Returns true if there is collision.
         */
        var intersectsAnyWord = function intersectsAnyWord(point, points) {
            var intersects = false,
                rect1 = point.rect,
                rect2;
            if (point.lastCollidedWith) {
                rect2 = point.lastCollidedWith.rect;
                intersects = isRectanglesIntersecting(rect1, rect2);
                // If they no longer intersects, remove the cache from the point.
                if (!intersects) {
                    delete point.lastCollidedWith;
                }
            }
            if (!intersects) {
                intersects = !!H.find(points, function(p) {
                    var result;
                    rect2 = p.rect;
                    result = isRectanglesIntersecting(rect1, rect2);
                    if (result) {
                        point.lastCollidedWith = p;
                    }
                    return result;
                });
            }
            return intersects;
        };

        /**
         * archimedeanSpiral - Gives a set of cordinates for an Archimedian Spiral.
         *
         * @param  {type} t How far along the spiral we have traversed.
         * @return {object} Resulting coordinates, x and y.
         */
        var archimedeanSpiral = function archimedeanSpiral(t) {
            t *= 0.1;
            return {
                x: t * Math.cos(t),
                y: t * Math.sin(t)
            };
        };

        /**
         * getRandomPosition
         *
         * @param  {number} size
         * @return {number}
         */
        var getRandomPosition = function getRandomPosition(size) {
            return Math.round((size * (Math.random() + 0.5)) / 2);
        };

        /**
         * getScale - Calculates the proper scale to fit the cloud inside the plotting
         *     area.
         *
         * @param  {number} targetWidth  Width of target area.
         * @param  {number} targetHeight Height of target area.
         * @param  {object} field The playing field.
         * @param  {Series} series Series object.
         * @return {number} Returns the value to scale the playing field up to the size
         *     of the target area.
         */
        var getScale = function getScale(targetWidth, targetHeight, field, series) {
            var box = series.group.getBBox(),
                f = {
                    left: box.x,
                    right: box.x + box.width,
                    top: box.y,
                    bottom: box.y + box.height
                },
                height = Math.max(Math.abs(f.top), Math.abs(f.bottom)) * 2,
                width = Math.max(Math.abs(f.left), Math.abs(f.right)) * 2,
                scaleX = 1 / width * targetWidth,
                scaleY = 1 / height * targetHeight;
            return Math.min(scaleX, scaleY);
        };

        /**
         * getPlayingField - Calculates what is called the playing field.
         *    The field is the area which all the words are allowed to be positioned
         *    within. The area is proportioned to match the target aspect ratio.
         *
         * @param  {number} targetWidth Width of the target area.
         * @param  {number} targetHeight Height of the target area.
         * @return {object} The width and height of the playing field.
         */
        var getPlayingField = function getPlayingField(targetWidth, targetHeight) {
            var ratio = targetWidth / targetHeight;
            return {
                width: 256 * ratio,
                height: 256
            };
        };


        /**
         * getRotation - Calculates a number of degrees to rotate, based upon a number
         *     of orientations within a range from-to.
         *
         * @param  {type} orientations Number of orientations.
         * @param  {type} from The smallest degree of rotation.
         * @param  {type} to The largest degree of rotation.
         * @return {type} Returns the resulting rotation for the word.
         */
        var getRotation = function getRotation(orientations, from, to) {
            var range = to - from,
                intervals = range / (orientations - 1),
                orientation = Math.floor(Math.random() * orientations);
            return from + (orientation * intervals);
        };

        /**
         * outsidePlayingField - Detects if a word is placed outside the playing field.
         *
         * @param  {Point} point Point which the word is connected to.
         * @param  {object} field The width and height of the playing field.
         * @return {boolean} Returns true if the word is placed outside the field.
         */
        var outsidePlayingField = function outsidePlayingField(point, field) {
            var rect = point.graphic.getBBox(),
                playingField = {
                    left: -(field.width / 2),
                    right: field.width / 2,
                    top: -(field.height / 2),
                    bottom: field.height / 2
                };
            return !(
                playingField.left < rect.x &&
                playingField.right > (rect.x + rect.width) &&
                playingField.top < rect.y &&
                playingField.bottom > (rect.y + rect.height)
            );
        };

        /**
         * Default options for the WordCloud series.
         */
        var WordCloudOptions = {
            borderWidth: 0,
            clip: false, // Something goes wrong with clip. // TODO fix this
            colorByPoint: true,
            fontFamily: 'Impact',
            placementStrategy: 'random',
            rotation: {
                from: 0,
                orientations: 2,
                to: 90
            },
            showInLegend: false,
            spiral: 'archimedean',
            tooltip: {
                followPointer: true
            }
        };

        /**
         * Properties of the WordCloud series.
         */
        var WordCloudSeries = {
            animate: Series.prototype.animate,
            bindAxes: function() {
                var wordcloudAxis = {
                    endOnTick: false,
                    gridLineWidth: 0,
                    lineWidth: 0,
                    maxPadding: 0,
                    startOnTick: false,
                    title: null,
                    tickPositions: []
                };
                Series.prototype.bindAxes.call(this);
                extend(this.yAxis.options, wordcloudAxis);
                extend(this.xAxis.options, wordcloudAxis);
            },
            /**
             * deriveFontSize - Calculates the fontSize of a word based on its weight.
             *
             * @param  {number} relativeWeight The weight of the word, on a scale 0-1.
             * @return {number} Returns the resulting fontSize of a word.
             */
            deriveFontSize: function deriveFontSize(relativeWeight) {
                var maxFontSize = 25;
                return Math.floor(maxFontSize * relativeWeight);
            },
            drawPoints: function() {
                var series = this,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    chart = series.chart,
                    placed = [],
                    placementStrategy = series.placementStrategy[series.options.placementStrategy],
                    spiral = series.spirals[series.options.spiral],
                    rotation = series.options.rotation,
                    scale,
                    weights = series.points
                    .map(function(p) {
                        return p.weight;
                    }),
                    maxWeight = Math.max.apply(null, weights),
                    field = getPlayingField(xAxis.len, yAxis.len),
                    maxDelta = (field.width * field.width) + (field.height * field.height),
                    data = series.points
                    .sort(function(a, b) {
                        return b.weight - a.weight; // Sort descending
                    });
                each(data, function(point) {
                    var attempt = 0,
                        delta,
                        spiralIsSmallish = true,
                        placement,
                        clientRect,
                        rect;
                    point.relativeWeight = 1 / maxWeight * point.weight;
                    placement = placementStrategy(point, {
                        data: data,
                        field: field,
                        placed: placed,
                        rotation: rotation
                    });
                    if (!point.graphic) {
                        point.graphic = chart.renderer.text(point.name).css({
                            fontSize: series.deriveFontSize(point.relativeWeight),
                            fill: point.color,
                            fontFamily: series.options.fontFamily
                        }).attr({
                            x: placement.x,
                            y: placement.y,
                            'text-anchor': 'middle',
                            rotation: placement.rotation
                        }).add(series.group);
                        // Cache the original DOMRect values for later calculations.
                        point.clientRect = clientRect = extend({},
                            point.graphic.element.getBoundingClientRect()
                        );
                        point.rect = rect = extend({}, clientRect);
                    }
                    /**
                     * while w intersects any previously placed words:
                     *    do {
                     *      move w a little bit along a spiral path
                     *    } while any part of w is outside the playing field and
                     *        the spiral radius is still smallish
                     */
                    while (
                        (
                            intersectsAnyWord(point, placed) ||
                            outsidePlayingField(point, field)
                        ) && spiralIsSmallish
                    ) {
                        delta = spiral(attempt);
                        // Update the DOMRect with new positions.
                        rect.left = clientRect.left + delta.x;
                        rect.right = rect.left + rect.width;
                        rect.top = clientRect.top + delta.y;
                        rect.bottom = rect.top + rect.height;
                        spiralIsSmallish = (
                            Math.min(Math.abs(delta.x), Math.abs(delta.y)) < maxDelta
                        );
                        attempt++;
                    }
                    /**
                     * Check if point was placed, if so delete it,
                     * otherwise place it on the correct positions.
                     */
                    if (spiralIsSmallish) {
                        point.graphic.attr({
                            x: placement.x + (delta ? delta.x : 0),
                            y: placement.y + (delta ? delta.y : 0)
                        });
                        placed.push(point);
                    } else {
                        point.graphic = point.graphic.destroy();
                    }
                });
                /**
                 * Scale the series group to fit within the plotArea.
                 */
                scale = getScale(xAxis.len, yAxis.len, field, series);
                series.group.attr({
                    scaleX: scale,
                    scaleY: scale
                });
            },
            /**
             * Strategies used for deciding rotation and initial position of a word.
             * To implement a custom strategy, have a look at the function
             *     randomPlacement for example.
             */
            placementStrategy: {
                random: function randomPlacement(point, options) {
                    var field = options.field,
                        r = options.rotation;
                    return {
                        x: getRandomPosition(field.width) - (field.width / 2),
                        y: getRandomPosition(field.height) - (field.height / 2),
                        rotation: getRotation(r.orientations, r.from, r.to)
                    };
                }
            },
            /**
             * Spirals used for placing a word after the inital position experienced a
             *     collision with either another word or the borders.
             * To implement a custom spiral, look at the function archimedeanSpiral for
             *    example.
             */
            spirals: {
                'archimedean': archimedeanSpiral
            },
            getPlotBox: function() {
                var series = this,
                    chart = series.chart,
                    inverted = chart.inverted,
                    // Swap axes for inverted (#2339)
                    xAxis = series[(inverted ? 'yAxis' : 'xAxis')],
                    yAxis = series[(inverted ? 'xAxis' : 'yAxis')],
                    width = xAxis ? xAxis.len : chart.plotWidth,
                    height = yAxis ? yAxis.len : chart.plotHeight,
                    x = xAxis ? xAxis.left : chart.plotLeft,
                    y = yAxis ? yAxis.top : chart.plotTop;
                return {
                    translateX: x + (width / 2),
                    translateY: y + (height / 2),
                    scaleX: 1, // #1623
                    scaleY: 1
                };
            }
        };

        /**
         * Assemble the WordCloud series type.
         */
        H.seriesType('wordcloud', 'column', WordCloudOptions, WordCloudSeries);

    }(Highcharts));
}));

        var text="Java nullpointerexception python c++ Adaptive web Java Java Java Java Java Java Java Java nullpointerexception nullpointerexception python python matlab matlab matlab matlab python node angular node node node node node node node node react react react react react react react ni ni ni ni ruby ruby ruby express c c c c ni ni angular labview labview labview mongo";
        var text2="Java nullpointerexception python c++ Adaptive web Java Java Java Java Java Java Java Java nullpointerexception nullpointerexception python python matlab matlab matlab matlab python node angular node node node node node node node node react react react react react react react ni ni  ruby ruby ruby perl shell mongo"; 
         var data1 = text
        .split(',').join('') // remove commas
        .split('.').join('') // remove periods
        .split(' ') // split into words
        .reduce(function (arr, word) {
            var obj = arr.find(function (obj) {
                return obj.name === word;
            });
            if (obj) {
                obj.weight += 1;
            } else {
                obj = {
                    name: word,
                    weight: 1
                };
                arr.push(obj);
            }
            return arr;
        }, []);
        console.log(data1);
        scope5.items = data1;

        loadChart();
    });
      
      
    }


  }
})





