<script setup lang="ts">
const { courses } = await useCourses();

console.log('index.vue', process.server);
</script>

<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <PageTitle title="All Courses" />
      <PageDescription description="웹 개발 입문부터 실전까지 학습." />
    </div>
    <div class="row q-col-gutter-lg">
      <div
        v-for="{ courseSlug, title, subtitle, thumbnail, path } in courses"
        :key="courseSlug"
        class="col-12 col-md-4 col-sm-6"
      >
        <NuxtLinkLocale
          v-slot="{ navigate }"
          custom
          :to="path"
        >
          <CourseCard
            :thumbnail="thumbnail"
            :title="title"
            :subtitle="subtitle"
            @click="navigate"
          />
        </NuxtLinkLocale>
      </div>
    </div>
  </q-page>
</template>
