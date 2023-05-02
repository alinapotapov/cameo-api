<template>
  <header class="header">CAMEO</header>
  <Transition name="vacationModal">
    <div v-if="openModalWindow" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal" ref="target">
          <div>
            <div class="modal-header">
              <p v-if="actionType == 'add'">Add new name</p>
              <p v-if="actionType == 'update'">Update name</p>
            </div>
          </div>
          <div style="height: 100%; margin-top: 5px">
            <el-row> </el-row>
          </div>
          <el-input v-model="input" inputmode="{{ input }}" />
          <div class="modal-footer">
            <el-tooltip
              content="You can't use only digits, or _ , or name more than 16 symbols"
              placement="top"
            >
              <span>
                <el-button
                  type="success"
                  plain
                  title="Saves the current document"
                  :disabled="inputValidation()"
                  @click="checkActionType(actionType, nameIndex)"
                >
                  Save
                </el-button>
              </span>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <el-row class="mb-4">
    <el-button
      class="devider"
      @click="clickOnAllNamesButton"
      type="primary"
      plain
      >All names</el-button
    >

    <el-tooltip placement="top">
      <template #content> Choose the count of names</template>
      <el-button class="devider" type="success" @click="clickOnRandomName"
        >Random name -<font-awesome-icon :icon="['fas', 'shuffle']" spin
      /></el-button>
    </el-tooltip>
    <el-input-number
      v-show="isRandomNameButtonSelected"
      v-model="counterNum"
      :min="1"
      :max="allNamesList.length"
      @change="handleChange"
    />
  </el-row>

  <div class="table">
    <el-table
      :data="randomNamesList"
      style="width: 40%"
      v-show="isRandomNameButtonSelected"
    >
      <el-table-column prop="name" label="Name" />
    </el-table>
  </div>

  <div class="table">
    <el-table
      :data="allNamesList"
      style="width: 60%"
      v-show="isAllNameButtonSelected"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" width="120">
        <template #default="scope">
          <el-button
            @click.prevent="deleteNameFromList(scope.$index)"
            type="primary"
            :icon="Delete"
          />
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="120">
        <template #default="scope">
          <el-button
            @click.prevent="openAddModal('update', scope.$index)"
            type="primary"
            :icon="Edit"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="addButton">
    <div>
      <el-button
        type="info"
        style="width: 60%"
        class="addButton"
        v-show="isAllNameButtonSelected"
        @click="openAddModal('add')"
      >
        Add <font-awesome-icon :icon="['fal', 'plus']"
      /></el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import {
  getAllNames,
  deleteName,
  createName,
  updateName,
  getName,
} from "@/service/api";
import { onClickOutside } from "@vueuse/core";

const input = ref("");
const actionType = ref("");
const nameIndex = ref(0);
const target = ref(null);
const openModalWindow = ref(false);
const allNamesList = ref([]);
const counterNum = ref(1);
const randomNamesList = ref([]);
const isAllNameButtonSelected = ref(false);
const isRandomNameButtonSelected = ref(false);

onClickOutside(target, () => (openModalWindow.value = false));
const inputValidation = (): boolean => {
  return (
    input.value.match(/^[0-9]+$/) != null ||
    input.value.length > 16 ||
    input.value.includes("_") ||
    input.value.length == 0
  );
};

const checkActionType = async (action: string, index: number) => {
  action == "update"
    ? updateName(allNamesList.value.at(index).name, input.value)
    : addNameToList(input.value);
  openModalWindow.value = false;

  allNamesList.value.at(index).name = input.value;
};

const openAddModal = (action: string, index: number) => {
  input.value = "";
  openModalWindow.value = true;
  actionType.value = action;
  nameIndex.value = index;
};

const handleChange = async (value: number) => {
  clickOnRandomName();
};

watch(allNamesList.value, () => {});

const deleteNameFromList = async (index: number) => {
  deleteName(JSON.stringify(allNamesList.value.at(index)));
  allNamesList.value.splice(index, 1);
};

const addNameToList = (name) => {
  if (allNamesList.value.some((x) => x.name === name)) return;
  else {
    allNamesList.value.push({ name: name });
    createName(name);
  }
};
onMounted(async () => {
  var allNames = await getAllNames();
  allNames.data.map((name) => allNamesList.value.push(name));
});

const clickOnRandomName = async () => {
  randomNamesList.value = [];
  isRandomNameButtonSelected.value = true;
  isAllNameButtonSelected.value = false;
  const randomNames = await getName(counterNum.value);
  randomNames.data.map((name) => randomNamesList.value.push(name));
};
const clickOnAllNamesButton = async () => {
  allNamesList.value = [];
  isRandomNameButtonSelected.value = false;
  isAllNameButtonSelected.value = true;
  var allNames = await getAllNames();
  allNames.data.map((name) => allNamesList.value.push(name));
};
</script>

<style>
.modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: #00000094;
  z-index: 999;
  padding: 390px;
}

.ml-4 {
  margin-top: 10px;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.devider {
  margin-top: 0;
  color: #000e08;
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 16px;
  margin: 10px;
}
.remainVacation {
  margin-top: 5px;
}

.w-50 {
  width: 54px;
}

.demo-time-range {
  margin: auto;
  align-items: center;
}

.vacationModal {
  width: 90px;
}

.modal {
  width: 500px;
  margin: 0px auto;
  padding: 3em;
  background-color: white;
  border-radius: 10px;
  box-shadow: #67c23a 0px 1px 10px, #f0f9eb 0px 10px 20px, #f0f9eb 0px 4px 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-header {
  color: #000e08;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
}

.grid-content {
  margin: 15px;
  align-items: flex-end;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  text-align: center;
  float: right;
  margin-right: 20px;
  width: 60px;
  height: 32px;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: #ffffff;
}

.modal-enter-from {
  opacity: 0;
}
.modal-footer {
  position: relative;
  padding-left: 90%;
  margin-top: 25px;
  pointer-events: auto;
}
.modal-leave-to {
  opacity: 0;
}
.el-row {
  align-items: center;
}
hr.new1 {
  margin-top: 2px;
  border-top: 1px solid #67c23a;
}
.timechecker {
  font-style: normal;
  font-size: medium;
  padding-left: 120px;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.header {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: x-large;
  font-weight: 500;
  padding-bottom: 15px;
}
.table {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
}

.mb-4 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.devider {
  padding: 30px;
  margin: 20px;
  align-items: center;
}
.addButton {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  margin: 20px;
}
.button {
  box-shadow: 5px 5px #e3dede;
}
</style>
