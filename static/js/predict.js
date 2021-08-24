d3.select("#btn-predict").on("click", ()=>{

    var period = d3.select("#period").node().value; 
    var shot_clock = d3.select("#shot_clock").node().value; 
    var dribbles = d3.select("#dribbles").node().value; 
    var touch_time = d3.select("#touch_time").node().value; 
    var shot_dist = d3.select("#shot_dist").node().value; 
    var pts_type = d3.select("#pts_type").node().value; 
    var close_def_dist = d3.select("#close_def_dist").node().value; 

    d3.json("/api/predict", {

        method: "POST",
        body: JSON.stringify({
            "period": period,
            "shot_clock": shot_clock,
            "dribbles": dribbles,
            "touch_time": touch_time,
            "shot_dist": shot_dist,
            "pts_type":pts_type,
            "close_def_dist":close_def_dist
          }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => {
        var prediction_output = d3.select("#prediction-output");
        console.log(response.prediction);

        if(response.prediction == "0"){
            prediction_output.text("You missed!"); 

        } else { 
            prediction_output.text("You made the shot!");
        }
    });
})