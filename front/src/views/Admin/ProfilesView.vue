<script lang="ts" setup>
import ComponentHeader from "@/components/ComponentHeader.vue";
import ComponentSidebarInner from "@/components/sidebar/ComponentSidebarInner.vue";

import ComponentPagination from "@/components/ComponentPagination.vue";
import ModalConfirm from "@/components/modais/ModalConfirm.vue";
import ActionsTableComponent from "@/components/tables/ComponentActionsTable.vue";
import ComponentTable from "@/components/tables/ComponentTable.vue";
import ComponentToastError from "@/components/toasts/ComponentToastError.vue";
import ComponentToastSuccess from "@/components/toasts/ComponentToastSuccess.vue";
import { useProfileStore } from "@/store/modules/admin/profilesModule";

const store = useProfileStore()
store.get(0)
</script>
<script lang="ts">
import util from "@/mixins/util";

export default {
  data() {
    return {
      text: ["admin", "profiles", "list"],
      editing: {
        id: "",
        name: ""
      },
      deleteId: '',
      links: [],
      tableHeader: ["name", "dateCreated", "actions"]
    }
  },
  methods: {
    openEdit(id: string) {
      this.$router.push({ path: '/admin/profile/' + id })
    },
    openConfirmDeleteModal(id: string) {
      this.deleteId = id;
    },
  },
  mixins: [util]
}
</script>

<template>
  <ModalConfirm @delete="store.delete(deleteId)"/>
  <ComponentToastSuccess message="success"/>
  <ComponentToastError/>
  <ComponentHeader inner :text="text"/>
  <main>
    <div class="col-3">
      <ComponentSidebarInner :links="store.links" title="profiles"/>
    </div>
    <div class="col-8 card ">
      <div class="card-header">
        <h2 class="text-center py-2">{{ $t("profiles") }}</h2>
      </div>
      <div class="card-body">
        <ComponentTable :table-header="tableHeader" :table-data="store.profiles">
          <tr v-for="profile in store.profiles" :key="profile.id">
            <td>{{ profile.name }}</td>
            <td>{{ $d(Date.parse(profile.dateCreated.toString())) }}</td>
            <ActionsTableComponent :modal="false" :data="profile" @edit="openEdit" @delete="openConfirmDeleteModal"/>
          </tr>
        </ComponentTable>
      </div>
      <div class="card-footer">
        <ComponentPagination @changePagination="store.get" :total-pages="store.totalPages" :page="store.page" back="admin"/>
      </div>
    </div>
  </main>
</template>


<style scoped>

hr {
  stroke-width: 1px;
  stroke: #E8E8E8;
}
</style>