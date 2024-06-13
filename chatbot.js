// Get chatbot elements
const conversation = document.getElementById('conversation');
const additionalButtons = document.getElementById('additional-buttons');
const menuItems = document.getElementById('menu-items');
const finishOrderButton = document.getElementById('finish-order');
let checkoutButton = document.createElement('button');
checkoutButton.id = 'checkout-button';
checkoutButton.style.display = 'none';
checkoutButton.textContent = 'Check-out';
checkoutButton.onclick = checkoutOrder;
document.getElementById('chatbot').appendChild(checkoutButton);

let order = [];

// Function to handle button click and send message
function sendMessage(message) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // Add user input to conversation
    let userMessage = document.createElement('div');
    userMessage.classList.add('chatbot-message', 'user-message');
    userMessage.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${message}</p>`;
    conversation.appendChild(userMessage);

    // Generate chatbot response
    const response = generateResponse(message);

    // Add chatbot response to conversation
    let chatbotMessage = document.createElement('div');
    chatbotMessage.classList.add('chatbot-message', 'chatbot');
    chatbotMessage.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversation.appendChild(chatbotMessage);
    chatbotMessage.scrollIntoView({ behavior: "smooth" });
}

// Generate chatbot response function
function generateResponse(input) {
    switch (input) {
        case 'Menu':
            showAdditionalButtons(['Sliced Cakes', 'Beverages', 'Breakfast']);
            return 'You can order by choosing one of the following categories:';
        case 'Sliced Cakes':
            showMenuItems([
                { name: 'Chocolate Cake', price: 280 },
                { name: 'Vanilla Cake', price: 250 },
                { name: 'Red Velvet Cake', price: 180 },
                { name: 'Ube Cheesecake', price: 250 },
                { name: 'Dulce De Leche Cheesecake', price: 230 },
                { name: 'Blueberry Cheesecake', price: 300 },
                { name: 'Oreo Cheesecake', price: 220 },
                { name: 'Cashew Sans Rival Cake Tub', price: 260 },
                { name: 'Chocolate Deluxe Cake Tub', price: 270 },
                { name: 'Tiramisu Cake Tub', price: 180 }
            ]);
            return 'Here are our cake options:';
        case 'Beverages':
            showMenuItems([
                { name: 'Caffe Latte', price: 159 },
                { name: 'Cappuccino', price: 140 },
                { name: 'Latte', price: 120 },
                { name: 'Cold brew coffee', price: 130 },
                { name: 'Iced shaken espresso', price: 160 },
                { name: 'Mocha Frappuccino', price: 129 },
                { name: 'Cappuccino', price: 170 },
                { name: 'Iced latte', price: 130 },
                { name: 'Americano', price: 150 },
                { name: 'Caramel Frappuccino', price: 170 }
            ]);
            return 'Here are our coffee options:';
        case 'Breakfast':
            showMenuItems([
                { name: 'Mi’s Breakfast Platter', price: 180 },
                { name: 'Bacon Breakfast Platter', price: 180 },
                { name: 'French Toast', price: 159 },
                { name: 'Corned Beef Breakfast Platter', price: 240 },
                { name: 'Bacon Pesto', price: 130 },
                { name: 'Spanish Sardines', price: 250 },
                { name: 'Fried Rice', price: 99 },
                { name: 'Cheddar Ensaymada', price: 79 },
                { name: 'Spam, Egg & Cheese Muffin', price: 260 },
                { name: 'Waffle Sandwich – Bacon', price: 259 }
            ]);
            return 'Here are our breakfast options:';
        case 'Location':
            return 'Our location is Arellano St. #2024 Dagupan City, Pangasinan.';
        case 'Contact':
            return 'You can contact us at\n Number: 09123-124-23412\n Gmail: miscoffee@gmail.com';
        default:
            hideAdditionalButtons();
            hideMenuItems();
            return 'I am not sure how to help with that.';
    }
}

// Function to show additional buttons
function showAdditionalButtons(buttons) {
    additionalButtons.innerHTML = ''; // Clear existing buttons
    additionalButtons.style.display = 'flex'; // Show container

    buttons.forEach(buttonText => {
        let button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = buttonText;
        button.onclick = () => sendMessage(buttonText);
        additionalButtons.appendChild(button);
    });
}

// Function to show menu items
function showMenuItems(items) {
    menuItems.innerHTML = ''; // Clear existing items
    menuItems.style.display = 'block'; // Show container

    items.forEach(item => {
        let button = document.createElement('button');
        button.classList.add('menu-item-button');
        button.textContent = `${item.name} - ₱${item.price}`;
        button.onclick = () => selectMenuItem(item);
        menuItems.appendChild(button);
    });

    finishOrderButton.style.display = 'block'; // Show finish order button
}

// Function to hide additional buttons
function hideAdditionalButtons() {
    additionalButtons.style.display = 'none'; // Hide container
    additionalButtons.innerHTML = ''; // Clear buttons
}

// Function to hide menu items
function hideMenuItems() {
    menuItems.style.display = 'none'; // Hide container
    menuItems.innerHTML = ''; // Clear items
    finishOrderButton.style.display = 'none'; // Hide finish order button
}

// Function to handle menu item selection
function selectMenuItem(item) {
    order.push(item);
    displayMessage(`Added ${item.name} to your order. Total items: ${order.length}`);
}

// Function to finish order and show total amount
function finishOrder() {
    let total = order.reduce((sum, item) => sum + item.price, 0);
    displayMessage(`Your total order amount is ₱${total}`);
    finishOrderButton.style.display = 'none'; // Hide finish order button
    checkoutButton.style.display = 'block'; // Show checkout button
}

// Function to handle checkout
function checkoutOrder() {
    displayMessage("Thank you for trusting our services! Your order will be delivered as soon as possible! Have a great day ahead!");
    order = []; // Clear the order
    checkoutButton.style.display = 'none'; // Hide checkout button
    hideMenuItems(); // Hide menu items
    hideAdditionalButtons(); // Hide additional buttons
}

// Function to display a message in the chatbot
function displayMessage(message) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    let chatbotMessage = document.createElement('div');
    chatbotMessage.classList.add('chatbot-message', 'chatbot');
    chatbotMessage.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${message}</p>`;
    conversation.appendChild(chatbotMessage);
    chatbotMessage.scrollIntoView({ behavior: "smooth" });
}
