<template>
    <div class="app-content-menu" :style="{width:menuFlag?'200px':'0'}">
        <el-menu class="menu" ref="menuNode" :unique-opened="true" v-if="list.length > 0">
            <el-submenu :index="item.title" v-for="item in list" :key="item.title">
                <template slot="title">
                    <span class="title">{{item.title}}</span>
                </template>
                <el-menu-item class="item" v-for="e in item.list" :key="e.id" :index="e.href">
                    <a @click="goPath(e.href)" :class="`href ${$route.path === e.href ? 'router-link-active' : ''}`">
                        {{e.name}}
                    </a>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'app-content-menu',
        watch: {
            $route() {
                this.findList();
                this.$nextTick(() => {
                    this.findOpen();
                });
            }
        },
        data() {
            return {
                list: []
            };
        },
        methods: {
            findOpen() {
                let flag = true;
                this.list.every(({list, title}) => {
                    list.every(({href}) => {
                        if (href === this.$route.path) {
                            this.$refs.menuNode.open(title);
                            flag = false;
                            return flag;
                        }
                        return flag;
                    });
                    return flag;
                });
            },
            findList() {
                this.list = [];
                // 所有子菜单的title找出
                let childTitles = [];
                this.userInfo.menu.every(({href, childList}) => {
                    if (this.$route.path.indexOf(href) !== -1) {
                        // 重组子路由对象
                        let list = [];
                        childList.forEach((child) => {
                            let flag = true;
                            list.every((title) => {
                                if (title === child.title) {
                                    // 将找到相同title的然后放进去
                                    childList.every(({title, list}) => {
                                        if (title === child.title) {
                                            list.push(child);
                                            return false;
                                        }
                                        return true;
                                    });
                                    flag = false;
                                }
                                return flag;
                            });
                            // 没找到有同样的title
                            if (flag) {
                                list.push({
                                    title: child.title,
                                    list: [child]
                                });
                                childTitles.push(child.title);
                            }
                        });
                        this.list = list;
                        return false;
                    } else {
                        return true;
                    }
                });
            },
            goPath(path) {
                this.$router.push(path);
            }
        },
        created() {
            this.findList();
        },
        mounted() {
            this.findOpen();
        },
        computed: {
            userInfo() {
                return this.$store.getters['login/get/USERINFO'];
            },
            menuFlag() {
                return this.$store.getters['common/get/MENUFLAG'];
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .app-content-menu
        width: 200px
        height: 100%
        overflow-y: auto
        will-change: transform
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .06)
        transition: all .3s cubic-bezier(.25, 0, .15, 1), translate .2s cubic-bezier(.25, 0, .15, 1)
        .menu
            border-right: none
            background-color: #fff
            .el-icon-menu
                position: relative
                z-index: 999
                color: #303133
                top: -2px
            .title
                position: absolute
                right: 0
                width: 100%
                font-size: 16px
                background-color: #eff2f7
                text-align: center
                &:hover
                    background-color: #d3dce6
            .item
                font-size: 14px
                padding: 0 !important
                text-align: center
                background-color: rgb(228, 232, 241)
                a
                    font-size: 14px
                    display: block
                    color: rgb(72, 87, 106)
                    &.router-link-active
                        background-color: #1d8ce0 !important
                        color: #fff
                    &:hover
                        background: #d1dbe5
</style>

<style lang="stylus" rel="stylesheet/stylus">
    .app-content-menu
        .menu
            .el-submenu__title
                height: 47px
                line-height: 47px
            .el-menu-item
                height: 42px
                line-height: 42px
</style>
