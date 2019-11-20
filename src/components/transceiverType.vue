<template>
    <div class="transceiver-type">
        <div v-for="(item, index) in listDetail" class="list">
            <div @click="select(index, idx, clause.id)" v-for="(clause, idx) in item" class="item">
                <img v-if="index != currentIndex[0] || idx != currentIndex[1]" :src="clause.pic96x96Url">
                <img v-else :src="clause.pic56x56Url">
                <p v-if="index != currentIndex[0] || idx != currentIndex[1]">{{clause.name}}</p>
                <p v-else class="active">{{clause.name}}</p>
            </div>
        </div>
    </div>
</template>
<style lang='less'>
    .transceiver-type{
        width: 100%;
        text-align: center;
        overflow: hidden;
        .list{
            overflow: hidden;
            height: 100px;
            .item{
                float: left;
                width: 14.1%;
                cursor: pointer;
                img{
                    width: 50px;
                }
                p{
                    margin-top: 10px;
                    font-size: 14px;
                }
                .active{
                    color: #c34944;
                }
            }
        }
    }
</style>
<script>
    import server from '../http';
    export default {
        data(){
            return{
                detailLength: 7,            // 需要分的长度
                list: [],
                currentIndex: []
            }
        },
        methods: {
            init() {
                try{
                    const _this = this;
                    server.getdjcatelist()
                    .then(res=>{
                        _this.list = res.categories;
                        _this.select(0,0, _this.list[0].id);
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                } catch(error) {
                    console.log(error)
                }
            }, 
            arrSlice(orgArr) {
                try{
                    const _this = this;
                    let size = _this.detailLength;
                    if (isNaN(size) || size < 1 || size >= orgArr.length) {
                        return orgArr;
                    }
                    let newArr = [];
                    for (let i = 0, len = orgArr.length; i < len; i += size) {
                        newArr.push(orgArr.slice(i, i+size));
                    }
                    return newArr;
                } catch(error) {
                    console.log(error)
                }
            }, 
            select(index, count, id) {
                try{
                    const _this = this;
                    _this.$set(_this.currentIndex, 0, index);
                    _this.$set(_this.currentIndex, 1, count);
                    _this.$emit('select', id)
                } catch(error) {
                    console.log(error)
                }
            }, 
        },
        computed:{
            listDetail(){
                return this.arrSlice(this.list);
            }
        },
        created(){
            this.init();
        },
    }
</script>