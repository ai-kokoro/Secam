window.onload = function () {
    let homePage = document.getElementById("begin"),
        gamePage = document.getElementById("game"),
        helpPage = document.getElementById("help"),
        playButtonClick = document.getElementById("playButton"),
        helpButtonClick = document.getElementById("helpButton"),
        helpBackButtonClick = document.getElementById("helpBack"),
        verifySolutionButtonClick = document.getElementById("verify");

    playButtonClick.addEventListener("click", function () {
        homePage.style.display = "none";
        gamePage.style.display = "block";
    });

    helpButtonClick.addEventListener("click", function () {
        homePage.style.display = "none";
        helpPage.style.display = "block";
    });

    helpBackButtonClick.addEventListener("click", function () {
        helpPage.style.display = "none";
        homePage.style.display = "block";
    });

    homePage.style.display = "none";
    gamePage.style.display = "block";

    let file = document.getElementById("file_btn");
    let help = document.getElementById("help_btn");


    file.addEventListener("click", function () {

    })

    let row0 = [],
        row1 = [],
        row2 = [],
        row3 = [],
        row4 = [],
        row5 = [];

    let col0 = [],
        col1 = [],
        col2 = [],
        col3 = [],
        col4 = [],
        col5 = [];

    function getID(e) {
        var x = e.target.id.toString();
        let input = document.getElementById(e.target.id).value;
        switch (x[0]) {
            case '0':
                row0.push(input);
                break;
            case '1':
                row1.push(input);
                break;
            case '2':
                row2.push(input);
                break;
            case '3':
                row3.push(input);
                break;
            case '4':
                row4.push(input);
                break;
            case '5':
                row5.push(input);
                break;
        }
        switch (x[1]) {
            case '0':
                col0.push(input);
                break;
            case '1':
                col1.push(input);
                break;
            case '2':
                col2.push(input);
                break;
            case '3':
                col3.push(input);
                break;
            case '4':
                col4.push(input);
                break;
            case '5':
                col5.push(input);
                break;
        }
    }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    let sections0 = [13, 6, 4, 5, 3, 10, 11, 7, 10, 11, 5, 7, 13, 9, 6, 6];

    let game0 = [['00', '01', '11'], ['02', '12'], ['03', '04'], ['05'], ['10', '20'], ['21', '30', '31'], ['22', '32', '33'],
    ['13', '23'], ['14', '15'], ['24', '25'], ['34', '35', '45'], ['40', '41'], ['42', '43', '44'], ['50', '51'], ['52', '53'], ['54', '55']];

    let colors0 = ['#ADD8E6', '#2a9d8f', '#e9c46a', '#6B8E23', '#e76f51', '#313e43',
        '#46726f', '#800000', '#A0522D', '#b47d74', '#FF6347', '#A0522D', '#F4A460', '#00C389', '#CD5C5C', '#1B8BBF'];


    /*     let border = (cells) => {
            for(let index = 0; index < cells.length; index++) {
                if(cells[index][0] === cells[++index][0]) {
                    //some row
                    cells[index].style.borderRight = "thick solid #0000FF"; 
                }
            }
        } */

    let g = document.getElementsByClassName("game")[0];

    let Div = (value1, value2) => {
        let obj = document.createElement("div");
        obj.setAttribute("class", value1);
        value2 == null ? obj.setAttribute("class", value1) : obj.setAttribute("id", value2);
        return obj;
    }

    class Cell {
        constructor(id) {
            this.id = id;
        }
        render() {
            let cell = Div("item", this.id);
            g.appendChild(cell);

        }
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let obj = new Cell(i + "" + j);
            obj.render();
        }

    }


    let border = (c1, c2) => {

        if (c1[0] === c2[0]) {
            //some row
            console.log("some row");
            document.getElementById(c1).style.borderRight = "none";
        }

    }

    border("00", "01");




    function addHint() {
        let c31 = document.getElementById("31");
        let c44 = document.getElementById("44");
        let c45 = document.getElementById("45");
        c31.value = 4;
        c44.value = 2;
        c45.value = 1;
        c31.disabled = "true";
        c44.disabled = "true";
        c45.disabled = "true";
    }

    addHint();

    function paintCell(game, color) {
        for (var cell = 0; cell < game.length; cell++) {
            document.getElementById(game[cell]).style.backgroundColor = color;
        }
    }

    function calculateSum(section, color) {
        let header = document.getElementsByTagName("header")[0];
        let span = document.createElement("span");
        let val = document.createTextNode(section);
        span.appendChild(val);
        span.style.color = color;
        header.appendChild(span);
    }

    function generate_game(table) {
        for (var section = 0; section < table.length; section++) {
            calculateSum(table[section], colors0[section]);
            paintCell(game0[section], colors0[section]);

        }
    }

    //  border(game0[0][0]);

    generate_game(sections0);

    function checkSection(section, numbers) {
        var sum = 0, s = 0;
        for (var index = 0; index < numbers.length; index++) {
            s += document.getElementById(numbers[index]).value;
        }
        for (var count = 0; count < s.length; count++) {
            sum += parseInt(s[count]);
        }
        return sum === section;
    }

    verifySolutionButtonClick.addEventListener("click", function () {
        var val = 0,
            message = document.getElementById("result-game"),
            inputs = document.getElementsByTagName("input");
        for (var count = 0; count < 16; count++) {
            if (checkSection(sections0[count], game0[count])) val++;
        }
        if (!hasDuplicates(row0) && !hasDuplicates(row1) && !hasDuplicates(row2)
            && !hasDuplicates(row3) && !hasDuplicates(row4) && !hasDuplicates(row5)
            && !hasDuplicates(col0) && !hasDuplicates(col1) && !hasDuplicates(col2)
            && !hasDuplicates(col3) && !hasDuplicates(col4) && !hasDuplicates(col5)
            && val === 16) {
            message.style.color = "#1b998b";
            message.style.fontSize = "18px";
            message.style.fontWeight = "bold";
            message.innerHTML = "Congratulations, you solved everything";
            for (var count = 0; count < inputs.length; count++) {
                inputs[count].disabled = "true";
            }
        } else {
            let tryAgainButtonClick = document.getElementById("repeat-game");
            message.style.fontSize = "18px";
            message.style.color = "#e63946";
            message.style.fontWeight = "bold";
            message.innerHTML = "Good try, but you failed!";
            verifySolutionButtonClick.style.display = "none";
            tryAgainButtonClick.style.display = "block";
            tryAgainButtonClick.addEventListener("click", function () {
                tryAgainButtonClick.style.display = "none";
                verifySolutionButtonClick.style.display = "block";
                for (var count = 0; count < inputs.length; count++) {
                    inputs[count].value = "";
                }
                addHint();
                message.innerHTML = "";
                row0.length = 0;
                row1.length = 0;
                row2.length = 0;
                row3.length = 0;
                row4.length = 0;
                row5.length = 0;
                col0.length = 0;
                col1.length = 0;
                col2.length = 0;
                col3.length = 0;
                col4.length = 0;
            });
        }
    });

    let textPlace = document.getElementById("help-text");
    let playDemoButton = document.getElementById("demo");

    playDemoButton.addEventListener("click", function playDemo() {
        helpBackButtonClick.style.display = "none";
        textPlace.style.display = "none";
        document.getElementById("demo-game").style.display = "block";
        playDemoButton.style.display = "none";
        let move1Button = document.getElementById("move1");
        move1Button.style.display = "block";
        move1Button.addEventListener("click", function () {
            document.getElementById("c5").innerHTML = 1;
            move1Button.style.display = "none";
            let move2Button = document.getElementById("move2");
            move2Button.style.display = "block";
            move2Button.addEventListener("click", function () {
                document.getElementById("c2").innerHTML = 2;
                move2Button.style.display = "none";
                let move3Button = document.getElementById("move3");
                move3Button.style.display = "block";
                move3Button.addEventListener("click", function () {
                    document.getElementById("c1").innerHTML = 1;
                    move3Button.style.display = "none";
                    let move4Button = document.getElementById("move4");
                    move4Button.style.display = "block";
                    move4Button.addEventListener("click", function () {
                        document.getElementById("c3").innerHTML = 3;
                        move4Button.style.display = "none";
                        let move5Button = document.getElementById("move5");
                        move5Button.style.display = "block";
                        move5Button.addEventListener("click", function () {
                            document.getElementById("c6").innerHTML = 2;
                            move5Button.style.display = "none";
                            let move6Button = document.getElementById("move6");
                            move6Button.style.display = "block";
                            move6Button.addEventListener("click", function () {
                                document.getElementById("c4").innerHTML = 3;
                                move6Button.style.display = "none";
                                let move7Button = document.getElementById("move7");
                                move7Button.style.display = "block";
                                move7Button.addEventListener("click", function () {
                                    document.getElementById("c9").innerHTML = 1;
                                    move7Button.style.display = "none";
                                    let move8Button = document.getElementById("move8");
                                    move8Button.style.display = "block";
                                    move8Button.addEventListener("click", function () {
                                        document.getElementById("c7").innerHTML = 2;
                                        move8Button.style.display = "none";
                                        let move9Button = document.getElementById("move9");
                                        move9Button.style.display = "block";
                                        move9Button.addEventListener("click", function () {
                                            document.getElementById("c8").innerHTML = 3;
                                            move9Button.style.display = "none";
                                            document.getElementById("finalDemoMessage").style.display = "block";
                                            helpBackButtonClick.style.display = "block";
                                            helpBackButtonClick.addEventListener("click", function () {
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


