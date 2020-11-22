/*table of contents 
a. Global Variables: glossary, question
b. Object creation: glossary assigned to multidimensional object
c. Functions:
    -show
    -hide
    -cheatSheet
    -endGame
    -evaluate
    -questionTime
    -shuffle
    -reset
    -startGame
*/

var glossary, question = 0;

//funderade på möjligheten att tillåta olika svar, typ synonymer, eller även kolla efter svar som är nästan rätt för att kunna meddela det, samt tillåta svar oavsett gemener/versaler. För alla utom möjligen den sista är den enda lösningen jag kommit på att göra större objekt, säg att det finns en klass rättEng, en synoEng, ett par felstavEng. Fick för mig att kanske skulle kunna omvandla svaret till t.ex. uppercase och kolla det också på det sättet istället för att lägga till till objektet
glossary = [
    {
        "svenska": "plommonstop",
        "engelska": "bowler hat"
    },
    {
        "svenska": "fluga",
        "engelska": "bow tie"
    },
    {
        "svenska": "äppelknyckarbyxor",
        "engelska": "knickerbockers"
    },
    {
        "svenska": "portfölj",
        "engelska": "briefcase"
    },
    {
        "svenska": "strumpbyxa",
        "engelska": "pantyhose"
    },
    {
        "svenska": "damasker",
        "engelska": "gaiters"
    },
    {
        "svenska": "strumpeband",
        "engelska": "garter"
    },
    {
        "svenska": "cylinderhatt",
        "engelska": "top hat"
    },
    {
        "svenska": "basker",
        "engelska": "beret"
    },
    {
        "svenska": "stövletter",
        "engelska": "ankle boots"
    }
];


function show(element) { //Visa element
    "use strict";
    element.classList.toggle("show");
}


function hide(element) { //Dölj element
    "use strict";
    element.classList.remove("show");
}


function cheatSheet() {
    "use strict";
    var tasks, i = 0;

    tasks = document.getElementsByClassName("taskItem");
    for (i = 0; i < tasks.length; i += 1) {
        tasks[i].innerHTML = glossary[i].svenska + " = " + glossary[i].engelska;
        tasks[i].style.fontWeight = "bold";
        tasks[i].style.textTransform = "none";
        tasks[i].style.color = "#fff";
    }
}


function endGame() {
    "use strict";
    var solution, result, solutionBtn, newGameBtn, tasks, points, i = 0;

    //inaktivera nästa-knappen 
    document.getElementById("nextBtn").disabled = true;

    //kolla hur många rätta svar spelomgången har gett
    points = 0;
    tasks = document.getElementsByClassName("taskItem");
    for (i = 0; i < tasks.length; i += 1) {
        if (tasks[i].style.backgroundColor === "mediumseagreen") {
            points += 1;
        } else if (tasks[i].style.backgroundColor === "indianred") {
            console.log("wrong answer");
        } else {
            console.log("smthng went wrong");
        }
    }

    //skriv ut resultatet, bättre betyg om mer än hälften rätt
    solution = document.getElementById("facit");
    result = solution.children[0];
    if (points > 2) {
        result.innerHTML = "Bra jobbat!" + "</br>" + "Du fick " + points + " rätt av 5.";
    } else if (points < 3) {
        result.innerHTML = "Bättre lycka nästa gång." + "</br>" + "Du fick " + points + " rätt av 5.";
    }

    //visa facitknapp och omspelsknapp
    solutionBtn = solution.children[1];
    show(solutionBtn);
    newGameBtn = solution.children[2];
    show(newGameBtn);
}


function evaluate(currentQ, lastQ) {
    "use strict";
    var item, answer;
    item = lastQ.parentElement;

    //hämta + utvärdera svaret till föregående fråga
    answer = lastQ.children[1].value;

    if (answer === "0" || answer === "" || answer === null) {
        alert("Ange ett svar för att gå vidare!");
        return false;
    } else if (answer === glossary[question - 1].engelska) {
        //vid rätt svar, färga uppgiftslådan grön
        item.style.backgroundColor = "mediumseagreen";
    } else {
        //vid fel svar, färga uppgiftslådan röd
        item.style.backgroundColor = "indianred";
    }

    //gå vidare till nästa fråga
    if (question > 4) {
        //om sista frågan är besvarad, stäng den och avsluta
        hide(lastQ);
        endGame();
    } else {
        hide(lastQ);
        show(currentQ);
        question += 1;
    }
}


function questionTime() {
    "use strict";
    var showQ, currentQ, lastQ;

    //hämta den aktuella uppgiften
    showQ = document.getElementsByClassName("toggle");
    currentQ = showQ[question];
    lastQ = showQ[question - 1];

    if (question > 0 && question < 6) { //utvärdera svaren
        evaluate(currentQ, lastQ);
    } else if (question < 1) { //öppna första frågan
        show(currentQ);
        question += 1;
    }
}


function shuffle(glossary) { //Fisher-Yates (eller Knuths) metod https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    "use strict";
    var nrOfUnmixed = glossary.length,
        randomNr,
        swopValue;

    while (0 !== nrOfUnmixed) {
        randomNr = Math.floor(Math.random() * nrOfUnmixed);
        nrOfUnmixed -= 1;

        swopValue = glossary[nrOfUnmixed];
        glossary[nrOfUnmixed] = glossary[randomNr];
        glossary[randomNr] = swopValue;
    }
    return glossary;
}


function reset() { //En enkel reset-version så som beskrivs här: https://www.dummies.com/programming/programming-games/how-to-reset-your-html5-game/
    "use strict";
    //ladda om sidan för att spela igen
    document.location.href = "";
}


function startGame() {
    "use strict";
    var i = 0,
        glossaryParagraph,
        glossaryWord;

    //blanda om gloslistan slumpmässigt
    glossary = shuffle(glossary);

    //för in nya glosor till alla uppgifter
    glossaryParagraph = document.getElementsByClassName("pa");
    for (i = 0; i < 5; i += 1) {
        glossaryWord = document.createTextNode(glossary[i].svenska);
        glossaryParagraph[i].appendChild(glossaryWord);
    }

    //inaktivera startknappen
    document.getElementById("startBtn").disabled = true;

    //öppna frågorna
    questionTime();
}
