<template>
    <div class="___wrapper" ref="wrapperNode" v-loading="loading">
        <div class="input">
            <el-input placeholder="请输入文件名称" v-model="form.file">
                <template slot="append">.md</template>
            </el-input>
            <slot-button-sumbit>
                <el-button type="primary" @click="sumbit">保存</el-button>
            </slot-button-sumbit>
        </div>
        <div class="editormd" id="editormd">
            <textarea style="display:none;"></textarea>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                loading: false,
                editormd: null,
                type: '',
                form: {
                    file: '',
                    content: ''
                }
            };
        },
        methods: {
            update(file) {
                this.type = 'UPDATE';
                this.$mapping({
                    entity: this.form,
                    data: {file},
                    rule: {
                        file: 'StringToFile'
                    }
                });
                this.$axios({actionType: 'articleArrange/act/DETAILS', body: {file}}).then(() => {
                    this.init(this.details);
                });
            },
            add() {
                this.type = 'ADD';
                this.$mapping({entity: this.form});
                this.init();
            },
            init(details = '') {
                if (this.editormd === null) {
                    this.loading = true;
                    window.setTimeout(() => {
                        let height = this.$refs.wrapperNode.clientHeight - 45;
                        this.editormd = window.editormd('editormd', {
                            width: '100%',
                            height,
                            path: './static/js/lib/'
                        });
                        window.setTimeout(() => {
                            this.editormd.setMarkdown(details);
                            this.loading = false;
                        }, 1000);
                    }, 2000);
                } else {
                    this.editormd.setMarkdown(details);
                    this.loading = true;
                    window.setTimeout(() => {
                        this.loading = false;
                    }, 500);
                }
            },
            async sumbit() {
                if (!new RegExp(/^\d{4}-\d{2}-\d{2}$/).test(this.form.file)) {
                    this.$message.warning('文件名称格式为 YYYY-MM-dd');
                    return;
                }
                this.form.content = this.editormd.getMarkdown();
                if (this.form.content === '') {
                    this.$message.warning('请输入日志内容');
                    return;
                }
                this.$axios({actionType: `articleArrange/act/${this.type}`, body: this.form}).then(() => {
                    this.$message.success('操作成功');
                    this.$emit('success');
                });
            }
        },
        computed: {
            details() {
                return this.$store.getters['articleArrange/get/DETAILS'];
            }
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .___wrapper
        .editormd
            margin-top: 10px
        .input
            width: 100%
            display: flex
            justify-content: space-between
            .el-input
                width: 33.33%
</style>
