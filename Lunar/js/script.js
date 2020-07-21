( function () {

//time control variable and orbit object variables. 
var zawarudo = 0;
var obj = $('.orbit');
var orby = document.getElementById("earth");
var plany = document.getElementById("idpos");

  //show buttons after needed time for css animation
  $('#play').delay(12000).show(0);   
  $('#stop').delay(12000).show(0);

  //initialize phase  jquery slider 
  $("#phase").slider({
      min: 0,
      max: 359,
      value: 0,
      step: 1,
      slide: function(event, ui) {
        // start.moon=ui.value;


        // requestAnimationFrame( lunarphase.animate );
        var test =  Math.floor(ui.value/3); //Math.floor(ui.value/3.6);
        test = (test / 10).toFixed(3);
        orby.style.setProperty('--delay', test+'s');
        plany.style.setProperty('--delay', test+'s');

        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else {  }
        mangle=((angle-180)%360);
        mangle = Math.abs(mangle);
        start.moon=mangle;
        phaseCount(mangle);
        requestAnimationFrame( lunarphase.animate );


      }
  });
  // moon phase visualizer in d3
  var lunarphase = {
    render: function () {
      startD3(); 
    }

  };
 //initial d3 values
 var start = {
      moon: 20
    }; 
    var speed = {};
    speed.moon = +0.3;
    var width = 170, height = 140; 



     lunarphase.render();

    lunarphase.animate = function () {
      lunarphase.updateMoonPhaseView();
    };


      requestAnimationFrame( lunarphase.animate )

 

// -------------------------------------------------------------------------


// draw the D3 componenents 
function startD3() {

  var tview = d3.select("#alternate-view")
            .append("g")
            .attr("id", "top-view");

  var lphase = {
    size: 50,
    main: '',
    proxy: ''
  
  };

  // this is the main visible moon 
  lphase.main = tview.append("circle").attr("id", "moon-white").attr("cx", width/2 ) 
                  .attr("cy", height/2 ).attr("r", lphase.size).style("fill", "white");
                  //.style("mask", "url(#moonmask)");
                              


  // proxy moon -> this will overlap the main moon to give the Moon phase visuals
  // inital proxy moon position will be to the right of the moon, revealing it completely
  
  var changepos = 2*lphase.size; 
  var basepos = width/2;

  lphase.proxy = tview.append("circle").attr("id", "moon-shadow").attr("cx", basepos + changepos )
                  .attr("cy", height/2 ).attr("r", lphase.size).style("fill", "black");

  lunarphase.updateMoonPhaseView = updateMoonPosition;
} 

    var month_time =1;

  function updateMoonPosition () {
    var ang = start.moon%360;
    var radian = (ang/360)*(2*Math.PI);

    // start.moon += speed.moon; 

    // update the shadow over the moon in the phase/time view
    var shadowmoon = {
      el: d3.select("#moon-shadow"),
      radius: 50,
      position: +d3.select("#moon-white").attr("cx")
    };

    // handle both sides
    var changepos = (ang - 180)/180 * ( 2*shadowmoon.radius ), ref_pos;  

    if (changepos < 0) {
      ref_pos = shadowmoon.position - 2*shadowmoon.radius;
    } else {
      ref_pos = shadowmoon.position + 2*shadowmoon.radius;
    }

    //var res=ref_pos - changepos;    //(ref_pos-changepos)/changepos*100.0;
    shadowmoon.el.attr("cx", ref_pos - changepos);
    // synodic timer control
    var syntime = (stime = +Math.ceil(29.5 - ((360-ang)/360)*29.5)) == 30 ? 29.5 : stime; 
var res;
//old code for illumination percent
// switch(true){
//     case (syntime==1):
//       res="0.0%";
//       break;
//     case (syntime==2):
//       res="8.2%";
//       break;
//     case (syntime==3):
//       res="14.7%";
//       break;
//     case (syntime==4):
//       res="21.1%";
//       break;
//     case (syntime==5):
//       res="28.9%";
//       break;
//     case (syntime==6):
//       res="35.2%";
//       break;
//     case (syntime==7):
//       res="41.1%";
//       break;
//     case (syntime==8):
//       res="48.4%";
//       break;            
//     case (syntime==9):
//       res="54.7%";
//       break;
//     case (syntime==10):
//       res="60.8%";
//       break;
//     case (syntime==11):
//       res="67.1%";
//       break;
//     case (syntime==12):
//       res="72.3%";
//       break;
//     case (syntime==13):
//       res="85.4%";
//       break;
//     case (syntime==14):
//       res="93.8%";
//       break;
//     case (syntime==15):
//       res="100.0%";
//       break;
//     case (syntime==16):
//       res="92.5%";
//       break;
//     case (syntime==17):
//       res="84.1%";
//       break;
//     case (syntime==18):
//       res="78.2%";
//       break;
//     case (syntime==19):
//       res="72.5%";
//       break;
//     case (syntime==20):
//       res="66.4%";
//       break;
//     case (syntime==21):
//       res="60.6%";
//       break;
//     case (syntime==22):
//       res="54.8%";
//       break;
//     case (syntime==23):
//       res="47.2%";
//       break;
//     case (syntime==24):
//       res="40.9%";
//       break;
//     case (syntime==25):
//       res="33.4%";
//       break;
//     case (syntime==26):
//       res="26.0%";
//       break;
//     case (syntime==27):
//       res="19.8%";
//       break;
//     case (syntime==28):
//       res="12.9%";
//       break;
//     case (syntime==29):
//       res="6.3%";
//       break;
//     case (syntime==29.5):
//       res="0.0%";
//       break;
// }

    if(syntime!=29.5){
          if(syntime!=29){
      d3.select("#phase-timer")
        .text("Number of Days " + syntime);
          }
    }



        //       d3.select("#lum")
        // .text("Percent illuminated " + res);



  }
 
  // End of D3

 var sinput = document.getElementById('phase');

  sinput.addEventListener('input', function(e) {
      variable.textContent = sinput.value;
  });



  //interval timer for tracking position and updating on play
  setInterval(function(){
    if(zawarudo == 0){
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else {  }
        mangle=((angle-180)%360);
        mangle = Math.abs(mangle);
        start.moon=mangle;
        requestAnimationFrame( lunarphase.animate )
        $('#phase').slider( "value", mangle );
        phaseCount(mangle);
    }
  }, 350);

  //handles pause, still messing with
  document.getElementById("stop").addEventListener("click", function() {
    removeUnwantedClasses();
    zawarudo = 1;
    $('.orbit').css('animation-play-state', 'paused');
    $('.pos').css('animation-play-state', 'paused');
    // $("#phase").slider('value',0);
        // requestAnimationFrame( lunarphase.animate );
        var test = 0.1;
        orby.style.setProperty('--delay', test+'s');
        plany.style.setProperty('--delay', test+'s');

        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else {  }
        mangle=((angle-180)%360);
        mangle = Math.abs(mangle);
        start.moon=mangle;
        phaseCount(mangle);
        requestAnimationFrame( lunarphase.animate );
  });

  //handles play
  document.getElementById("play").addEventListener("click", function() {
    removeUnwantedClasses();
    $('.orbit').css('animation-play-state', 'running');
    $('.pos').css('animation-play-state', 'running');
    zawarudo = 0;
  });

  //old, unsure if this is needed but i'm leaving it
  function removeUnwantedClasses() {
      $('#earth').removeClass('moon-paused').removeClass('moon-paused-play');
      $('#earth').removeClass('moon-full').removeClass('moon-full-play');
      $('#earth').removeClass('moon-waxinggibbous').removeClass('moon-waxinggibbous-play');
      $('#earth').removeClass('moon-firstquarter').removeClass('moon-firstquarter-play');
      $('#earth').removeClass('moon-waxingcrescent').removeClass('moon-waxingcrescent-play');
      $('#earth').removeClass('moon-new').removeClass('moon-new-play');
      $('#earth').removeClass('moon-waningcrescent').removeClass('moon-waningcrescent-play');
      $('#earth').removeClass('moon-thirdquarter').removeClass('moon-thirdquarter-play');
      $('#earth').removeClass('moon-waninggibbous').removeClass('moon-waninggibbous-play');
  }
  //changes text in phase boxes based on ranges
  function phaseCount(phase) {
    switch(true){
      case (phase < 45):
        $('#curphase').text('Name of Lunar Phase: New Moon');
            $('#curphase2').text('Lunar Phase-New Moon');

        break;
      case (phase < 90):
        $('#curphase').text('Name of Lunar Phase: Waxing Crescent');
            $('#curphase2').text('Lunar Phase-Waxing Crescent');

        break;
      case (phase < 135):
        $('#curphase').text('Name of Lunar Phase: First Quarter');
        $('#curphase2').text('Lunar Phase-First Quarter');

        break;
      case (phase < 175):
        $('#curphase').text('Name of Lunar Phase: Waxing Gibbous');
            $('#curphase2').text('Lunar Phase-Waxing Gibbous');

        break;
      case (phase < 225):
        $('#curphase').text('Name of Lunar Phase: Full Moon');
            $('#curphase2').text('Lunar Phase-Full Moon');

        break;
      case (phase < 270):
        $('#curphase').text('Name of Lunar Phase: Waning Gibbous');
            $('#curphase2').text('Lunar Phase-Waning Gibbous');

        break;
      case (phase < 315):
        $('#curphase').text('Name of Lunar Phase: Third Quarter');
            $('#curphase2').text('Lunar Phase-Third Quarter');

        break;
      case (phase < 360):
        $('#curphase').text('Name of Lunar Phase: Waning Crescent');
            $('#curphase2').text('Lunar Phase-Waning Crescent');

        break;
    }
  }

} )();