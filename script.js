const papers = document.querySelectorAll('.paper');

papers.forEach((paper, index) => {
  paper.style.zIndex = index + 1;

  // Random position
  paper.style.top = `${Math.random() * window.innerHeight * 0.5}px`;
  paper.style.left = `${Math.random() * window.innerWidth * 0.5}px`;

  paper.addEventListener('mousedown', function(e) {
    let shiftX = e.clientX - paper.getBoundingClientRect().left;
    let shiftY = e.clientY - paper.getBoundingClientRect().top;

    // Bring to front on click
    paper.style.zIndex = parseInt(paper.style.zIndex) + 1000;

    function moveAt(pageX, pageY) {
      paper.style.left = pageX - shiftX + 'px';
      paper.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    paper.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      paper.onmouseup = null;
    };
  });

  paper.ondragstart = () => false;
});
