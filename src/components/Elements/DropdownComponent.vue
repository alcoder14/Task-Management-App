<template>
    <div class="input-row">
        <label for="status">Status</label>
        <select id="status" class="status-dropdown" v-model="selectedStatus" @change="statusSelected">
            <option v-for="status in statuses" :key="status.value" :value="status.value" class="option">{{ status.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        statuses: Array,
        selected: String
    },
    data(){
        return {
            selectedStatus: null
        }
    },
    mounted(){
        this.selectedStatus = this.selected
        console.log(this.selectedStatus)
    },
    methods: {
        statusSelected(){
            this.$emit("onStatusSelected", this.selectedStatus)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .status-dropdown{
        font-size: 20px;
        padding: 10px;
        background-color: $dark;
        color: $white;
        border: solid 2px $grey;
        &:after {
            content: '\25BC'; /* Unicode character for a downward-pointing triangle */
            position: absolute;
            top: 50%;
            right: 10px; /* Adjust the right position as needed */
            transform: translateY(-50%);
            color: #ff0000; /* Change the color of the arrow icon */
        }
        .option{
            padding: 10px;
        }
    }
</style>