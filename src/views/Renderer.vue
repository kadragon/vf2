<template>
  <board-index
    v-if="collection === 'board' && document === 'list'"
  ></board-index>
  <board-content
    v-else-if="collection === 'board' && !action"
    :document="document"
  ></board-content>
  <board-form
    v-else-if="collection === 'board'"
    :document="document"
    :action="action"
  ></board-form>

  <page-index
    v-else-if="collection === 'page' && document === 'list'"
  ></page-index>
  <page-content
    v-else-if="collection === 'page'"
    :document="document"
  ></page-content>
  <error-page v-else></error-page>
</template>

<script>
import BoardIndex from "./board/index";
import BoardContent from "./board/content";
import BoardForm from "./board/form";
import PageIndex from "./page/index";
import PageContent from "./page/content";
import ErrorPage from "./Error";

export default {
  components: {
    BoardIndex,
    BoardContent,
    BoardForm,
    PageIndex,
    PageContent,
    ErrorPage
  },
  computed: {
    collection() {
      return this.$route.params.collection;
    },
    document() {
      return this.$route.params.document;
    },
    action() {
      return this.$route.params.action;
    }
  }
};
</script>
