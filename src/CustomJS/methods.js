export function formatDate(date){
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
}

export const checkNameAvailability = (name) =>{
    const boards = JSON.parse(localStorage.getItem("boards"));
    let errorMessage = null

    // check if board name is invalid
    if(name === "") errorMessage = "Invalid board name"

    // Check if board with this name already exists
    boards.forEach((board) =>{
        if(board.name === name){
             errorMessage = "Board with this name already exists"
        }
    })
    return errorMessage
}