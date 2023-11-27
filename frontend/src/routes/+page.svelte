<script>
  import { customerId, isManager } from "$lib/store";
  import {get } from "svelte/store"
  import {goto} from '$app/navigation'
	import { server } from "$lib/utils";
 let userId
 let ws
 
  async function managerLogin() {
    isManager.set(true)
    console.log(get(isManager))
  }

  function randomUserLogin(){
    customerId.set(1001)
    userLogin()
    goto("/dashboard")
  }
  function userLogin() {
    if(userId){
      console.log("inside user login")
      ws = new WebSocket("ws://gotify.68.183.85.136.nip.io/stream?token=CnUR0SKNDn_nBX3");
				
        ws.onopen = function() {
           
           // Web Socket is connected, send data using send()
          //  ws.send("Message to send");

          console.log("socket openend")
        };
 
        ws.onmessage = function (evt) { 
          console.log(evt)
           var received_msg = evt.data;
           console.log({received_msg})
        };
 
        ws.onclose = function() { 
           
           // websocket is closed.
           alert("Connection is closed..."); 
        };
      customerId.set(userId)
      goto("/dashboard")

    }
  }
  </script>
<div class="h-screen flex ">

	<div
		class="container h-80 justify-center border-t-8 border-primary-100 border border-t-primary-600 my-auto gap-y-4 items-center flex flex-col max-w-sm mx-auto items-start"
	>
		<img src="./logo.png" alt="" class="w-40 mt-3 mb-10" />
		<button class="btn btn-sm bg-primary-200 variant-filled-primary rounded-sm w-2/3" on:click= {managerLogin}>
      Login as Manager
			</button
		>
		<button class="btn btn-sm variant-filled-primary rounded-sm w-2/3" on:click={randomUserLogin}>Login as Random User</button>
		<div class="flex">
			<input type="number" placeholder="Customer Id" class="text-gray-900 text-sm rounded-sm w-2/3" bind:value={userId}/>
			<button class="btn btn-sm variant-filled-primary rounded-sm w-1/3" on:click={userLogin}>Login</button>
		</div>
	</div>
</div>
