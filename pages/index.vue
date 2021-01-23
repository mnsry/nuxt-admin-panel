<template>
  <v-row>
    <v-col cols="12">
      <p class="text-center mt-5">
        <img
          class="hidden-sm-and-down"
          src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg"
          alt="Laravel"
          width="300"
        />
        <img
          class="img-fluid"
          src="/images/nuxt.png"
          alt="Nuxt.js"
          width="120"
        />
      </p>
    </v-col>

    <v-col cols="12">
      <p class="text-center">
        <a href="https://discord.gg/pJBWehRQud" target="_blank">
          <img src="/images/discord.png" width="118" alt="discord" />
        </a>
        <a href="https://github.com/mnsry" target="_blank">
          <img src="/images/github.png" width="122" alt="github" />
        </a>
        <a href="https://laranuxt.ir" target="_blank">
          <img src="/images/www.png" width="111" alt="laranuxt" />
        </a>
        <a
          href="https://www.youtube.com/playlist?list=PLXChBR5rCkrheZRydB6C-ohLMGL1Q6gGz"
          target="_blank"
        >
          <img src="/images/youtube.png" width="111" alt="youtube" />
        </a>
        <a href="https://opensource.org/licenses/MIT" target="_blank">
          <img src="/images/license.png" width="98" alt="License" />
        </a>
      </p>
    </v-col>

    <v-col cols="12">
      <p class="text-center">
        -= پنل ادمین با لاراول و ناکست جی اس و ویوتی فای =-
      </p>
    </v-col>

    <v-col cols="12">
      <p class="text-center">
        <v-btn color="blue" outlined :to="{ name: 'panel' }">
          برای ورود به پنل کلیک کنید!
        </v-btn>
      </p>
    </v-col>

    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6">
        <v-card color="rgba(0,0,0,.1)" class="mx-auto text-center" width="300">
          <v-card-subtitle class="title">ورود با اکانت ادمین</v-card-subtitle>
          <v-card-text class="pt-5">
            <v-text-field
              prepend-icon="mdi-email"
              label="آدرس ایمیل"
              value="m@m.com"
              outlined
              disabled
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-key"
              label="کلمه عبور"
              value="password"
              outlined
              disabled
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card color="rgba(0,0,0,.1)" class="mx-auto text-center" width="300">
          <v-card-subtitle class="title"
            >ورود با اکانت کاربر عادی</v-card-subtitle
          >
          <v-card-text class="pt-5">
            <v-text-field
              prepend-icon="mdi-email"
              label="آدرس ایمیل"
              value="ali@ali.com"
              outlined
              disabled
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-key"
              label="کلمه عبور"
              value="password"
              outlined
              disabled
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12"></v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  head: {
    titleTemplate: '%s | صفحه اصلی',
  },
}
</script>
