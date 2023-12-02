import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const prerender = true

/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  // if(browser){
  //   if(url.pathname!=="/"){
  //     goto(url.pathname+url.search)
  //   }
  // }
}