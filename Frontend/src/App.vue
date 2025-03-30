<template>
  <div id="app">
    <router-view></router-view>
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

body{
  font-family:'Segoe UI';
}
</style>
