(function(){
    if(!window.location.href.includes('https')){
        window.location.href = 'https://ashortly.herokuapp.com/'
    }
})()

const Shortener = (() => {
    const form = document.querySelector('form')
    const input = document.querySelector('.shortner__input')
    const linkArea = document.querySelector('.links')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const { value } = input
        const address = await axios.post('/',{url: value})
        showLink(address.data)
        input.value = ""
    })

    const shortenText = (text, size) => {
        if(text.length > size){
            return `${text.slice(0, size)}...`
        }

        return text
    }

    const copyToClipboard = async (event, url) => {
        const copiedBtn = document.querySelector('.button--copied')
        if(copiedBtn){
            copiedBtn.classList.remove('button--copied')
            copiedBtn.innerText = 'Copy'
        }
        await navigator.clipboard.writeText(url)
        event.target.classList.add('button--copied')
        event.target.innerText = "Copied!"
    }

    const createCopyLinkButton = (url) => {
        const btn = document.createElement('button')
        btn.innerText = "Copy"
        btn.addEventListener('click', (event) => copyToClipboard(event, url))
        return btn
    }

    const createLinkContainer = (child) => {
        const linkContainer = document.createElement('div')
        linkContainer.className = 'links--container'
        child.forEach(kid => linkContainer.appendChild(kid))
        return linkContainer
    }

    const showLink = (address) => {
        const newLink = document.createElement('a')
        const oldLinkText = document.createElement('p')
        const hr = document.createElement('hr')
        oldLinkText.innerText = shortenText(input.value, 24)
        newLink.href = `${window.location.origin}/go/${address.hash}`
        newLink.innerText = newLink.href
        newLink.target = "_blank"
        const copyBtn = createCopyLinkButton(newLink.href)
        const linkContainer = createLinkContainer([oldLinkText, hr, newLink, copyBtn])
        linkArea.appendChild(linkContainer)
    }

    return{}
})()

const mobileMenu = (() => {
    const menu = document.querySelector('.mobile-menu')
    const menuBtn = document.querySelector('.fa-bars')
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('visible')
    })

    window.addEventListener('click', (e) => {
        if(!menu.contains(e.target) && e.target !== menuBtn){
            menu.classList.remove('visible')
        }
    })
})()

