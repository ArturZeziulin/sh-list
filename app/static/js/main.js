const listItemsWrapper = document.getElementById('listItemsWrapper');
const listItems = document.getElementById('listItems');
const checkboxShowComplited = document.getElementById('checkboxShowComplited');

window.onload = function() {
    showHideListItems();
}

checkboxShowComplited.onchange = function() {
    showHideListItems();   
}

listItems.onclick = function(e) {
    let list_item = e.target.closest('.list-group-item');
    let dbListId = list_item.getAttribute('dbListId');
    if (e.target.closest('.delete_list_item') != null) {
        fetch('/delete_list/' + dbListId).then((response) => {
            if (response.status = 200){
                response.text().then((results) => {
                    if (results == '1') {
                        document.querySelector('[dbListId="' + dbListId + '"]').remove();
                        showHideListItems(); 
                    }
                })
            }
        })
    }
}

function showHideListItems(){
    let messageNoItems = document.getElementById('messageNoItems');
    let messageAllComplited = document.getElementById('messageAllComplited');

    if (messageNoItems) { messageNoItems.remove() };
    if (messageAllComplited) { messageAllComplited.remove() };
    
    if (listItems.hasChildNodes()) {
        let allItems = 0;
        let allMarkedItems = 0;
        let children = listItems.childNodes;
        for (let i = 0; i < children.length; ++i) {
            if (children[i].nodeType == 1) {
                let isMarked = children[i].getAttribute('isMarked')
                allItems += 1;
                if (isMarked == '1') {
                    allMarkedItems += 1;  
                    if (checkboxShowComplited.checked) {
                        children[i].style.display = "block";
                    } else {
                        children[i].style.display = "none";
                    }
                }
            }
        }

        if (allItems == 0) {
            let div = document.createElement('div');
            div.id = "messageNoItems";
            div.className = "d-flex text-secondary text-center justify-content-center mt-2";
            div.textContent = "There's nothing here yet. Click the 'New list'.";
            listItemsWrapper.appendChild(div);
            listItems.style.display = "none";

        } else if (allMarkedItems == allItems && !checkboxShowComplited.checked) {
            let div = document.createElement('div');
            div.id = "messageAllComplited";
            div.className = "d-flex text-secondary text-center justify-content-center mt-2";
            div.textContent = "All lists are completed. To see completed lists, click on Show complited.";
            listItemsWrapper.appendChild(div);
            listItems.style.display = "none";

        } else {
            listItems.style.display = "block";   
        }
    }
}