
function scrollToTop() {
  window.scrollTo({
    top: 0,
  })
}

window.addEventListener('scroll', function(){
  const scrollTopButton = document.querySelector('.scroll-top');
  if (this.window.scrollY>200) {
    scrollTopButton.style.display = 'block'
  } else {
    scrollTopButton.style.display = 'none';
  }
});