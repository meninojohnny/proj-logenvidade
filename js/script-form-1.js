async function getQuestions() {
    return fetch('../questions.json')
    .then(response => response.json())
    .then(data => {
        return data
    })
}

async function insertElementSpectoBtn() {
    var section = document.querySelector('#section')
    var questions = await getQuestions()
    for (var i = 0;i < questions.length; i++) {
        var aspect = questions[i]
        section.innerHTML += 
            `<div id="${i}" class="aspect-btn" onclick="showBox(id)"> 
                <h1>${aspect.aspect}</h1> 
                <img class="icon" id="box${i}" src="../images/chevron-down.svg" alt="">
            </div>`
        section.innerHTML += `<div id="aspect${i}" class="aspect"></div>`
        insertQuestions(questions[i].questions, i)
    }
}

function insertQuestions(questions, id) {
    var div = document.querySelector(`#aspect${id}`)
    for (var i = 0;i < questions.length;i++) {
        var question = questions[i]
        var alternatives = questions[i].alternatives
        div.innerHTML += `<h4>${question.question}</h4>`
        for (var j = 0;j < alternatives.length;j++) {
            div.innerHTML += 
                `<label for="aspect${id}-question${i}-alternativa${j}">
                    <input type="radio" id="aspect${id}-question${i}-alternativa${j}" name="aspect${id}-question${i}">
                    ${alternatives[j]}
                </label>`
        }
    }
}

function closeAllBoxs() {
    var boxs = document.querySelectorAll('.aspect')
    var icons = document.querySelectorAll('.icon')
    for (var i = 0;i < boxs.length;i++) {
        var box = boxs[i]
        var icon = icons[i]
        box.style.display = 'none'
        icon.src = '../images/chevron-down.svg' 
    }
}

var closeController = null

function showBox(id) {
    closeAllBoxs()
    if (closeController == id) {
        return;
    } else {
        var div = document.querySelector(`#aspect${id}`)
        var icon = document.querySelector(`#box${id}`)
        var open = div.style.display == "flex"
        div.style.display = "flex"
        icon.src = open ? "../images/chevron-down.svg" : "../images/chevron-up.svg"
        closeController = id
    }
}

insertElementSpectoBtn()