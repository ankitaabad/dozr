import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import {isHome} from '$lib/store'
export const prerender = true

/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  console.log("called the ishome set true")
  isHome.set(true)
  if(browser){
    console.log({url})
    console.log({pathnamee:url.pathname})
    // if(url.pathname!=="/"){
    //   goto(url.pathname+url.search)
    // }
  }
}