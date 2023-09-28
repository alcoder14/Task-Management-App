<template>
    <div class="container">
        <h1 class="text">No Tasks Here</h1>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss"  scoped>
    @import "@/assets/style.scss";
    .container{
        width: 100%;
        height: 77vh;
        background-color: $dark;
        @include flex-column();
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        border-radius: 15px;
        .text{
            font-size: 34px;
            color: $white;
        }
    }

    @media(max-width: 1250px){
        .container .text{
            font-size: 26px;
        }
    }

</style>