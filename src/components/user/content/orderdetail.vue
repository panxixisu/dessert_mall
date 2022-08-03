<template>
  <el-card class="order-container">
    <div class="data">
       <el-descriptions
        title="订单详情"
        direction="vertical"
        :column="4"
        :size="size"
        border
      >
    <el-descriptions-item label="订单状态"> {{ data.state }}</el-descriptions-item>
    <el-descriptions-item label="创建时间">  {{ data.ordertime }}</el-descriptions-item>
    <el-descriptions-item label="订单号" :span="2"> {{ data.orderid }}</el-descriptions-item>
    <el-descriptions-item label="收货人"> {{ data.ordername }}</el-descriptions-item>
    <el-descriptions-item label="收货手机">  {{ data.orderphonenumber }}</el-descriptions-item>
    <el-descriptions-item label="收货地址" :span="2"> {{ data.address }}</el-descriptions-item>
  </el-descriptions>
    </div>
    <el-table
      :data="data.order_products"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        label="甜品图片"
      >
        <template #default="scope">
          <img style="width: 100px" :key="scope.row.orderproductid" :src="scope.row.imgdata" alt="甜品主图">
        </template>
      </el-table-column>
      <el-table-column
        prop="optionnow"
        label="甜品规格"
      >
      </el-table-column>
      <el-table-column
        prop="productname"
        label="甜品名"
      ></el-table-column>
      <el-table-column
        prop="productnumber"
        label="甜品数量"
      >
      </el-table-column>
      <el-table-column
        label="甜品单价"
      >    <template #default="scope">
           {{getPrice(scope.row.productid)}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <div style="width:100%;height:50px;background-color: #f0f2f5;"></div>
  <el-card v-if="data.orderAfters&&data.orderAfters.length!=0">
       <template #header>
      <div class="card-header">
        <span>协商历史</span>
      </div>
    </template>
      <el-table
      :data="data.orderAfters"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        label="图片"
      >
        <template #default="scope">
          <img style="width: 100px" v-if="scope.row.reasonimg" :src="scope.row.reasonimg" alt="甜品主图">
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提交操作"
      >
        <template #default="scope">
           <span>申请{{scope.row.tag}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reason"
        label="申请理由"
      ></el-table-column>
      <el-table-column
        prop="takeres"
        label="审核状态"
      >
      </el-table-column>
      <el-table-column
        label="审核结果"
      >  <template #default="scope">
          <span v-if="scope.row.isallow==null||scope.row.isallow==''">暂未审核</span>
          <span v-else>{{scope.row.isallow =='0'?"已拒绝":"已同意"}}</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="answertext"
        label="商家回应"
      >
      </el-table-column>
        <el-table-column
        prop="refund"
        label="退款金额(元)"
      >
      </el-table-column>
    </el-table>
  </el-card>
 
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Storage from '@/utils/storage'
export default {
  name: 'OrderDetail',
  setup() {
    const route = useRoute()
     const store = useStore();
    const data = computed(()=>{
      return store.state.OrderModule.orderNow

    })
    const getPrice = (id)=>{
      let obj = store.state.ProductModule.product.find((item)=>{
        // console.log(item)
       return item.productid == id
      })
      return obj.price+'元'
    }
   const getResult =(item)=>{
     if(item==0){
       return '拒绝'
     }
     return '已同意'
   }

    return {
      data,
      getPrice,
      getResult
    }
  }
}
</script>

<style scoped>
  .data {
    margin-bottom: 50px; 
  }

  .el-table {
    border: 1px solid #EBEEF5;
    border-bottom: none;
  }
  .has-gutter th {
    border-right: 1px solid #EBEEF5;
  }

  .has-gutter th:last-child {
    border-right: none;
  }
  .el-table__row td {
    border-right: 1px solid #EBEEF5;
  }
  .el-table__row td:last-child {
    border-right: none;
  }
</style>