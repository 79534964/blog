<template>
    <div class="app-header-route">
        <el-menu mode="horizontal" v-for="(item,index) in userInfo.menu" :key="item.childList[0].href"
                 text-color="#303133">
            <el-submenu :index="item.href">
                <template slot="title">
                    <div :class="`route ${$route.path.indexOf(item.href) !== -1 ? 'active' : ''}`">
                        {{item.name}}
                    </div>
                </template>
                <el-submenu class="menu" :index="second.title" v-for="second in list[index]" :key="second.title">
                    <template slot="title">
                        {{second.title}}
                    </template>
                    <el-menu-item :index="e.href" v-for="e in second.list" :key="e.id" @click="goPath(e.href)">
                        {{e.name}}
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

    export default {
        watch: {
            userInfo() {
                this.getList();
            }
        },
        data() {
            return {
                list: []
            };
        },
        methods: {
            goPath(path) {
                this.$router.push(path);
            },
            getList() {
                if (this.userInfo.menu) {
                    this.userInfo.menu.forEach(({childList}) => {
                        let list = [];
                        let childTitles = [];
                        childList.forEach((child) => {
                            let flag = true;
                            childTitles.every((title) => {
                                if (title === child.title) {
                                    // 将找到相同title的然后放进去
                                    list.every(({title, list}) => {
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
                        this.list.push(list);
                    });
                }
            }
        },
        created() {
            this.getList();
        },
        computed: {
            userInfo() {
                return this.$store.getters['login/get/USERINFO'];
            }
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app-header-route
        width: 100%
        display: flex
        margin-left: 10px
        ul
            flex: 1
            background-color: #1d8ce0
            height: 45px
            line-height: 45px
            .active
                background-color: rgba(0, 0, 0, .2) !important
            .is-opened
                .el-submenu__title
                    background-color: rgba(0, 0, 0, .2) !important
            li
                padding: 0
                max-width: 180px
                width: 100%
                text-align: center
                height: 45px
                line-height: 45px
                .el-submenu__title
                    padding: 0 0.5% !important
                    height: 45px !important
                    line-height: 45px !important
                    font-size: 14px !important
                    color: #fff !important
                    &:hover
                        background-color: rgba(0, 0, 0, .2) !important
                    i
                        display: none
</style>
