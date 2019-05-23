var friends = require("../data/friend.js");

module.exports = function(app){

    app.get("/api/friend", function(req, res){
        res.json(friends);
    });

    app.post("/api/friend", function(req, res){
        var bestMatch = {
            name:"",
            photo:"",
            friendDifference: Infinity
        };

        console.log(req.body);

        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        var totalDifference = 0;

        for (var i = 0; i < friends.length; i++){
            console.log(friends[i]);
            totalDifference = 0;

            for(var j = 0; j < friends[i].scores[j]; j++){

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference){
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;

                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
}
