import Calendar from "./ui/Calendar.js";

const now = new Date()

const calendar = new Calendar()

const container = document.querySelector(".calendar-container")

container.appendChild(calendar.elements.root)
