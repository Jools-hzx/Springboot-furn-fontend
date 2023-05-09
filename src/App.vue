<template>
  <div>
<!--      引用组件-->
      <Header/>
<!--      主体-->
      <div style="display: flex">
<!--          加入侧边栏-->
          <Aside/>
<!--          内容区域： 这个部分是从 HomeView.vue 组件来的(通过路由机制)-->
          <router-view style="flex: 1"/>
      </div>
  </div>
</template>
<style>

</style>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
export default  {
    name: "Layout",
    components : {
        Header,
        Aside
    }
}
</script>