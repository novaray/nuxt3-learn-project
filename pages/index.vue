<script setup lang="ts">
const { courses } = useCourses();
</script>

<template>
  <q-page padding>
    <div class="q-my-xl text-center">
      <div class="text-h4">All Courses</div>
      <p class="q-mt-5m text-grey-8">웹 개발 입문부터 실전까지 학습.</p>
    </div>
    <div class="row q-col-gutter-lg">
      <div
        v-for="{ courseSlug, title, subtitle, thumbnail, path } in courses"
        :key="courseSlug"
        class="col-12 col-md-4 col-sm-6"
      >
        <NuxtLink
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
        </NuxtLink>
      </div>
    </div>
  </q-page>
</template>
