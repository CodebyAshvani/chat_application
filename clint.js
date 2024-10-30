const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // append

    appendMessage(msg, 'outgoing')
    textarea.value=''
    scrollToBottom()

    // send to srver 
    socket.emit('message', {
        user: name,
        message: message
    })

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//  recieve message

socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// auto scrolling down

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
