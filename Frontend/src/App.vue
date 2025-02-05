<template>
  <div id="app">
    <div id="navbar">
      <div id="navcomponent" style="padding: 10px;">
      <img src="#" alt="Logo">
      <b>ConsoleX</b>
      </div>
      <div id="navcomponent" style="justify-content: flex-end;">
        <div id="navbuttons">
      <button>Home</button>
      <button>About</button>
      <button>Products</button>
      <button>Contacts</button>
        </div>
      </div>

    </div>
    <router-view></router-view> <!-- Itt jelennek meg a komponensek -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#navbar{
  display: flex;
  border-bottom: 2px black solid;
  align-items: center;
  height: 50px;
}
#navcomponent{
  width: 50%;
  display: flex;
  gap: 10px;
}

#navbuttons{
  text-align: right;
}

</style>
