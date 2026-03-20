<script lang="ts">
import { mapStores } from 'pinia';
import { useApplicationStore } from '@/stores/ApplicationStore';

import NavBarTitle from '@/components/base/NavBarTitle.vue';

export default {
  name: 'AboutView',
  components: {
    NavBarTitle,
  },
  computed: {
    ...mapStores(useApplicationStore),
    appTitle: function () {
      return 'cDirector v' + this.applicationStore.appVersion;
    },
  },
};
</script>

<template>
  <BNavbar
    toggleable="md"
    fixed="bottom"
    variant="dark"
    v-b-color-mode="'dark'"
  >
    <BNavbarToggle target="bottom-collapse" />
    <BCollapse id="bottom-collapse" is-nav>
      <BNavbarNav justified style="width: 100%" align="left">
        <BNavItem to="Options">
          <BButton>Options</BButton>
        </BNavItem>
      </BNavbarNav>
      <NavBarTitle :title="appTitle" />
      <BNavbarNav justified style="width: 100%" align="center">
        <BNavText
          >{{ applicationStore.name }} '{{ applicationStore.edition }}' v{{
            applicationStore.version
          }}
          &copy; {{ applicationStore.companyName }}</BNavText
        >
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>
