<template>
    <el-dialog :visible.sync="showFlag">
        <img width="100%" :src="src">
    </el-dialog>
</template>

<script>

    export default {
        name: 'dialog-img-box',
        props: {
            src: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showFlag: false
            };
        },
        methods: {
            open() {
                this.showFlag = true;
                document.body.appendChild(this.$el);
            }
        }
    };
</script>
