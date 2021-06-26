export function Modal() {
    const modalWrapper = document.querySelector('.modal-wrapper')

    function open() {
        modalWrapper.classList.add('active')
    }
    function close() {
        document.querySelector('#passwd').value = ''
        modalWrapper.classList.remove('active')
    }

    return {
        open,
        close,
    }
}
