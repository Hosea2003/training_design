import Column from "./Column.js"

export default class Kanban{
    constructor(root){
        this.root=root

        Kanban.columns().forEach(element=>{
            const columnView = new Column(element.id, element.title)
            this.root.appendChild(columnView.elements.root)
        })
    }

    static columns(){
        return[
            {
                id:1,
                title:"Not started"
            },
            {
                id:2,
                title:"In progress"
            },
            {
                id:3,
                title:"Done"
            }
        ]
    }
}