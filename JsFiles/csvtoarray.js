var list = [];
//var fileName = 'datafiles/'+ listName +'.json';//'artists'
$.getJSON('datafiles/artists.json', function (jd) {
    for (i = 0; i < jd.results.bindings.length; i++) {
        var parts = jd.results.bindings[i].person.value.split("/");
        var result = parts[parts.length - 1]; // Or parts.pop();
        list[i] = jd.results.bindings[i].personLabel.value + "(" + result + ")";
    }
});

function getartists() {
    return list;
}
    //
    //     var entityList = [];
    //     $.getJSON('datafiles/artists.json', function (jd) {
    //         for (i = 0; i < jd.results.bindings.length; i++) {
    //             var parts = jd.results.bindings[i].person.value.split("/");
    //             var result = parts[parts.length - 1]; // Or parts.pop();
    //             entityList[i] = jd.results.bindings[i].personLabel.value + "(" + result + ")";
    //         }
    // });


