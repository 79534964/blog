<template>
    <div class="app-header-logo" :style="`width:${menuFlag?'185px':'0'}`">
        <p>博客管理系统</p>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        computed: {
            menuFlag() {
                return this.$store.getters['common/get/MENUFLAG'];
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .app-header-logo
        text-align: center
        overflow: hidden
        margin-left: 1%
        font-weight: 600
        font-size: 17px
        width: 185px
        transition: width .3s cubic-bezier(.25, 0, .15, 1), translate .2s cubic-bezier(.25, 0, .15, 1)
        p
            white-space: nowrap
</style>
