const filterBtn = document.querySelectorAll('.cat-tab');
const projectItem = document.querySelectorAll('.project-item');
const clearBtn = document.querySelector('.cat-clear');
// event listener for event listener that hides all of the items
let selectionArray = [];
filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    let target = btn.getAttribute('data-target');
    if (btn.classList.contains('cat-toggled')) {
      let i = selectionArray.indexOf(target);
      btn.classList.remove('cat-toggled');
        if (i > -1) {
          selectionArray.splice(i, 1); 
        }
    } else {
      selectionArray.push(target);
      btn.classList.add('cat-toggled');
    }
    if (selectionArray.length == 0) {
      projectItem.forEach(item => {
        if (item.classList.contains('hidden-item')) {
          item.classList.remove('hidden-item');
        }
      });
    } else {
      projectItem.forEach(item => {
        let catArr = item.getAttribute('data-categories').split(',');
        let catCheck = [];

        catArr.forEach( cat => {
          catCheck.push(selectionArray.includes(cat));
        });
        if (!catCheck.includes(true)) {
          item.classList.add('hidden-item');
        } else {
          item.classList.remove('hidden-item');
        }
      });
    }
  })
});
// Clear Button //
clearBtn.addEventListener('click', () => {
  selectionArray = [];
  projectItem.forEach(item => {
    if (item.classList.contains('hidden-item')) {
      item.classList.remove('hidden-item');
    }
  });
  filterBtn.forEach(item => {
    if (item.classList.contains('cat-toggled')) {
      item.classList.remove('cat-toggled');
    }
  });
});
