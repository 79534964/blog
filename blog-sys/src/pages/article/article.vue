<template>
    <transition name="fade-in">
        <router-view class="_wrapper fade-in"></router-view>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'product'
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    ._wrapper
        position absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
</style>
