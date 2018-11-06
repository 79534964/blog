<template>
    <el-upload class="imgLoadBtn" :action="`${$store.state.config.baseUrl}/${$store.state.api.uploadImgUrl}`"
               :data="{token : $store.state.login.token,file}" :show-file-list="false" :drag="true"
               :on-success="success" :before-upload="before" :on-progress="progress">
        <div class="circle" v-show="percent!==100">
            <el-progress type="circle" :percentage="percent"></el-progress>
        </div>
        <el-button style="font-size: 22px;" type="text" icon="el-icon-picture-outline"></el-button>
    </el-upload>
</template>

<script>

    export default {
        name: 'imgLoadBtn',
        data() {
            return {
                percent: 100
            };
        },
        props: {
            max: {
                type: Number,
                default: 2
            },
            file: {
                type: String,
                default: ''
            }
        },
        methods: {
            success({code}, file) {
                if (code === 200) {
                    this.$emit('success', file.response.content);
                }
            },
            before(file) {
                const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

                let {type, size} = file;

                if (!types.includes(type)) {
                    let str = '';
                    types.forEach((e) => {
                        str += `${e.split('/').pop()} `;
                    });
                    this.$message.warning(`请上传 ${str}的文件类型`);
                    return false;
                }

                if (size > this.max * 1024 * 1024) {
                    this.$message.warning(`上传的大小不能超过 ${this.max}MB!`);
                    return false;
                }

                return true;
            },
            progress({percent}) {
                this.percent = Math.floor(percent);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .imgLoadBtn
        .circle
            background-color: rgba(255, 255, 255, .9)
            top: 0
            position: absolute
            left: 0
            right: 0
            bottom: 0
            display: flex
            align-items: center
            justify-content: center
        .el-upload-dragger
            width: auto
            height: auto
            background: none
            border: none
</style>
