

module.exports = (app) => {

    var doggos = require("../data/doggos");
    var humanos = require("../data/humanos");
    var bodyParser = require("body-parser");
    var path = require("path");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/api/doggos", (req, res) => {
        res.json(doggos);
    });
    app.get("/api/humanos", (req, res) => {
        res.json(humanos);
    });

    app.post("/api/humanos",(req,res)=>{
        humanos.push(comparison(req.body));
        res.json(humanos[humanos.length-1]);
    })

    var comparison = (humano)=>{
        var humanTraits = Object.values(humano)[1];
        var humanName = Object.values(humano)[0];
        //returns array of % matches in order of breed
        



        //  SUPER BROKEN NEEDS REDONE
        var dogComparison = doggos.map(breed=>{
            var possibleDiff = 0;
            var realDiff = 0;

            traits = Object.values(breed);
            for(var i=2;i<traits.length;i++){
                if(!isNaN(humanTraits[i-2])){
                    possibleDiff += 5;
                    realDiff += 5 - Math.abs(traits[i] - humanTraits[i-2]);
                }
            }
            percentMatch = (realDiff / possibleDiff * 100).toFixed(2);
            return percentMatch;
        })

        
        

        //load first values into arrays

        //first,second,third place
        var topPercents = [dogComparison[0],dogComparison[0],dogComparison[0]]; 
        
        //first,second,third place
        var topIndices  = [0,0,0]; 
        
        //last place
        var lowestIndex = 0;       
        var lowestPercent = dogComparison[0];

        for(var i=1;i<dogComparison.length;i++){
            //new biggest
            thisDogPercent =  parseFloat(dogComparison[i]);
            bestDogPercent =  parseFloat(topPercents[0]);
            secondDogPercent =  parseFloat(topPercents[1]);
            thirdDogPercent =  parseFloat(topPercents[2]);
            worstDogPercent =  parseFloat(lowestPercent);

            if (thisDogPercent>bestDogPercent){
                topPercents.splice(2,1);
                topPercents.splice(0,0,dogComparison[i]);
                topIndices.splice(2,1);
                topIndices.splice(0,0,i);
            }
            //new second biggest
            else if (thisDogPercent>secondDogPercent){
                topPercents.splice(2,1);
                topPercents.splice(1,0,dogComparison[i]);
                topIndices.splice(2,1);
                topIndices.splice(1,0,i);
            }
            //new third biggest
            else if (thisDogPercent>thirdDogPercent){
                topPercents.splice(2,1,dogComparison[i]);
                topIndices.splice(2,1,i);
            }
            else if (thisDogPercent<worstDogPercent) {
                lowestIndex = i;
                lowestPercent = dogComparison[i];
            }
            console.log(topPercents,topIndices,i,dogComparison[i],lowestIndex,lowestPercent);
        }

        return {
            humanName: humanName,
            humanTraits: humanTraits,
            bestDog: doggos[topIndices[0]],
            bestDogPercent: topPercents[0],
            bestDogPic: "http://www.dogbreedchart.com/img/" + doggos[topIndices[0]].id+".jpg",
            secondDog: doggos[topIndices[1]],
            secondDogPercent: topPercents[1],
            secondDogPic: "http://www.dogbreedchart.com/img/" + doggos[topIndices[1]].id+".jpg",
            thirdDog: doggos[topIndices[2]],
            thirdDogPercent: topPercents[2],
            thirdDogPic: "http://www.dogbreedchart.com/img/" + doggos[topIndices[2]].id+".jpg",
            worstDog: doggos[lowestIndex],
            worstDogPercent: lowestPercent,
            worstDogPic: "http://www.dogbreedchart.com/img/" + doggos[lowestIndex].id+".jpg",
        }
    }
}