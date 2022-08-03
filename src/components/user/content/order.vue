<template>

   <el-dialog v-model="centerDialogVisible" :title="title" width="450px" v-if="dialogData" :key="dialogData.orderid" center >
     <!-- {{dialogData}} -->
    <el-form
    :label-position="left"
    label-width="100px"
    :model="orderAfter"
    ref="orderRef"
    :rules="rules"
    style="max-width: 460px"
  >
    <el-form-item label="请输入原因">
      <el-input v-model="orderAfter.reason" :input-style='{width:"250px"}' placeholder="合理原因会更快通过~" />
    </el-form-item>
     <el-form-item v-if="title=='修改收货信息'" label="请选择地址">
  <el-select v-model="orderAfter.addressid"  fit-input-width='true' placeholder="Select">
    <el-option
      v-for="item in address"
      :key="item.addressid"
      :label="getLabel(item)"
      :value="item.addressid"
      :disabled="item.disabled"
    />
  </el-select>
   </el-form-item>
    <el-form-item v-if="title=='退款'" required label="请上传图片" prop="reasonimg">
             <el-upload
              :tip="点击修改头像"
              class="avatar-uploader"
              :http-request="upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >   
             <img style="width: 100px; height: 100px; border: 1px solid #e9e9e9;" v-if="orderAfter.reasonimg" :src="orderAfter.reasonimg" class="avatar">
              <el-icon v-else class="avatar-uploader-icon spxIcon"><Plus /></el-icon>
            </el-upload>
    
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false;  orderAfter={
          reason:'',
          tag:'',
          addressid:'',
          reasonimg:''      
       }" size='medium'>取消</el-button>
        <el-button size='medium' @click="submit()"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
  <div class="useraddressWrapper">
    <div class="addressheader">订单列表</div>
    <div class="addressContent" v-if="getOrder.length">
        <ul class="orderul">
        <!-- 购物车表头 -->
        <li class="header clear">
          <div class="orderid">订单编号</div>
          <div class="state">订单状态</div>
          <div class="price">支付金额</div>
          <div class="product">订单商品</div>
          <div class="ordertime">下单时间</div>
          <div class="action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li
          class="clear orderList"
          v-for="item in getOrder"
          :key="item.orderid"
        >
          <div class="orderid">
            {{item.orderid}}
          </div>
          <div class="state">
           {{ item.state }}
          </div>
          <div class="price">{{ item.orderprice}}元</div>
          <div class="product">
            <template v-for="(itemSon,index) in  item.order_products" :key="index">
              <div class="son">
                <div class="imgwrapper productInfo"><img :src="itemSon.imgdata" style="width:80px;height:80px;object-fit:cover;" alt=""></div>
                 <div class="productInfo center ptoductoption" >
                {{itemSon.productname}}({{itemSon.optionnow}})
              </div>
              <div class="productInfo productnumber ">×{{itemSon.productnumber}}</div>
              </div>
             
            </template>
           
          </div>
          <div class="ordertime">
             
          {{getTime(item.ordertime)}}
          </div>
          <div class="action">
            <ul>
              <li class="btn center" @click="checkOrder(item)">查看订单</li>
              <li class="btn center" @click="cancelOrder(item,'取消订单')" v-show="item.state!=='已完成'&&item.state!=='已退款'&&item.state!=='待审核'&&item.state!=='已取消'">取消订单</li>
              <li class="btn center" @click="cancelOrder(item,'修改收货信息')" v-show="item.state!=='已完成'&&item.state!=='已退款'&&item.state!=='待审核'&&item.state!=='已取消'">修改收货信息</li>
              <li class="btn center" @click="shouhuo(item,'确认收货')" v-show="item.state==='已发货'">确认收货</li>
              <li class="btn center" @click="cancelOrder(item,'退款')" v-show="item.state==='已完成'||item.state==='已发货'&&item.state!=='已取消'">申请退款</li>
         

            </ul>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
   
    
    </div>
    <div v-else><p>暂无订单</p></div>
  
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,onMounted,ref } from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import bus from "@/utils/bus"
import { Plus } from '@element-plus/icons-vue'
import Storage from '@/utils/storage'
export default defineComponent({
    components:{
    Plus
  },
  setup () {
    onMounted(()=>{
      bus.on('uploadAfter',(item:any)=>{
        orderAfter.value.reasonimg = 'http://localhost:8080/orderAfter/'+ item 
      })
       store.dispatch("OrderModule/getOrder", {phonenumber:Storage.getCache('userInfo',false)["phonenumber"],token:Storage.getCache("token",false)});
  
        
    })
       const router = useRouter();
    const store = useStore();
    const getTime= (item:any)=>{
      return item.split(' ')[0]
    }
    let getOrder: any = computed(() => {
      return store.state.OrderModule.orderAll;
    });
    const checkOrder = (item:any)=>{
      store.commit("OrderModule/changeorderNow",item);
      router.push({name:'orderDetail'})
    }
    const address = computed(()=>{
      return store.state.UserModule.userInfo?.address
    })
    const centerDialogVisible = ref(false)
    const dialogData = ref()
    const title = ref()
    const cancelOrder = (item:any,tag:any)=>{
      dialogData.value=item
      title.value = tag
      orderAfter.value.tag = tag;
        orderAfter.value.addressid = item.addressid 
      centerDialogVisible.value = true

    }
    let orderAfter = ref({
      reason:'',
      tag:'',
      addressid:'',
      reasonimg:''      
    })
    const orderRef = ref()
    const submit = ()=>{
       orderRef.value.validate((vaild:any) => {
         if(vaild){
          const item = dialogData.value
          store.dispatch("OrderModule/insertOrderAfter",{orderAfter:orderAfter.value,state:item.state,orderid:item.orderid,token:Storage.getCache('token',false),phonenumber:Storage.getCache('userInfo',false).phonenumber});
          setTimeout(()=>{
          orderAfter.value={
          reason:'',
          tag:'',
          addressid:'',
          reasonimg:''      
          }
          },1000)
          centerDialogVisible.value = false
         }
       },
       
     
       )
      
    }
    const getLabel =(item:any)=>{
       return `${item.ordername} ${item.address}(${item.ordername})`
    }
       const upload = (param:any)=>{

     const file = param.file
     console.log(param)
      let formdata = new FormData(); //创建form对象
      formdata.append('file',file);
        store.dispatch("OrderModule/uploadImgdata", {
            formdata,
            token:Storage.getCache('token',false)
                        }
          );

  } 
  const shouhuo = (item:any)=>{
store.dispatch("OrderModule/shouhuo",{orderid:item.orderid,token:Storage.getCache('token',false),phonenumber:Storage.getCache('userInfo',false).phonenumber});
  }
  
  const rules ={
      reasonimg: [
          { required: 'true', message: '请上传甜品图片', trigger: ['blur','change'] }
        ],
  }
    return {getOrder,getTime,checkOrder,centerDialogVisible,title,cancelOrder,dialogData,orderAfter,submit,address,getLabel,upload,orderRef,rules,shouhuo}
  }
})
</script>

