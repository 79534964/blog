<template>
    <div class="___wrapper">
        <slot-input-title>
            <div class="header">
                <el-select v-model="form.name" filterable clearable placeholder="文件名称搜索">
                    <el-option v-for="item in list" :key="item" :label="item"
                               :value="item">
                    </el-option>
                </el-select>
                <el-button class="btn" icon="el-icon-search" type="primary" @click="query">搜索</el-button>
            </div>
        </slot-input-title>
        <div class="tab">
            <slot-tab-top>
                <el-tabs v-model="form.year">
                    <el-tab-pane v-for="e in ['全部',2018,2019,2020,2021]" :label="String(e)" :name="String(e)"
                                 :key="e"></el-tab-pane>
                </el-tabs>
            </slot-tab-top>
        </div>
        <div class="content">
            <div class="base-moiddle el-table__empty-text" v-show="list.length === 0">
                暂无数据
            </div>
            <div class="item" v-for="e in list" :key="e">
                <slot-card-actions>
                    <div slot="body" class="body">
                        <buttonImg class="btn" @success="success" :file="e.split('.')[0]"></buttonImg>
                        <p>{{e}}</p>
                    </div>
                    <div slot="actions" class="actions">
                        <div>
                            <el-button size="medium" icon="el-icon-edit" @click="update(e)">修改
                            </el-button>
                        </div>
                        <div>
                            <el-button size="medium" icon="el-icon-delete"
                                       @click="del(e)">删除
                            </el-button>
                        </div>
                    </div>
                </slot-card-actions>
            </div>
        </div>
        <p class="footer">共 {{list.length}} 条</P>
    </div>
</template>

<script type="text/ecmascript-6">

    import buttonImg from '@/components/common/button/img';

    export default {
        data() {
            return {
                form: {
                    name: '',
                    year: '全部'
                }
            };
        },
        methods: {
            update(file) {
                this.$emit('update', file);
            },
            query() {
                this.$axios({actionType: 'articleArrange/act/LIST'});
            },
            del(file) {
                if (this.list.length < 2) {
                    this.$message.info('最少剩余1个日志');
                    return;
                }
                this.$confirm(`是否删除 ${file}`, '提示', {type: 'warning'}).then(() => {
                    this.$axios({actionType: 'articleArrange/act/DEL', body: {file}}).then(() => {
                        this.$message.success('删除成功');
                        this.query();
                    });
                }, () => {
                    this.$message.info('删除已取消');
                });
            },
            success() {
                this.$message.success('上传成功！');
            }
        },
        created() {
            this.query();
        },
        computed: {
            list() {
                return this.$store.getters['articleArrange/get/LIST'].filter((e) => {
                    return (e === this.form.name || this.form.name === '') && (e.indexOf(this.form.year) !== -1 || this.form.year === '全部');
                });
            }
        },
        components: {
            buttonImg
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .___wrapper
        .tab
            margin-top: 15px
        .content
            position: absolute
            top: 110px
            left: 0
            right: 0
            bottom: 20px
            overflow-x: hidden
            overflow-y: auto
            .el-table__empty-text
                height: 100%
            .item
                width: 33.33%
                float: left
                height: 156px
                padding: 10px
                box-sizing: border-box
                .body
                    position: relative
                    padding: 15px
                    height: 54px
                    p
                        text-align: center
                        font-size: 25px
                        margin-top: 20px
                    .btn
                        position: absolute
                        right: 11px
                        top: 0px
        .footer
            position: absolute
            bottom: -6px
            left: 0
            right: 0
            text-align: center
</style>
