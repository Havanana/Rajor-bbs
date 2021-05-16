<template>
  <article class="media">
    <Avatar  :username="comment.username"
             style=" vertical-align: middle;"
            :inline="true">
    </Avatar>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.username }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
          <br />
          {{ comment.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'LvCommentsItem',
  components: { Avatar },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>


