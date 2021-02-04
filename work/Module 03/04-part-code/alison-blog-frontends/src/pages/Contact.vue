<template>
  <Layout>
    <div class="container">
      <div class="contact-header">
        <h1 class="contact-title">Say hi!</h1>
        <p>
          Leave me a note with any questions you might have, I'll get back to
          you as soon as possible.
        </p>
      </div>
      <form name="contact" class="contact-form" @submit.prevent="submit">
        <div class="sender-info">
          <div>
            <label for="name" class="label">Your name</label
            ><input v-model="form.name" type="text" name="name" />
          </div>
          <div>
            <label for="email" class="label">Your email</label
            ><input v-model="form.email" type="email" name="email" />
          </div>
        </div>
        <div class="message">
          <label for="message" class="label">Message</label
          ><textarea v-model="form.message" name="message"></textarea>
        </div>
        <button type="submit" class="button">Submit form</button>
      </form>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";

export default {
  name: "Contact",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.GRIDSOME_API_URL}/contacts`,
          data: this.form,
        });
        alert("发送成功");
        this.$router.push("/");
      } catch (err) {
          throw new Error(err)
      }
    },
  },
};
</script>

<style>
.contact-header {
  padding: 2rem 0 4rem;
}
.contact-title {
  font-size: 4rem;
  margin: 0 0 4rem;
  padding: 0;
}
.sender-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.sender-info > div {
  flex: 1;
  margin-right: 4rem;
}

.sender-info > div:last-of-type {
  margin: 0;
}

.button {
  color: var(--color-base);
  background: var(--color-contrast);
  outline: none;
  border: 0;
  font-size: 0.8rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.3rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: opacity 0.25s ease;
  font-size: 500;
  letter-spacing: 0.035em;
}
</style>