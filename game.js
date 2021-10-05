let score=0

const start = document.getElementById('start-button')
const chat = document.querySelector('.chat')

//Colors
const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const yellow = document.querySelector('.yellow')
const green = document.querySelector('.green')

green.addEventListener('click', ()=>{

    if(isBusy == true || colors.length<=0) { return }
    
    myColors.push('green')
    
    start.textContent=myColors.length+"/"+colors.length+" COLORS"

    checkCondition()

})

red.addEventListener('click', ()=>{

    if(isBusy == true || colors.length<=0) { return }

    myColors.push('red')

    start.textContent=myColors.length+"/"+colors.length+" COLORS"

    checkCondition()

})

yellow.addEventListener('click', ()=>{

    if(isBusy == true || colors.length<=0) { return }

    myColors.push('yellow')

    start.textContent=myColors.length+"/"+colors.length+" COLORS"

    checkCondition()

})

blue.addEventListener('click', ()=>{

    if(isBusy == true || colors.length<=0) { return }

    myColors.push('blue')
    
    start.textContent=myColors.length+"/"+colors.length+" COLORS"

    checkCondition()

})


const checkCondition = ()=>{


    if(myColors[myColors.length - 1] != colors[myColors.length - 1]){

        myColors[myColors.length - 1] = colors[myColors.length - 1]
        userLives--

        console.log('vidas: '+userLives)

        console.log('você perdeu')

        checkLives()

        if(userLives <= 0){
            
            eraseColor()

            chat.textContent = "[Machine Man]: Seems like you've lost all of your hearts... We can start again if you want to. Your score this time was: "+score+"."
            
            returnHome()

        }

        return

    }

    console.log('você acertou')

    if(myColors.length==colors.length){

        nextLevel()
    
    }

}

//

const returnHome = ()=>{

    start.textContent = "START"
    isBusy = false
    userLives=3
    colors = []
    myColors = [] 
    checkLives()
    
}

const quotes=[
    "We are just getting started.",
    "Hehe. It was easy, wasn't it?",
    "It is this easy before it gets harder. But you will always get better.",
    "If you keep track of what I say, you'll be good.",
    "A lot of it is trial and error, just like living! And you're quite good at this, right?",
    "Nothing like winning against a machine.",
    "Pretty bold of you to assume that... this game is easy.",
    "Your memory is a powerful tool. Use it wisely.",
]

const getQuote = ()=>{

    return quotes[Math.floor(Math.random() * (quotes.length))]

}

const nextLevel = ()=>{

    eraseColor()

    score++

    chat.textContent = "[Machine Man]: "+getQuote()
            
    start.textContent = "WAITING"

    isBusy = true

    setTimeout(()=>{
        colors = []
        myColors = []
        match()
    },4500)

}

//Three hearts
let userLives=3

const lives = [

    heartOne = document.getElementById('heart-one'),
    heartTwo = document.getElementById('heart-two'),
    heartThree =  document.getElementById('heart-three')

]

const checkLives = ()=>{
    for(let i in lives){

        if((parseInt(i)+1) <= userLives){
            lives[i].hidden="" 
        }
    
        if((parseInt(i)+1) > userLives){
            lives[i].hidden="true" 
        }
    
    }
}

//


let colors = []
let myColors = [] 
let isBusy=false//para checar se o botão start pode ser pressionado

const nextColor = () => new Promise ((resolve,reject)=>{

    let timer = 2500

    if(colors.length <= 0){timer = 0} //Se for a primeira vez que o array colors é incrementado, é instantaneo.

    setTimeout(() => {
        resolve(Math.floor(Math.random() * 4).toFixed(0))
    }, timer)

})

let createColorElement = (color)=>{

    if(color == 0) {
        return cor = {
            name: 'green',
            element: '<div id="cor-chat" style="margin: 0 auto; border: 2px solid #ff7db1; width: 32px; height: 32px; border-radius: 25px; background-color:#94d9a7;"></div>'
        }
    } else if(color == 1){
        return  cor = {
            name: 'red',
            element: '<div id="cor-chat" style="margin: 0 auto; border: 2px solid #ff7db1; width: 32px; height: 32px; border-radius: 25px; background-color:#ffafa2;"></div>'
        }
    }
    else if(color == 2){
        return  cor = {
            name: 'yellow',
            element: '<div id="cor-chat" style="margin: 0 auto; border: 2px solid #ff7db1; width: 32px; height: 32px; border-radius: 25px; background-color:#ffe37e;"></div>'
        }
    }
    else if(color == 3){
        return cor = {
            name: 'blue',
            element: '<div id="cor-chat" style="margin: 0 auto; border: 2px solid #ff7db1; width: 32px; height: 32px; border-radius: 25px; background-color:#b5d5eb;"></div>'
        }
    }

}


//apaga as cores que foram exibidas no "chat" anteriormente.
const eraseColor = ()=>{ 
    const corChat = document.getElementById('cor-chat')
    if(corChat != undefined){corChat.parentNode.removeChild(corChat)}
}

const match = async () =>{

    isBusy = true

    for(var i=0; i <= 6; i++){

        chat.textContent=""

        const newColor = await nextColor()

        let cor = createColorElement(newColor)

        eraseColor()

        chat.insertAdjacentHTML('afterend',cor.element)

        colors.push(cor.name)

        start.textContent=myColors.length+"/"+colors.length+" COLORS"

    }

    setTimeout(()=>{
        eraseColor()
        chat.textContent="[Machine Man]: It's your turn."
        isBusy = false
    },2500)

}

start.addEventListener('click', ()=>{

    if(isBusy == true || colors.length>0) { 
        
        console.log('tentou clicar mas está ocupado')
        return

    }

    document.querySelector('.chat').textContent=""
    
    match()
    
    //const chat = document.querySelector('.chat').insertAdjacentHTML('afterend','')
 
    //const cor = document.getElementById('cor')
    //cor.parentNode.removeChild(cor)
    

})