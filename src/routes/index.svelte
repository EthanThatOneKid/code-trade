<script lang="ts">
  import { onMount } from "svelte";
  // import { writable } from "svelte/store";
  
  let friendCode = "";
  let receivedFriendCode = "";
  let trading = false;

  const handleTradeSubmit = event => {
    trading = true;
    console.log({ event, friendCode });
  }

  onMount(() => {
    console.log("App mounted");
  });
</script>

<style>
</style>

<svelte:head>
  <title>Code Trade</title>
</svelte:head>

<h1>Code Trade</h1>
<p>{receivedFriendCode}</p>
<form on:submit|preventDefault={handleTradeSubmit}>
  <input bind:value={friendCode} />
  <input type="submit" value="Trade!" />
</form>