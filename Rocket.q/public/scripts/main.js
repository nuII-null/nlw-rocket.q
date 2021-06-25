import { Modal } from './modal.js'

const modal = Modal()

const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButtons = document.querySelectorAll('.actions a.delete')

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')
const cancelButton = document.querySelector('.modal-wrapper .button.cancel')

function handleClick(event, check = true) {
    const actionText = check ? 'Marcar como lida' : 'Excluir'
    const roomId = document.querySelector('#room-id').dataset.id
    const questionId = event.target.dataset.id
    const actionType = check ? 'check' : 'delete'
    const form = document.querySelector('.modal form')

    form.setAttribute(
        'action',
        `/question/${roomId}/${questionId}/${actionType}`,
    )
    event.preventDefault()

    modalTitle.innerHTML = `${actionText} esta pergunta?`
    modalDescription.innerHTML = `Tem certeza que deseja ${actionText.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${actionText.toLowerCase()}`
    check
        ? modalButton.classList.remove('red')
        : modalButton.classList.add('red')

    modal.open()
}

checkButtons.forEach((button) => {
    button.addEventListener('click', handleClick)
})

deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => handleClick(event, false))
})

cancelButton.addEventListener('click', (event) => {
    modal.close()
})
