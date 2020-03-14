<template>
  <section>
    <v-container>
      <v-row>
        <v-col class="px-12">
          <v-alert class="mx-12" text type="error" icon="mdi-alert-circle-outline">
            <div class="title">Danger zone</div>
            This site is supposed for testing only and contains the latest <b>unstable</b> features of the library
            <div class="text-center pt-5">
              <v-chip class="ml-3" color="primary">
                <span class="white--text">{{ version }}</span>
              </v-chip>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <test-examples />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import packageInfo from "../../package";
import TestExamples from "@/components/TestFeatures/TestExamples";
export default {
  name: "TestFeatures",
  components: { TestExamples },
  computed: {
    version() {
      const testPackage = packageInfo.dependencies["vue-ellipse-progress-test"];
      return testPackage.slice(testPackage.search("@") + 1).replace("^", "");
    }
  },
  mounted() {
    console.log(this.$root);
  }
};
</script>

<style scoped></style>
