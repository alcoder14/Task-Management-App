<template>
    <div class="column">
        <header>
            <div class="circle" :class="circleColor"></div>
            <h1 class="task-category">{{ category }} ( {{ tasksNumber }} )</h1>
        </header>
        <div v-if="tasks.length > 0">
            <TaskCard v-for="task in tasks" :key="task.title" :taskData="task" />
        </div>
        <NoTasks v-else />
    </div>
</template>

<script>
import TaskCard from '../Elements/TaskCard.vue';
import NoTasks from '../Elements/NoTasks.vue';

export default {
    components: {
        TaskCard,
        NoTasks
    },
    props: {
        circleColor: String,
        category: String,
        tasks: Array,
        tasksNumber: Number
    },
    mounted(){
        console.log(this.tasks)
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";

    header{
        @include flex-row();
        align-items: center;
    }
    .task-category{
        color: white;
        font-size: 22px;
    }
    .circle{
        height: 22px;
        width: 22px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .blue{
        background-color: #49c4e5;
    }
    .purple{
        background-color: $light;
    }
    .green{
        background-color: #68dfb1;
    }
</style>