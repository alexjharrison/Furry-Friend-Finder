

module.exports = (app) => {

    var doggos = require("../data/doggos");
    var humanos = require("../data/humanos");
    var bodyParser = require("body-parser");
    var wtf = require("wtf_wikipedia");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/api/doggos", (req, res) => {
        res.json(doggos);
    });
    app.get("/api/humanos", (req, res) => {
        res.json(humanos);
    });

    app.post("/api/humanos",(req,res)=>{
        comparison(req.body,res);
    });

    app.post("/api/clear",(req,res)=>{
        humanos = [];
        res.json(humanos);
    });

    var comparison = (humano,res)=>{
        var humanTraits = Object.values(humano)[1];
        var humanName = Object.values(humano)[0];
        //returns array of % matches in order of breed
        
        
        var dogComparison = doggos.map(breed=>{
            var possibleDiff = 0;
            var realDiff = 0;

            traits = Object.values(breed);
            for(var i=2;i<traits.length;i++){
                if(!isNaN(humanTraits[i-2])){
                    possibleDiff += 4;
                    realDiff += 4 - Math.abs(traits[i] - humanTraits[i-2]);
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
            // console.log(topPercents,topIndices,i,dogComparison[i],lowestIndex,lowestPercent);
        }

        //wikipedia api call
        var getTraits = (index)=>{
            return Object.values(doggos[index]).splice(2);
        }
        wtf.fetch(doggos[topIndices[0]].name).then(doc=>{
            // console.log(doc.images(0).thumb(),doc.sections("").plaintext());
            var imageUrl = doc.images(0).thumb().replace("/thumb","");
            imageUrl = imageUrl.substring(0,imageUrl.lastIndexOf("/"));
            
            humanos.push({
                humanName: humanName,
                humanTraits: humanTraits,
                bestDogName: doggos[topIndices[0]].name,
                bestDogPercent: topPercents[0],
                bestDogPic: imageUrl,
                bestDogTraits: getTraits(topIndices[0]),
                bestDogWiki: doc.sections("").plaintext(),
                secondDogName: doggos[topIndices[1]].name,
                secondDogPercent: topPercents[1],
                secondDogPic: "http://www.dogbreedchart.com/img/" + doggos[topIndices[1]].id+".jpg",
                secondDogTraits: getTraits(topIndices[1]),
                thirdDogName: doggos[topIndices[2]].name,
                thirdDogPercent: topPercents[2],
                thirdDogPic: "http://www.dogbreedchart.com/img/" + doggos[topIndices[2]].id+".jpg",
                thirdDogTraits: getTraits(topIndices[2]),
                worstDogName: doggos[lowestIndex].name,
                worstDogPercent: lowestPercent,
                worstDogPic: "http://www.dogbreedchart.com/img/" + doggos[lowestIndex].id+".jpg",
                worstDogTraits: getTraits(lowestIndex),
            });
            res.json(humanos[humanos.length-1]);
        });
    }
}