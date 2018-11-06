<template>
    <div class="dialog-img">
        <div v-if="img" class="content">
            <div class="img" v-for="(src,index) in imgArr" :key="index">
                <img @click="open(src)" :src="src"/>
            </div>
        </div>
        <div v-else class="noImg" @click="open()">
            <img :src="`${$store.state.config.imgUrl}noUpload.png`"/>
        </div>
        <box ref="boxNode" :src="imgSrc"></box>
    </div>
</template>

<script>

    import box from './box/box';

    export default {
        name: 'dialog-img',
        props: {
            img: {
                type: String
            }
        },
        watch: {
            img() {
                this.getImgArr();
            }
        },
        data() {
            return {
                imgArr: [],
                imgSrc: ''
            };
        },
        methods: {
            open(src = null) {
                if (src === null) {
                    this.$message.warning('您还没有传对应的图片');
                    return;
                }
                this.imgSrc = src;
                this.$refs.boxNode.open();
            },
            getImgArr() {
                this.$mapping({
                    entity: this.$data,
                    data: {imgArr: this.img},
                    rule: {
                        imgArr: 'StringToArray'
                    },
                    reset: false
                });
            }
        },
        created() {
            this.getImgArr();
        },
        components: {
            box
        }
    };
</script>

<style lang="stylus" scoped>
    .dialog-img
        .content
            display: flex
            .img
                margin-left: 5px
                cursor: zoom-in
                &:nth-child(1)
                    margin-left: 0
        .noImg
            cursor: pointer
</style>
