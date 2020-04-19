var subject="";
var entity="";
function chooseSubject(){
    var err = document.getElementById('err');
    if (err) {
        err.parentNode.removeChild(err);
    }
    var subjects = document.getElementById("subjects");
    subject = subjects.value;
    if(subject === "Music"){
        document.getElementById('command').innerHTML = '<h1>Please Choose Artist</h1>';
        var searchContainer = document.getElementById("search");
        searchContainer.innerHTML ="<input id=\"searchEntity\" list=\"entities\" name=\"entity\" style=\" border-radius: 5px;width:200px; height:30px;\">" +
            "<datalist id=\"entities\">";
        searchContainer.innerHTML+="</datalist><input id=\"btn2\" type=\"submit\" onclick=\"chooseEntity()\" style=\" height:30px;border-radius: 5px;background: #7ea3d0; margin: 5px\" >";

        var entities = [];
        entities=getentity();
        console.log(entities)

        var list = document.getElementById('entities');

        entities.forEach(function(item){
            var option = document.createElement('option');
            option.value = item;
            list.appendChild(option);
        });

    }
    else if(subject === ""){
        return;
    }
    else{
        tryAgain();
    }
}
////////////
function chooseEntity(){
    entity = document.getElementById("searchEntity").value;
    console.log(entity);
    if(entity === "Bob Dylan"){
        var btn = document.getElementById("btn2");
        btn.remove();
        err = document.getElementById("err");
        if(err){
            err.remove();
        }
        createCheckBtns();
    }
    else{
        tryAgain()
    }
}

///////////////
function tryAgain() {
    err = document.getElementById("err");
    if(err){
        err.remove();
    }
    var errorDiv = document.createElement("div");
    errorDiv.id = "err";
    errorDiv.style.textAlign = 'center';
    var errorContent1 = document.createTextNode("Your Choice Is Currently Unavailable");
    errorDiv.appendChild(errorContent1);// add the text node to the newly created div
    var linebreak = document.createElement('br')
    errorDiv.appendChild(linebreak);
    var errorContent2 = document.createTextNode("Please Try Again");
    errorDiv.appendChild(errorContent2);
    var currentDiv = document.getElementsByClassName("content");// add the newly created element and its content into the DOM
    document.body.appendChild(errorDiv, currentDiv);
}
//////////////////
function createCheckBtns(){
    //generate command for user
    var checkDiv = document.createElement("div");
    checkDiv.id = "checkDiv";
    checkDiv.style.textAlign = 'center';
    var currentDiv = document.getElementsByClassName("content");// add the newly created element and its content into the DOM
    document.body.appendChild(checkDiv, currentDiv);
    // /////
    checkBtn = document.getElementById('checkDiv');
    checkBtn.innerHTML = '<h4>Are You Interested in</h4>';// +
    checkBtn.innerHTML+="<input id=\"work\" value='work content' type=\"submit\" onclick=\"entityWork()\" style=\" height:30px;border-radius: 5px;background: #7ea3d0; margin: 5px\" >";
    checkBtn.innerHTML+="or";
    checkBtn.innerHTML+="<input id=\"personal\" value='personal content' type=\"submit\" onclick=\"entityPesonal()\" style=\" height:30px;border-radius: 5px;background: #7ea3d0; margin: 5px\" >";
}
function entityWork(){
    //
    checker = document.getElementById("checkDiv");

    if(checker){
        checker.remove();
    }
    document.getElementById('command').innerHTML = '<h1>Choose Desired Work</h1>';
    var searchContainer = document.getElementById("search");
    searchContainer.innerHTML ="<input id=\"searchWork\" list=\"works\" name=\"work\" style=\" border-radius: 5px;width:200px; height:30px;\">" +
        "<datalist id=\"works\">";
    searchContainer.innerHTML+="</datalist><input id=\"worksBtn\" type=\"submit\" onclick=\"chooseWork()\" style=\" height:30px;border-radius: 5px;background: #7ea3d0; margin: 5px\" >";
    var works = ["song1","song2","song3","album1","album2","album3"];

    var list = document.getElementById('works');

    works.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item;
        list.appendChild(option);
    });
}
function chooseWork() {
    work = document.getElementById("searchWork").value;
    console.log(work);
    if(work === "song1"){
        var worksBtn = document.getElementById("worksBtn");
        worksBtn.remove();
        err = document.getElementById("err");
        if(err){
            err.remove();
        }
        document.getElementById('mainPage').innerHTML = '<h1>Show Work</h1>';
    }
    else{
        tryAgain()
    }


}
function entityPesonal(){
    checker = document.getElementById("checkDiv");
    if(checker){
        checker.remove();
    }
    document.getElementById('mainPage').innerHTML = '<h1>Show Personal Content</h1>';
}

