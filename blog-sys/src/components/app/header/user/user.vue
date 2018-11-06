<template>
    <div class="app-header-user"><img src="./user.png"/><span>{{userInfo.loginName}} </span></div>
</template>

<script>

    export default {
        computed: {
            userInfo() {
                return this.$store.getters['login/get/USERINFO'];
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .app-header-user
        display: flex
        align-items: center
        img
            width: 20px
        span
            position: relative
            top: 2px
            margin-left: 2px
</style>
