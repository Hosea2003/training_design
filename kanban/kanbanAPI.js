export default class KanbanAPI{
    static getItems(columnId) {
        const column = read().find(c=>c.id==columnId);
        if(!column)return []
        return column.items
    }

    static insertItem(columnId, content){
        const data =read()
        const column = data.find(c=>c.id==columnId)
        const item={
            id:Math.floor(Math.random()*1000000),
            content:content
        }

        if(!column){
            throw new Error("Column not found")
        }

        column.items.push(item)

        save(data)

        return item
    }

    static updateItem(itemId, newProps){
        const data= read()
        const [item, current_column]=(()=>{
            for(const column of data){
                const item=column.items.find(i=>i.id==itemId)
                if(item){
                    return [item, column]
                }
            }
            return [null, null]
        })()

        if(!item)
            throw new Error("No item found")

        item.content=newProps.content!==undefined?newProps.content:item.content

        if(
            newProps.columnId!==undefined &&
            newProps.position!=undefined
        ){
            const targetColumn = data.find(column=>column.id==newProps.columnId)

            if(!targetColumn)
                throw new Error("Target column not found")

            // delete item from current_column
            current_column.items.splice(current_column.items.indexOf(item), 1)

            // Move item into new position
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data)
    }

    static deleteItem(itemId){
        const data= read()
        for(const column of data){
            const item = column.items.find(i=>i.id==itemId)

            if(!item)
                continue;

            column.items.splice(column.items.indexOf(item), 1);
        }

        save(data)
    }
}

function read(){
    const data = localStorage.getItem("kanban-data")
    if(!data){
        return [
            {
                id:1,
                items:[]
            },
            {
                id:2,
                items:[]
            },
            {
                id:3,
                items:[]
            }
        ]
    }
    return JSON.parse(data)
}

function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}