var nested_data=""
var res = "";
var promiseRes = ""

async function generalReq(qid,name) {
    function makeSPARQLQuery(endpointUrl, sparqlQuery, doneCallback) {
        var settings = {
            headers: {Accept: "text/csv"},
            data: {query: sparqlQuery}
        };
        return $.ajax(endpointUrl, settings).then(doneCallback);
    }

    // var regExp = /\(([^)]+)\)/;
    // var identifier = regExp.exec(qid);
    // var qID = identifier[1]

    var endpointUrl = 'https://query.wikidata.org/sparql',
        sparqlQuery = "PREFIX entity: <http://www.wikidata.org/entity/> \n" +
            "             \n" +
            "             SELECT ?propLabel ?valUrl ?val ?article\n" +
            "             WHERE\n" +
            "             { \n" +
            "             	hint:Query hint:optimizer 'None'\n" +
            "             	{	BIND(entity:"+qid+" AS ?valUrl) .\n" +
            "             	BIND(\"N/A\" AS ?propUrl ) .\n" +
            "             	BIND(\"Name\"@en AS ?propLabel ) .\n" +
            "                   entity:"+qid+" rdfs:label ?val .\n" +
            "                  \n" +
            "                     FILTER (LANG(?val) = \"en\")\n" +
            "             } \n" +
            "              \n" +
            "                UNION\n" +
            "                 {   BIND(entity:"+qid+" AS ?valUrl) .\n" +
            "                     BIND(\"AltLabel\"@en AS ?propLabel ) .\n" +
            "                     optional{entity:"+qid+" skos:altLabel ?val}.\n" +
            "                     FILTER (LANG(?val) = \"en\") \n" +
            "                 }\n" +
            "                 UNION\n" +
            "                 {   BIND(entity:"+qid+" AS ?valUrl) .\n" +
            "                     BIND(\"Description\"@en AS ?propLabel ) .\n" +
            "                     optional{entity:"+qid+" schema:description ?val}.\n" +
            "                     FILTER (LANG(?val) = \"en\") \n" +
            "                 }\n" +
            "               \n" +
            "               UNION\n" +
            "                     {	entity:"+qid+" ?propUrl ?valUrl .\n" +
            "             		?property ?ref ?propUrl .\n" +
            "             		?property rdf:type wikibase:Property .\n" +
            "             		?property rdfs:label ?propLabel.\n" +
            "                 	FILTER (lang(?propLabel) = 'en' )\n" +
            "                     filter  isliteral(?valUrl)\n" +
            "                     FILTER (!contains(str(?propLabel), \"ID\") )\n" +
            "                     FILTER (!contains(str(?propLabel), \"name\") )\n" +
            "                    FILTER (!contains(str(?propLabel), \"Identifier\") )\n" +
            "                     FILTER (!contains(str(?propLabel), \"ISNI\") )\n" +
            "                     FILTER (!contains(str(?propLabel), \"Libris-URI\") )\n" +
            "                     BIND(?valUrl AS ?val)\n" +
            "             	}\n" +
            "               UNION\n" +
            "             	{	entity:"+qid+" ?propUrl ?valUrl . \n" +
            "             		?property ?ref ?propUrl .\n" +
            "             		?property rdf:type wikibase:Property . \n" +
            "             		?property rdfs:label ?propLabel. \n" +
            "                  	FILTER (lang(?propLabel) = 'en' ) \n" +
            "                     filter  isIRI(?valUrl) \n" +
            "                     ?valUrl rdfs:label ?valLabel \n" +
            "             		FILTER (LANG(?valLabel) = \"en\") \n" +
            "                    BIND(CONCAT(?valLabel) AS ?val)\n" +
            "             	}\n" +
            "               OPTIONAL {\n" +
            "               ?article schema:about ?valUrl .\n" +
            "               ?article schema:inLanguage \"en\" .\n" +
            "                FILTER (SUBSTR(str(?article), 1, 25) = \"https://en.wikipedia.org/\")\n" +
            "             }\n" +
            "         }\n" +
            "      ORDER BY ?propLabel\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "";


    promiseRes =  makeSPARQLQuery(endpointUrl, sparqlQuery, function (data) {
            var str = "";
            // var name = qid.substring(0, qid.indexOf("("));
            // console.log(qid)
            /*var fixed = "\n\"fixed\":\"true\",\n" +
                "  \"x\":\" \",\n" +
                "  \"y\":\" \","*/
            var fixed = "\"fixed\":\"true\",";
            console.log(name)

            var d = d3.csvParse(data);

            nested_data = d3.nest()
                //.key(function(d) { return "entity"; })
                .key(function (d) {
                    return d.propLabel;
                })
                .key(function (d) {
                    return d.val;
                })
                .entries(d);

            nested_data = d3.hierarchy(nested_data, d.valueLabel)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"value":/g, '"name":')

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"key":/g, '"name":')

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"values":/g, '"children":')

            //nested_data = nested_data.replace("\"data\":", "\"name\":\""+name+"\"\n,"+fixed+"\n\"children\":");

            nested_data = nested_data.replace("\"data\":", "\"name\":\""+name+"\",\n\"children\":");

            console.log(nested_data)

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"data":/g, '"children":')

            nested_data = JSON.parse(nested_data)

            nested_data= JSON.stringify(nested_data, null, 2)

            str=nested_data;
        var currentDate=new Date();
        var month = currentDate.getMonth()+1
        console.log(month)
            const db = firebase.database();
            var usersRef =""

                usersRef = db.ref('/generalEntities');

            usersRef.child(name).once('value', function(snapshot) {

                var exists = (snapshot.val() !== null);

                if (exists) {
                    console.log("entity already exists")
                } else {
                    console.log("entity doesn't exist exists")
                    usersRef.child(name).set({general: str,monthDate:month});
                    console.log("entity added")
                }
            });
            return str;

        })
    // ).then(function (result) {
    //     res=result;
    //     return result
    // })
    // res = Promise.resolve(res)
    // console.log(res)
    // return res;
    return promiseRes;
}
