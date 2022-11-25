const body=document.querySelector("body"),
    sidebar=body.querySelector('.sidebar'),
    toggle=body.querySelector('.toggle'),
    serachBox=body.querySelector('.serach-box'),
    modeSwitch=body.querySelector('.toggle-switch'),
    modeText=body.querySelector('.mode-text')

function changeMode(){
    if(body.classList.contains("dark")){
        modeText.innerText="Light Mode"
    }else{
        modeText.innerText="Dark Mode"
    }
}
changeMode()

modeSwitch.addEventListener("click", ()=>{
    body.classList.toggle("dark")
    changeMode()
})

toggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close")
})