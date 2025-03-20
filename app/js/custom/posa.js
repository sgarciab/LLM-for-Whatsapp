const fs = require('fs');  // For reading image files

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function sendMessagesToLabeledChats(client, labelName, messagesArray, fullContacts ) {
    try {
        const filteredContacts = fullContacts.filter(fullContact => 
        {   
            return fullContact?.name?.includes(labelName) 
        });    

        // Send the message and the image
        for (let i = 0; i < filteredContacts.length; i++) {
            let chat = filteredContacts[i];
            console.log(`Sending message to: ${chat.name}`);
        
            for (let j = 0; j < messagesArray.length; j++) {
                let message = messagesArray[j];
                await client.sendMessage(chat.id, message);
                await sleep(300);
            }
        
            console.log(`Text message sent to ${chat.name}. ${i+1} of ${filteredContacts.length}`);
        }

    } catch (error) {
        console.error('Error sending messages:', error);
    }
}

// Export the function for use in another file
module.exports = { sendMessagesToLabeledChats };