<style scoped lang="scss">
::v-deep .el-upload .spxIcon{
  width: 100px;
    height: 100px;
    font-size: 55px;
}
  .useraddressWrapper{
    /* min-height: 500px; */
  }
  // ::v-deep.el-input.el-input--default.el-input--suffix{
  //       width: 200px;
  // }
  .addressheader{
    text-align: left;
    padding-left: 50px;
    height: 65px;
    line-height: 65px;
    font-size: 18px;
    background-color: #e5e5e5;
  }
  .addressContent{
    /* min-height: 500px; */
    margin-top: 10px;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;

  }
  .box{
    box-sizing: border-box;
    width:50%;
    height:120px;
    border: 1px solid #dadad8;
    background-color:#fff;
    text-align: left;
    padding-left: 20px;
    padding-top: 18px;
  }
  .orderPhonenumber{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
  }
  .phone{
    height: 50px;
    line-height: 50px;
  }
  .handle{
    padding-right: 20px;
  }
  .padleft{
    padding-right: 20px;
  }

  .addressContent .orderul {
  background-color: #fff;
  color: #424242;
}
/* 购物车表头及CSS */
.orderul{
  width: 100%;
}
.addressContent ul .header {
  height: 100px;
  /* height: 80px; */
  color: #424242;

  box-sizing: border-box;
}
  ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.orderid{
  width: 140px;
  /* float: left; */
}
.state{
  width:120px;
  /* float: left; */
}
li div{
  margin-left: 10px;
}
.price{
    width: 100px;
  /* float: left; */
}
.product{
  width: 400px;
  /* float: left; */
  /* border: 1px solid black; */
}
.ordertime{
  /* float: left; */
  width: 100px;
}
.action{
  /* float: left; */
  flex: 1;
  /* width: 100px; */
}
.son{
  width: 100%;
  display: flex;
  height: 80px;
  justify-content: center;
  padding-top: 5px;
  /* padding-left: 100px; */

}
.imgwrapper{
  width: 80px;

}
.imgwrapper img{
  width: 80px;
  object-fit: contain;
}
.productInfo{
  /* padding: 0px 5px; */
  /* width: 250px; */
}
.ptoductoption{
  width: 150px;

}
/* .clear::after{
  content: '';
  display: block;
  clear: both;
} */
.clear{
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

}
.orderList{
   border-top: 1px solid #e0e0e0;
   padding: 5px 0px;
}
.btn{
  font-size: 12px;
  height: 30px;
}
.btn:hover{
  cursor: pointer;
  background-color:#fdd23e ;
    color: #fff;
  border-radius: 5px;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;

}
.productnumber{
  text-align: left;
  line-height: 80px;
}
</style>