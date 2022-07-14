/**
 * @file main.js The Js main file
 * @author Francisco Solis
 * @see <a href="https://github.com/francisco-solis99/json-to-csv">GitHub Repository</a>
 */
import Router from "./router/router.js";
import {routes}  from './router/routes.js';


/**
 *
 * @type {Router}
 */
const myRouter = new Router(routes);
console.log(myRouter);


// toggle the menu

/**
 * Menu Button element in mobile view
 * @constant
 * @type {HTMLElement}
 */
const menuBtn = document.querySelector('.menu__button');

/**
 * Menu list element
 * @constant
 * @type {HTMLElement}
 */
const menu = document.querySelector('.menu__list');

/**
* Event reporting the click into the menu button
*
* @event MenuBtn-click
*
*/
menuBtn.addEventListener('click',
/**
* Toggle the class active in the Menu element
*
* @method
* @fires MenuBtn-click
*/
() => menu.classList.toggle('active'));


