function albumreq (qid) {
    function makeSPARQLQuery(endpointUrl, sparqlQuery, doneCallback) {
        var settings = {
            headers: {Accept: "text/csv"},
            data: {query: sparqlQuery}
        };
        return $.ajax(endpointUrl, settings).then(doneCallback);
    }

    var regExp = /\(([^)]+)\)/;
    var identifier = regExp.exec(qid);
    var qID = identifier[1]

    var endpointUrl = 'https://query.wikidata.org/sparql',
        sparqlQuery = "SELECT ?album ?albumLabel WHERE {\n" +
            "?album wdt:P31/wdt:P279* wd:Q482994 ;\n" +
            "   wdt:P175 wd:"+qID+" .  \n" +
            "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" }\n" +
            "}";

    var albumlist = [];
    makeSPARQLQuery(endpointUrl, sparqlQuery, function (data) {

            //    var name = qid.substring(0, qid.indexOf("("));

            var d = d3.csvParse(data);

            var nested_data = d3.nest()
                //.key(function(d) { return "entity"; })
                .entries(d);

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"value":/g, '"name":')

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"key":/g, '"name":')

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"values":/g, '"children":')

            nested_data = nested_data.replace("\"data\":", "\"name\":\"" + name + "\",\n\"children\":");

            nested_data = JSON.parse(nested_data)

            nested_data = JSON.stringify(nested_data, null, 2).replace(/"data":/g, '"children":')

            nested_data = JSON.parse(nested_data)

            console.log(nested_data);

            for (var i = 0; i < nested_data.length; i++) {
                albumlist[i] = nested_data[i].albumLabel;
            }

            /*const db = firebase.database();

            var usersRef = db.ref('/artist');
            const normalUsersRef = usersRef.child('normal_users');
            const superUsersRef = usersRef.child('super_users');

            usersRef.child(qid).once('value', function(snapshot) {

                var exists = (snapshot.val() !== null);

                if (exists) {
                    console.log("artist already exists")
                } else {
                    console.log("artist doesn't exist exists")
                    usersRef.child(qid).set({works: nested_data,});
                    console.log("artist added")
                }
            });
            return nested_data;*/

        }
    );
return albumlist;
}