const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDescricao = document.querySelector('#m-descricao')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItemBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItemBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
  itens = getItemBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

loadItens()

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItemBD()
  loadItens()
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDescricao.value = itens[index].descricao
    sPreco.value = itens[index].preco
    id = index
  } else {
    sNome.value = ''
    sDescricao.value = ''
    sPreco.value = ''
  }
  
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDescricao.value == '' || sPreco.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].descricao = sDescricao.value
    itens[id].preco = sPreco.value
  } else {
    itens.push({'Nome': sNome.value, 'Descrição': sDescricao.value, 'Preço': sPreco.value})
  }

  setItemBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

