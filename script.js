const container = document.getElementById('container');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');

let questions = [{
  question: 'Which language runs in a web browser?',
  choices: ['Java', 'C', 'Python', 'JavaScript'],
  correctAnswer: 3
}, {
  question: 'What does CSS stand for?',
  choices: ['Central Style Sheets', 'Cascading Style Sheets', 'Cascading Simple Sheets', 'Cars SUVs Sailboats'],
  correctAnswer: 1
}, {
  question: 'What does HTML stand for?',
  choices: ['Hypertext Markup Language', 'Hypertext Markdown Language', 'Hyperloop Machine Language', 'Helicopters Terminals Motorboats Lamborginis'],
  correctAnswer: 0
}, {
  question: 'What year was JavaScript launched?',
  choices: ['1996', '1995', '1994', 'none of the above'],
  correctAnswer: 1
}]

let i = 0;
let NumberOfQuestions = questions.length;
let score = 0;

showNextQuestion();

submitBtn.addEventListener('click', showNextQuestion);

// Show Next Question
function showNextQuestion() {

  if ( i > NumberOfQuestions - 1 ) {
    checkAnswer(i);
    showResult();
  } else {
    checkAnswer(i);
    populateQuestion(i);
    i++;
  }
}

// Show Result
function showResult() {
  document.body.innerHTML = `
    <div class="container">
      <h3 class="result">You answered ${score} / ${NumberOfQuestions} questions correctly</h3>
      <button class="button" id="reload">Reload</button>
    </div>
    `
    setTimeout(() => {
      const reloadBtn = document.getElementById('reload');
      reloadBtn.addEventListener('click', reloadQuestions);
    },0)
}

// Reload Page
function reloadQuestions() {
  location.reload();
}

// Populate Questions
function populateQuestion(qNum) {
  questionEl.innerText = questions[qNum].question;
  choicesEl.innerText = '';
  for ( key in questions[qNum].choices ) {
    let choiceText = questions[qNum].choices[key];
    let radioBtnName = `question${qNum + 1}_choice`
    let indexOfKey = Object.keys(questions[qNum].choices).indexOf(key)
    choicesEl.appendChild(createLi(indexOfKey, radioBtnName, choiceText))
  }
}

// Populate List of Choices
function createLi(index, name, choiceText) {
  let list = document.createElement('li');
  let radioBtn = `
  <input type="radio" name="${name}" value="${index}" required>
  ${choiceText}
  `;
  list.innerHTML = radioBtn;
  return list;
}

// Calculate Score
function checkAnswer(qNum) {
  let inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if ( input.checked && +input.value === +questions[qNum -1].correctAnswer) {
        score++
      }
  })
  return score;
}