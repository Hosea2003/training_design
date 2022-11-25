import DropZone from "./DropZone.js"
import Item from "./Item.js"
import KanbanAPI from "./kanbanAPI.js"

export default class Column{
    constructor(id, title){
        const topDropZone =DropZone.createRoot()

        this.elements = {}
        this.elements.root=Column.createRoot()
        this.elements.title=this.elements.root.querySelector(".kanban__column-title")
        this.elements.items=this.elements.root.querySelector(".kanban__column-items")
        this.elements.addItem=this.elements.root.querySelector(".kanban__add-items")

        this.elements.items.appendChild(topDropZone)
    
        this.elements.root.dataset.id=id
        this.elements.title.textContent=title

        this.elements.addItem.addEventListener("click", ()=>{
            const item = KanbanAPI.insertItem(id, "")

            this.renderItem(item)
        })

        KanbanAPI.getItems(id).forEach(item=>{
            this.renderItem(item)
        })
    }

    static createRoot(){
        const range=document.createRange()

        range.selectNode(document.body)

        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items">
                </div>
                <button class="kanban__add-items">+ Add</button>
            </div>
        `).children[0]
    }

    renderItem(data){
        const item=new Item(data.id, data.content)
        this.elements.items.appendChild(item.elements.root)
    }
}