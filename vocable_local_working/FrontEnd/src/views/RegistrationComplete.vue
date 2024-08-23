<template>
    <div class="wrapper">
        <v-sheet>
            <v-card class="mx-auto px-6 py-8" max-width="344">
                <img src="/logoVuoto.png" alt="Vocable Logo" /> <!-- logo , scritta qua sotto -->
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>
                <div class="descrizione">
                  <span class="desc">Registrazione compiuta con successo!</span>
                </div>
                <a href="Gameplay" class="button">Let's Play!</a>
            </v-card>
        </v-sheet>
    </div>
</template>

<style scoped>
    .descrizione{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: auto;
    }
    .desc{
        padding: 12px 22px;
        text-align: center;
        text-decoration: none;
        display: block;
    }
    .vocableText{
        align-self: center;
        font-size: 3rem/* 48px */;
        line-height: 1;
        font-weight: 600;
        white-space: nowrap;
        color:#050780;
    }
    #home{
        margin: auto;
        width: 50%;
        padding: 10px;
        text-align: center;
    }
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        height: auto;
    }
    .button {
        width:100%;  
        border-radius: 8px;
        background-image: linear-gradient(to right, hsl(242, 100%, 50%),hsl(203, 100%, 59%));
        border: none;
        color: white;   
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-top:3%;
        height:auto;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
    }
    .button:hover {
        background-image: linear-gradient(to left, rgb(4, 0, 255), rgb(0, 157, 255));  
        color: rgb(255, 255, 255);
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
  </style>
  