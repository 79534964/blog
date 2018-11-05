<template>
    <div class="___wrapper" ref="wrapperNode" v-loading="loading">
        <imgList ref="imgListNode"></imgList>
        <div class="input">
            <el-input placeholder="请输入文件名称" v-model="form.file">
                <template slot="append">.md</template>
            </el-input>
            <el-button class="btn" v-if="type === 'UPDATE'" type="text" icon="el-icon-picture" @click="img"></el-button>
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

    import imgList from '../update/imgList';
    import {dateFormat} from '@/common/js/utils';

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
                this.$refs.imgListNode.setFile(file);
                this.$axios({actionType: 'articleArrange/act/DETAILS', body: {file}}).then(() => {
                    this.init(this.details);
                });
            },
            add() {
                this.type = 'ADD';
                this.$mapping({entity: this.form});
                let str = `---

title: 文章标题
date: ${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}
categories: 文章分类
tags: 文章标签

---

## 文章正文标题
`;
                this.init(str);
            },
            init(details) {
                if (this.editormd === null) {
                    this.loading = true;
                    window.setTimeout(() => {
                        let height = this.$refs.wrapperNode.clientHeight - 45;
                        this.editormd = window.editormd('editormd', {
                            width: '100%',
                            height,
                            path: './static/js/lib/',
                            onload: () => {
                                window.setTimeout(() => {
                                    this.editormd.setMarkdown(details);
                                    this.loading = false;
                                }, 500);
                            }
                        });
                    }, 2000);
                } else {
                    this.editormd.setMarkdown(details);
                    this.loading = true;
                    window.setTimeout(() => {
                        this.loading = false;
                    }, 500);
                }
            },
            img() {
                this.$refs.imgListNode.open();
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
        },
        components: {
            imgList
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
            .btn
                position: absolute
                left: 34.3%
                font-size: 37px
                padding: 0px
            .el-input
                width: 33.33%
</style>
