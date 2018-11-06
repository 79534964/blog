<template>
    <div class="app-header">
        <div class="left">
            <logo></logo>
            <shrink></shrink>
            <lock></lock>
            <route></route>
        </div>
        <div class="right">
            <user></user>
            <set></set>
        </div>
    </div>
</template>

<script>

    import lock from './lock/lock';
    import set from './set/set';
    import shrink from './shrink/shrink';
    import user from './user/user';
    import route from './route/route';
    import logo from './logo/logo';

    export default {
        components: {
            set,
            shrink,
            lock,
            user,
            route,
            logo
        }
    };
</script>

<style lang="stylus" scoped>
    .app-header
        display: flex
        justify-content: space-between
        color: #fff
        height: 45px
        background-color: #1D8CE0
        line-height: 45px
        min-width: 1200px
        box-shadow: 0 1px 10px rgba(0, 0, 0, .2)
        .left
            display: flex
            align-items: center
            position: relative
            flex: 0 0 80%
            width: 80%
        .right
            flex: 1
            display: flex
            justify-content: flex-end
            font-size: 14px
            align-items: center
</style>
