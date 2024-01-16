import { option, addOptionSeperator } from './scripts/options.js'
import { setCookie, getCookie } from './scripts/cookies.js'

//console.log(getCookie('bookmarks'))

let active_popup = null

let currentmenu = null
loadmenu('main')

function create_bookmark() {
    let name = document.getElementById('bm-nameinput').value
    let url = document.getElementById('bm-urlinput').value
    console.log(name,url)
    let urlcheck = 'https://'
    if (urlcheck != url.slice(0,urlcheck.length)) {
        url = urlcheck+url
    }
    console.log(name,url)
    let bookmarksList = getCookie('bookmarks')
    bookmarksList.push({'name':name,'url':url})
    let json_str = JSON.stringify(bookmarksList);
    setCookie('bookmarks', json_str)
}

function delete_bookmark(name) {
    if (!confirm(`Delete bookmark: ${name}?`)) {return}
    let bookmarksList = getCookie('bookmarks')
    let index = bookmarksList.findIndex(obj => obj.name === name);
    if (index !== -1) {
        bookmarksList.splice(index, 1);
    }
    let json_str = JSON.stringify(bookmarksList);
    setCookie('bookmarks', json_str)
}

document.getElementById('bm-cancel').addEventListener('click', () => {popup(null)})
document.getElementById('bm-create').addEventListener('click', () => {
    create_bookmark()
    popup(null)
    loadmenu('bookmarks')
})

function popup(popup) {
    if (popup==null) {
        let allpopups = document.getElementsByClassName('popup')
        for (var i=0;i<allpopups.length;i++) {
            allpopups[i].classList.remove('active')
        }
        active_popup = null
        return
    }
    if ( popup == 'createbookmark' ) {
        let popup = document.getElementById('add-bookmark')
        popup.classList.add('active')
        active_popup = 'createbookmark'
        return
    }
    alert(`Popup "${popup}" attempted to open but does not exist`)
    return false
}

function stringToArray(string) {

}

/* Availiable menus:
main
bookmarks
tools
settings
*/

function loadmenu(menu) {
    currentmenu=menu
    document.getElementById('options-menu').innerHTML = null
    if ( menu == 'main' ) {
        let bookmarks = new option('Bookmarks')
        let tools = new option('Tools')
        let settings = new option('Settings')
        bookmarks.element.addEventListener('click', () => {
            if (active_popup==null){
                loadmenu('bookmarks')
            }
        })
        tools.element.addEventListener('click', () => {
            if (active_popup==null){
                loadmenu('tools')
            }
        })
        settings.element.addEventListener('click', () => {
            if (active_popup==null){
                loadmenu('settings')
            }
        })
        return true
    }
    if ( menu == 'bookmarks' ) {
        let back = new option('Back')
        back.element.addEventListener('click', () => {
            if (active_popup==null){
                loadmenu('main')
            }
        })
        let createBM = new option('Create bookmark')
        createBM.element.addEventListener('click', () => {
            if (active_popup==null){
                popup('createbookmark')
                //loadmenu('bookmarks')
            }
        })
        addOptionSeperator()

        let bookmarksList = getCookie('bookmarks')
        //bookmarksList = JSON.parse(`{"bookmarks":${bookmarksList}}`).bookmarks
        console.log(bookmarksList)
        bookmarksList.forEach(bookmark => {
            bookmark.option = new option(bookmark.name, bookmark.url)
            bookmark.option.element.addEventListener('click', () =>{
                if (active_popup==null){
                    location.assign(bookmark.option.url);
                }
            })
            bookmark.option.element.addEventListener('contextmenu', (e) =>{
                if (active_popup==null){
                    e.preventDefault()
                    delete_bookmark(bookmark.option.title)
                    loadmenu('bookmarks')
                }
            })
        });

        return true
    }
    
    alert(`Menu "${menu}" attempted to open but does not exist`)
    loadmenu('main')
    return false
}

