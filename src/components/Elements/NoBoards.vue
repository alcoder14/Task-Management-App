<template>
    <div class="no-boards-container">
        <font-awesome-icon icon="fa-solid fa-plus" class="plus-icon" />
        <p class="no-boards-text">Add Board</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .no-boards-container{
        width: 100%;
        height: 90vh;
        background-color: $darkest;
        @include flex-column();
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .plus-icon{
            color: $white;
            font-size: 3rem;
        }
        .no-boards-text{
            margin-top: 10px;
            font-size: 2.6rem;
            color: $light;
        }
    }
</style>