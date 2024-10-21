const fs = require('fs');  // For reading image files

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function sendMessagesToLabeledChats(client, labelName, messagesArray, fullContacts ) {
    try {
      

        const filteredContacts = fullContacts.filter(fullContact => 
        {   
            return fullContact?.name?.includes(labelName) 
        });
        
        console.log("labeledChats sendMessagesToLabeledChats")
        console.log(filteredContacts)

        // Send the message and the image
        filteredContacts.forEach(async (chat) => {
            console.log(`Sending message to: ${chat.name}`);
            messagesArray.forEach(async(message)=>{
                await client.sendMessage(chat.id, message);
            })
            console.log(`Text message sent to ${chat.name}`);
            await sleep(3000)
        });

    } catch (error) {
        console.error('Error sending messages:', error);
    }
}

// Export the function for use in another file
module.exports = { sendMessagesToLabeledChats };