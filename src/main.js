import Router from "./router/router.js";
import {routes}  from './router/routes.js';

const myRouter = new Router(routes);
console.log(myRouter);


// toggle the menu
const menuBtn = document.querySelector('.menu__button');
const menu = document.querySelector('.menu__list');
menuBtn.addEventListener('click', () => menu.classList.toggle('active'));


