
//put AJAX requests in here
//DOM manipulation needs to be here

function onloadDom(){

    console.log(document.body);
    //function to fetch items from server and return a promise
    function fetchItems() {
        return fetch('/items')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching items:', error.message);
                throw error;
            })
    }
    
    //functin to add a new item on the server and return a promise
    function addItem(item) {
        return fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item added successfully:',data)
            })
            .catch(error => {
                console.error('Error adding item:', error.message);
                throw error;
            });
    }
    
    //function to refresh the item list on front end
    function refreshItemList() {
        fetchItems()
            .then(items => {
                const itemList = document.getElementById('itemList');
                itemList.innerHTML = items.map(item => `<li>${item.item_name}</li>`).join('');    
            })
            .catch(error => console.error('Error refreshing item list: ', error.message));
    }
    
    //Event listener for the form to add a new item
    document.getElementById('addItemForm').addEventListener('submit', function (event){
        event.preventDefault();
    
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemNotes = document.getElementById('itemNotes').value;
    
    
        console.log('Item Name:', itemName);
        console.log('Item Quantity:', itemQuantity);
        console.log('Item Notes:', itemNotes);
    
        //create an item object
        const newItem = { item_name: itemName, quantity: itemQuantity, notes: itemNotes };
    
        //post the new item to the server and refresh the item list
        addItem(newItem)
            .then(() => refreshItemList())
            .catch(error => console.error('Error adding and refreshing item list: ', error.message));
    })
    
    //call the function to refresh the itme list when the page loads
    refreshItemList();
}

document.addEventListener("DOMContentLoaded", (event) => {
    onloadDom();
    console.log('DOM loaded!')
})