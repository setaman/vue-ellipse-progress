<template>
  <section>
    <v-container>
      <v-row dense>
        <v-col cols="12" class="px-lg-12 px-md-12">
          <v-alert class="mx-lg-12 mx-md-12 mx-sm-0" text type="error" icon="mdi-alert-circle-outline">
            <div class="title">Danger zone</div>
            This site is supposed for testing only and contains the latest <b>unstable</b> features of the library
            <v-divider class="my-4 info" style="opacity: 0.22;"></v-divider>

            <v-row align="center" no-gutters>
              <v-spacer></v-spacer>
              <v-col class="shrink">
                <v-btn to="/" color="primary">
                  go home
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <v-col class="mx-lg-12 mx-md-12 mb-12">
          <v-alert class="mx-lg-12 mx-md-12 mx-sm-0" text color="info">
            <div class="text-center">
              <v-chip class="ml-3" outlined color="info">
                <span class="white--text">{{ version }}</span>
              </v-chip>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <test-examples />
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
    },
  },
};
</script>

<style scoped></style>
