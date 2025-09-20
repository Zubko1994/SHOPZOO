<!-- @format -->

<script setup lang="ts">
import Text from '../components/Text.vue'

const props = defineProps<{
    id: number
    title: string
    text: string
    image: string
    date_create: string
    read_time: string
}>()

const date_create = props.date_create.slice(0, 10);

const text = props.text.split("<p>").join("").split("</p>").join(" ").split("<br>").join(" ")

const storeArticleData = () => {
  localStorage.setItem('currentArticle', JSON.stringify({
    id: props.id,
    title: props.title,
    text: props.text,
    image: props.image,
    date_create: props.date_create,
    read_time: props.read_time
  }))
}

</script>

<template>
  
    <div class="article">
        <img class="image_pet" :src="props.image" alt="изображение корма хилс">
        <div class="article_wrapper">
            <Text   tag="p" print="article_title"><RouterLink  @click="storeArticleData" :to="`/articlereading/${articleId}`" class="article_title" :class="['item']"
                >{{ props.title }}</RouterLink></Text>
            <Text class="article_subtitle" tag="p" print="article" :title="text" />
        </div>
        <div class="wrapper_info">
            <div class="time">
                <img src="../assets/image/clock.svg" alt="часы">
                <Text tag="p" print="article_indicator" :title="`Время чтения: ${props.read_time}`"></Text>
            </div>
            <div class="date">
                <img src="../assets/image/date.svg" alt="календарь">
                <Text tag="p" print="article_indicator" :title="date_create" />
            </div>
       
    </div>
</div>
</template>

<style lang="scss" scoped>
.article {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 346px;
    background-color: var(--white);
    border-radius: 5px;
    justify-content: space-between;
}

.article_wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-wrap: wrap;
}

.time {
    display: flex;
    gap: 6px;
}

.article_title {
    color: var(--text-default);
    cursor: pointer;
}

.date {
    display: flex;
    gap: 6px;
}

.wrapper_info {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
}

.article_subtitle {
    -webkit-line-clamp: 4;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.image_pet {
    border-radius: 5px;
}



@media (max-width: 992px) {

.container {
    max-width: 992px;
}

.article_title {
    font-size: 15px;
    line-height: 20px;
}
}


</style>