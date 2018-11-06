const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    //console.log(_items);
    //console.log(_form);

    const itemList = items.querySelectorAll('.item');

    for (let i = 0; i < itemList.length; i++) {
      const checkbox = itemList[i].querySelector('.item__checkbox');
      const text = itemList[i].querySelector('.item__text');
      const button = itemList[i].querySelector('.item__button');
      

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }

    const formbutton = document.querySelector('.form__button');
    formbutton.addEventListener('click', add);
  

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
  

    const input = document.querySelector('.form__button');

    if(input.value.trim !==''){
      input.value;
    }
    input.value = '';
    }


  // event handler fyrir það að klára færslu
  function finish(e) {
    const { target } = e;
    target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;

    parentNode.removeChild(target);

    let input = document.createElement('input');
    input.classList.add('item__edit');
    input.addEventListener('keyup', commit);
    input.setAttribute('type', 'text');

    input.value = textContent;

    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);


    input.focus();


  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === 13){
      const input = document.createElement('span');
      input.classList.add('item__text');
      input.innerHTML = e.target.value;
      input.addEventListener('click', edit);
      e.target.parentNode.replaceChild(input, e.target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    const newForminput = document.querySelector('.form__input').value;

    const newItem = el('li','item', null);

    const newInput = el ('input', 'item__checkbox', finish);
    newInput.setAttribute('type', 'checkbox'); 
    
    const newText = el('span', 'item__text', edit,);
    newText.appendChild(document.createTextNode(newForminput));
    const newButton = el('button', 'item__button',deleteItem);
    newButton.appendChild(document.createTextNode("Eyða"))
    newItem.appendChild(newInput);
    newItem.appendChild(newText);
    newItem.appendChild(newButton);

    const newUl = document.querySelector('.items');
    newUl.appendChild(newItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const { target } = e;  //const breyta = e.target
    const parent = target.parentNode;
    

    let checkbox = parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click', finish);


    parent.parentNode.removeChild(parent);//eyðir allri línunni
  }


  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    //búa ti div

    const element = document.createElement(type);


    if (className) {

      element.setAttribute('class', className);
    }

    if (clickHandler) {
      element.addEventListener('click', clickHandler);

    }
    return element;

  }

  return {
    init: init
  }
})();
