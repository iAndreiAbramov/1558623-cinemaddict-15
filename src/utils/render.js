import AbstractView from '../view/abstract-view';

export const Positions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  let counter = 0;
  while (element.nodeName === '#text') {
    counter++;
  }
  return element.children[counter];
};

export const insertDOMElement = (parent, DOMElement, position) => {
  if (parent instanceof AbstractView) {
    parent = parent.getElement();
  }

  if (DOMElement instanceof AbstractView) {
    DOMElement = DOMElement.getElement();
  }

  if (parent) {
    parent.insertAdjacentElement(position, DOMElement);
  }
};

export const replaceDOMElement = (parent, newElement, oldElement) => {
  if (newElement instanceof AbstractView) {
    newElement = newElement.getElement();
  }
  if (parent) {
    parent.replaceChild(newElement, oldElement);
  }
};
