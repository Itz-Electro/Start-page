class option {
    constructor(title, url) {
        this.title = title
        this.url = url
        let element = document.createElement('div')
        let element_select = document.createElement('h1')
        let element_title = document.createElement('h1')
        element.classList.add('option')
        element_select.classList.add('option-selector')
        element_title.classList.add('option-title')
        element_select.innerHTML = '>'
        element_title.appendChild(document.createTextNode(title))
        element.appendChild(element_select)
        element.appendChild(element_title)
        
        document.getElementById('options-menu').appendChild(element)
        // ^ THIS DOESNT WORK AHHHHHHHH WHY

        this.element = element
    }

    delete() {
        this.element.remove()
    }
}

function addOptionSeperator() {
    let element = document.createElement('div')
    element.classList.add('option-seperator')
    document.getElementById('options-menu').append(element)
}

export { option, addOptionSeperator } 