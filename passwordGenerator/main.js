const passwordInput=document.querySelector("#password"),
    rangeInput=document.querySelector("#range"),
    generateBtn=document.querySelector(".generateBtn"),
    copyIcon=document.querySelector(".copyIcon"),
    slideNumber=document.querySelector(".slider-number")

var range=8

const allCharacters="abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789$*!:;,?./§%µ£ù"

function generatePassowrd(){
    let newPassword=""
    for(var i=0; i<range; i++){
        let randomNumbers=Math.floor(Math.random() * allCharacters.length)
        var char=allCharacters[randomNumbers]
        newPassword+=char
    }
    passwordInput.value=newPassword
}


rangeInput.addEventListener("click", ()=>{
    range=rangeInput.value;
    slideNumber.innerText=range;
})

generateBtn.addEventListener("click", generatePassowrd)

copyIcon.addEventListener("click", ()=>{
    navigator.clipboard.writeText(passwordInput.value)
})