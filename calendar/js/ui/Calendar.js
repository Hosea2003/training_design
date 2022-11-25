export default class Calendar{
    constructor(){
        this.current_year=new Date().getFullYear()
        this.current_month = new Date().getMonth()

        this.elements={}
        this.elements.root=Calendar.createRoot()
        this.elements.days = this.elements.root.querySelector(".days")
        this.elements.month = this.elements.root.querySelector(".current-date");
        this.elements.prevNext = this.elements.root.querySelectorAll(".icon")
        this.selectedDate = new Date()
        this.selected =null

        this.renderCalendar()
        
        this.elements.prevNext.forEach(icon=>{
            icon.addEventListener("click", ()=>{
                this.current_month=icon.id==="previous"?this.current_month-1:this.current_month+1

                if(this.current_month < 0 || this.current_month >11){
                    const date = new Date(this.current_year, this.current_month)
                    this.current_year=date.getFullYear()
                    this.current_month=date.getMonth()
                }

                this.renderCalendar()
            })
        })

    }

    renderCalendar(){
        this.changeCurrent()
        this.populateDays()
        this.defaultSelect()
    }

    populateDays(){
        const lastDate = new Date(this.current_year, this.current_month+1, 0).getDate()
        const previousLast = new Date(this.current_year, this.current_month, 0).getDate()
        const firstDate = new Date(this.current_year, this.current_month, 1).getDay()
        const lastDayOfMonth = new Date(this.current_year, this.current_month, lastDate).getDay()

        this.elements.days.innerHTML=""

        for(let i=firstDate; i>0; i--){
            this.elements.days.innerHTML+=`
            <li class="inactive">${previousLast-i+1}</li>
            `
        }

        for(let i=1;i<=lastDate;i++){
            this.elements.days.innerHTML+=`
                <li class="day">${i}</li>
            `
        }

        for(let i=lastDayOfMonth; i<6; i++){
            this.elements.days.innerHTML+=`
                <li class="inactive">${i - lastDayOfMonth +1 }</li>
            `
        }

        // Add click event to active date
        this.elements.root.querySelectorAll(".day").forEach(day=>{
            day.addEventListener("click", ()=>{
                this.selected.classList.remove("active")
                day.classList.add("active")
                this.selected = day
                this.selectedDate=new Date(this.current_year, this.current_month, day.textContent)
            })
        })
    }

    defaultSelect(){
        const now = this.selectedDate
        if(now.getMonth()==this.current_month && this.current_year==now.getFullYear()){
            const days = Array.from(this.elements.days.querySelectorAll(".day"))
            days[now.getDate()-1].classList.add("active")
            this.selected=days[now.getDate()-1]
        }
    }

    changeCurrent(){
        const months=["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"
    ]

        this.elements.month.textContent=months[this.current_month]+" "+this.current_year
    }

    static createRoot(){
        const range=document.createRange()
        
        range.selectNode(document.body)

        return range.createContextualFragment(`
            <div class="calendar-component">
                <div class="header">
                    <div class="current-date">November 2022</div>
                    <div class="icons">
                        <i class="fa fa-chevron-left icon" id="previous"></i>
                        <i class="fa fa-chevron-right icon" id="next"></i>
                    </div>
                </div>
                <div class="calendar">
                    <ul class="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="days">

                    </ul>
                </div>
            </div>
        `).children[0]
    }
}