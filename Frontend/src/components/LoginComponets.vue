<template>
    <div>
        <nav>
            <div>
                <header>
                    <div class="number2">
                    </div>

                    <div class="navbar">
                    <div class="navlinks">
                        <ul>
                        <li><a>H o m e</a></li>
                        <li><a>G a m i n g</a></li>
                        <li><a>O f f i c e</a></li>
                        <li><a>C h e c k o u t</a></li>
                        <li><a>C o n t a c t s</a></li>
                        </ul>
                    <div class="searchbar">
                        <input type="text" placeholder="Search..">
                    </div>
                    </div>



                    </div>

                </header>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .topnav input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .topnav a, .topnav input[type=text] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;
  }
}

input[type=text]{
  width: 200px;
  float: left;
  position: absolute;

}

@media screen and (max-width: 600px) {
  input[type=text]{
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
}

/*---------END CART ITEMS------------*/

.navlinks ul li:hover{

  transition: .5s;
  opacity: 100%;
}

.navlinks ul li{
  transition: .5s;
  opacity: 20%;
  font-size: 2rem;
}


.img1 .ple img{
  width: 700px;
  margin-bottom: -200px;

}


body { padding: 0; margin: 0; }


.navlinks li a{
  padding-top: 20px;
  padding-bottom: 20px;
  text-transform: uppercase;

}
.navlinks a{
  color: white;
  z-index: 2000;
  text-decoration: none;
  text-align: center;
  display:inline-block;

}

.navbar li{
      display:inline;
}

.navbar{

  list-style:none;
  margin:0;
  padding:0;
  text-align:center;
}



header {
  background-color: #16161e;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw;
  height: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color:#16161e;
}

li {
    color: #111;
}

li a {
  display: block;
  color: rgb(0, 0, 0);

  padding: 14px 16px;
  text-decoration: none;

}

li a:hover {
  background-color: #111;
  transition: 0.5s;

}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

*, ::after, ::before {
    box-sizing: border-box;
}
</style>