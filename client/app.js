window.addEventListener('DOMContentLoaded', () => {
    // Button 1 - Regular GET
    const button1 = document.querySelector('.button-red');
    button1.addEventListener('click', async () => {
      console.log('Red button clicked!');
      try {
        const response = await fetch('http://localhost:8080/cars');
        const data = await response.text();
        
        // Process the response data as needed
        const responseElement = document.createElement('p');
        responseElement.textContent = `Response: ${data}`;
        button1.parentNode.insertBefore(responseElement, button1.nextSibling);
        
      } catch (error) {
          // Handle any errors that occurred during the request
        console.error('Error:', error);
      }
    });
  
    // Button 2 - req.body GET
    const button2 = document.querySelector('.button-green');
    button2.addEventListener('click', async () => {
        console.log('Blue button clicked!');
    //     try {
    //       const response = await fetch('http://localhost:8080/cars');
    //       const data = await response.text();
          
    //       // Process the response data as needed
    //       const responseElement = document.createElement('p');
    //       responseElement.textContent = `Response: ${data}`;
    //       button1.parentNode.insertBefore(responseElement, button1.nextSibling);
          
    //     } catch (error) {
    //         // Handle any errors that occurred during the request
    //       console.error('Error:', error);
    //     }
    //   });
  
  
    // Button 3 - req.params GET 
    const button3 = document.querySelector('.button-blue');
    button3.addEventListener('click', async () => {
        console.log('Blue button clicked!');
        try {
          const response = await fetch('http://localhost:8080/cars/4');
          const data = await response.text();
          
          // Process the response data as needed
          const responseElement = document.createElement('p');
          responseElement.textContent = `Response: ${data}`;
          button1.parentNode.insertBefore(responseElement, button1.nextSibling);
          
        } catch (error) {
            // Handle any errors that occurred during the request
          console.error('Error:', error);
        }
      });

    
  
    // Button 4 - req.query GET
    const button4 = document.querySelector('.button-yellow');
    button4.addEventListener('click', async () => {
        console.log('Yellow button clicked!');
        try {
          const response = await fetch('http://localhost:8080/cars/make?={Toyota}');
          const data = await response.text();
          
          // Process the response data as needed
          const responseElement = document.createElement('p');
          responseElement.textContent = `Response: ${data}`;
          button1.parentNode.insertBefore(responseElement, button1.nextSibling);
          
        } catch (error) {
            // Handle any errors that occurred during the request
          console.error('Error:', error);
        }
      });
  });
});