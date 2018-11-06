<template>
    <div class="_wrapper login">
        <background></background>
        <div class="box">
            <h1 class="logo">博客管理系统</h1>
            <div class="content">
                <el-input class="input" v-model="form.account" placeholder="用户名" :auto-complete="'on'">
                    <img slot="prefix" src="./user.png"/>
                </el-input>
                <el-input class="input password" type="password" v-model="form.password" placeholder="密码"
                          @keyup.enter.native="login()" :auto-complete="'off'">
                    <img slot="prefix" src="./password.png"/>
                </el-input>
                <div class="checkbox">
                    <el-tooltip content="勾选后免登陆" placement="bottom" effect="light">
                        <el-checkbox v-model="form.radio">自动登陆</el-checkbox>
                    </el-tooltip>
                </div>
                <el-button class="btn" type="primary" :loading="$store.state.loading.btnLoading" @click="login()">登录
                </el-button>
            </div>
            <img class="text" src="./text.png"/>
        </div>
    </div>
</template>

<script>

    import background from './background/background';
    import storage from '@/common/js/storage';

    export default {
        data() {
            return {
                form: {
                    account: '',
                    password: '',
                    radio: false
                }
            };
        },
        methods: {
            init() {
                if (this.userInfo.menu) {
                    this.setPath();
                }
            },
            login() {
                if (this.form.account && this.form.password) {
                    this.$axios({
                        actionType: 'login/act/LOGIN',
                        body: this.form,
                        btnLoading: true
                    }).then(() => {
                        storage[this.form.radio ? 'setLocal' : 'setSession']({key: 'userInfo', value: this.userInfo});
                        if (this.userInfo.menu) {
                            this.setPath();
                        }
                    });
                } else {
                    this.$message.warning('账号密码不能为空');
                }
            },
            setPath() {
                this.$router.push(this.userInfo.menu[0].childList[0].href);
            }
        },
        created() {
            this.init();
        },
        computed: {
            userInfo() {
                return this.$store.getters['login/get/USERINFO'];
            }
        },
        components: {
            background
        }
    };
</script>

<style lang="stylus" scoped>
    ._wrapper
        position: fixed !important
        top: 0
        left: 0
        z-index: 99
        width: 100%
        height: 100% !important
        margin-top: 0 !important
        background-color: #f5f5f5
        text-align: center
        .box
            position: absolute
            left: 50%
            top: 40%
            z-index: 1
            transform: translate(-50%, -50%)
        .logo
            font-size: 40px
            color: #1d8ce0
            font-weight: 600
            margin-bottom: 50px
        .content
            width: 368px
            margin: 0 auto 20px
            .input
                img
                    width: 21px
                    margin-top: 12px
                    margin-left: 10px
            .password
                margin-top: 30px
            .checkbox
                text-align: left
                margin: 20px 0
            .btn
                font-size: 16px
                width: 100%
        .text
            margin-top: 40px
            width: 550px
</style>

<style lang="stylus" rel="stylesheet/stylus">
    .login
        .input
            .el-input__inner
                font-size: 16px
                padding-left: 44px
                height: 46px
</style>
