function handleDragStart(e) {
    this.style.opacity = '0.4';
  }
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
  }

  
  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }
  
  function handleDropEvent(e) {
    e.preventDefault()
   // e.stopPropagation(); // stops the browser from redirecting.
   console.log('PAOLO')

   return false;
  

  }