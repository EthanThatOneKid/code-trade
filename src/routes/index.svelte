<script lang="ts">
  import { onMount } from "svelte";
  import { initializeTradeServive } from './_tradeService';
  
  let friendCode: string = "";
  let receivedFriendCode: string = "";
  let isTrading: boolean = false;
  let requestTradePartner;

  const handleTradeSubmit = event => {
    if (!isTrading) {
      requestTradePartner(friendCode);
    }
  };

  onMount(() => {
    console.log("App mounted");
    const tradeService = initializeTradeServive();
    requestTradePartner = tradeService.requestTradePartner;
    tradeService.subscribe(message => {
      isTrading = message.isTrading;
      receivedFriendCode = message.tradePartnerFriendCode || "";
    });
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