// ====================================================================

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();


todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList(); /*was formally: createTodoItem(todoText);*/
        saveTodos();
        todoInput.value = ''; 
    }
}

function updateTodoList(){
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.appendChild(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoID = `todo-${todoIndex}`;
    const todoLI = document.createElement('li');
    const todoText = todo.text;

    todoLI.className = "todo";
    todoLI.innerHTML = `

        <input type="checkbox" id="${todoID}" />
        <label class="custom-checkbox" for="${todoID}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label> 
        <label class="todo-text" for="${todoID}">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
            
    `;
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', function(){
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}
 
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the quote container and button from my html file
  const quoteContainer = document.getElementById("quoteContainer");
  const quoteButton = document.getElementById("quoteButton");

  const quotes = [
    { quote: "Make the main thing the main thing.", name: "Stephen Covey" },
    { quote: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", name: "Stephen Covey" },
    { quote: "It's not enough to be busy, so are the ants. The question is, what are we busy about?", name: "Henry David Thoreau" },
    { quote: "The successful warrior is the average man, with laser-like focus.", name: "Bruce Lee" },
    { quote: "Focus on being productive instead of busy.", name: "Tim Ferriss" },
    { quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.", name: "Steve Jobs" },
    { quote: "Simplicity boils down to two steps: Identify the essential. Eliminate the rest.", name: "Leo Babauta" },
    { quote: "The shorter way to do many things is to only do one thing at a time.", name: "Mozart" },
    { quote: "Don't sweat the petty things and don't pet the sweaty things.", name: "George Carlin" },
    { quote: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", name: "Alexander Graham Bell" },
    { quote: "The successful man is the one who finds out what is the matter with his business before his competitors do.", name: "Roy L. Smith" },
    { quote: "You will never reach your destination if you stop and throw stones at every dog that barks.", name: "Winston Churchill" },
    { quote: "The more you eliminate the non-essential, the more you can focus on what really matters.", name: "Greg McKeown" },
    { quote: "The difference between successful people and very successful people is that very successful people say 'no' to almost everything.", name: "Warren Buffett" },
    { quote: "Do the hard jobs first. The easy jobs will take care of themselves.", name: "Dale Carnegie" },
    { quote: "The future depends on what you do today.", name: "Mahatma Gandhi" },
    { quote: "Lost time is never found again.", name: "Benjamin Franklin" },
    { quote: "Time is what we want most, but what we use worst.", name: "William Penn" },
    { quote: "I need schnacks.", name: "Emma Jane"},
    { quote: "Don't be shit.", name: "James Mooney"}
];

function getQuote() {
    // Pick a random index between 0 and quotes.length - 1
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Get the quote and name at the index of randomIndex
    const { quote, name } = quotes[randomIndex];

    // Replace the content of the quote container
    quoteContainer.innerHTML = `
    <p class="quoteText">${quote}</p>
    <p id="quoteName">- ${name}</p>
    `;
  }

  // Load a quote when the page first loads
  getQuote();

  // Change quote when the button is clicked
  quoteButton.addEventListener("click", getQuote);
});

// ====================================================================

// Function to update date and time every second
function updateDateTime() {
    const now = new Date();

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' };
    const dateString = now.toLocaleDateString('en-GB', options);
    const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const timeParts = timeString.split(':'); // ['HH', 'MM', 'SS']
    const hoursMinutes = `${timeParts[0]}:${timeParts[1]}`;
    const seconds = timeParts[2];

    document.getElementById('todaysDate').innerHTML = `<p> <span class="date">${dateString}</span></p>`;
    document.getElementById('currentTime').innerHTML = `${hoursMinutes}<span class="seconds">:${seconds}</span>`;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time immediately on page load
updateDateTime();

// ====================================================================