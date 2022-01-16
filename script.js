const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [] // pega as informações do banco "localStorange"
const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco)) // envia as informações para o banco "localStorange"


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label")
    item.classList.add ("todo_item") // "add" adicona classes
    item.innerHTML = `
        <label class="todo__item">
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
        </label>
    `
    document.getElementById("todoList").appendChild(item) // O comando ".appendChild(item)" adiciona o elemento "item" no "todoList"
}

const limparTarefas = () => { //para evitar duplicação
    const todoList = document.getElementById("todoList")
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice))
}


const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if(tecla === "Enter"){
        const banco = getBanco()
        banco.push({"tarefa": texto, "status": ""})
        setBanco(banco)
        atualizarTela()
        evento.target.value = "" //limpar o que foi digitado.
    }
}
const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice (indice,1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === "" ? "checked" : "" // "?" = "então"
    setBanco(banco)
    atualizarTela()
}
const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice
        atualizarItem (indice)
    }
}

document.getElementById("newItem").addEventListener("keypress", inserirItem)
document.getElementById("todoList").addEventListener("click", clickItem)
atualizarTela()