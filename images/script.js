const form = document.querySelector('.contact-form');



async function handleFormSubmit(e) {
    e.preventDefault();
    const {target} = e;
    const button = document.querySelector('.form-button');
    if (target) {
      try{
        button.disabled = true;
        const name = document.querySelector('.input-name');
        const email = document.querySelector('.input-email');
        const message = document.querySelector('.input-message');
        if (name && email && message) {
          const content = { 
            name: name.value, 
            email: email.value, 
            message: message.value
          };
          await service.post(content);
          form.reset();
          button.disabled = false;
        }
      } catch (error) {
        button.disabled = false;
      }
    }
  }