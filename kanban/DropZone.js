import KanbanAPI from "./kanbanAPI.js"

export default class DropZone{
    static createRoot(){
        const range = document.createRange()

        range.selectNode(document.body)

        const dropzone= range.createContextualFragment(`
            <div class="kanban__dropzone">
            </div>
        `).children[0]

        dropzone.addEventListener("dragover", e=>{
            e.preventDefault()
            dropzone.classList.add("kanban__dropzone-active")
        })

        dropzone.addEventListener("dragleave", e=>{
            e.preventDefault()
            dropzone.classList.remove("kanban__dropzone-active")
        })

        dropzone.addEventListener("drop",e=>{
            e.preventDefault()
            dropzone.classList.remove("kanban__dropzone-active")

            const columnElement = dropzone.closest(".kanban__column")
            const columnId=Number(columnElement.dataset.id)

            const dropzonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"))
            const dropzoneIndex = dropzonesInColumn.indexOf(dropzone)
            const itemId=Number(e.dataTransfer.getData("text/plain"))
            const dropedItem = document.querySelector(`[data-id="${itemId}"]`)

            if(dropedItem.contains(dropzone))return

            const insertAfter =dropzone.parentElement.classList.contains("kanban__input")? dropzone.parentElement:dropzone

            insertAfter.after(dropedItem)
            
            KanbanAPI.updateItem(itemId, {
                columnId,
                position:dropzoneIndex
            })
        })

        return dropzone;
    }
}