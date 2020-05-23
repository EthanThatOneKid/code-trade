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

.window {
  width: min-content;
}

</style>

<svelte:head>
  <title>Code Trade</title>
</svelte:head>

<div class="window">
  <div class="title-bar">
    <div class="title-bar-text">
      Code Trade
    </div>
    <div class="title-bar-controls">
      <!-- <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button> -->
    </div>
  </div>
  <div class="window-body">
    <p>{receivedFriendCode}</p>
    <section class="field-row">
      <form on:submit|preventDefault={handleTradeSubmit}>
        <label for="friend-code">Your friend code:</label>
        <input name="friend-code" type="text" bind:value={friendCode} />
        <button type="submit" disabled={isTrading}>
          Trade!
        </button>
        <!-- TODO: When isTrading, enable cancel button -->
      </form>
    </section>
  </div>
</div>