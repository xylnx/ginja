// import { test } from './test.js';
const section = document.querySelector('section');

// list all available compoenents here
const components = ['test', 'test_2', 'terzik'];
let componentData = {
  html: [],
  selector: [],
  isInserted: []
};

let id = 0;


components.forEach( async (component) => {
  let path = `./components/${component}.js`;
  let { html, selector } = await import(path);

  let markup = `
    <div>${component}</div>
    <button data-id="${id}">insert</button>
    <button data-id="${id}">remove</button>
  ` 
  componentData.html.push(html);
  componentData.selector.push(selector);
  componentData.isInserted.push(false);

  section.insertAdjacentHTML('beforeend', markup)
  id++;

});


section.addEventListener('click', handle);

function handle(event) {
  const target = event.target;
  console.log(target);

  if(target.innerHTML =='remove') {
    componentData.isInserted[id] == false;
  }

  else if(target.innerHTML == 'insert') {
    let id = target.getAttribute('data-id');
    if(!componentData.isInserted[id]) {
      let component = componentData.html[id];
      let selector = componentData.selector[id];

      componentData.isInserted[id] = true;
      // call content script and 
      // pass it two variables (html + selector)
      chrome.tabs.executeScript( {
        code: `html= ${JSON.stringify(component)}; selector= ${JSON.stringify(selector)}`
      }, function() {
          chrome.tabs.executeScript({file: 'content.js'});
        });

    }
    else {console.log('component already inserted, won\'t insert again');}
    
  }
}


