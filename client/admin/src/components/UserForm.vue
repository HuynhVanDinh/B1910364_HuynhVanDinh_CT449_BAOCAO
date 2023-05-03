<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="form-group">
      <label for="username">Họ tên bệnh nhân: </label>
      <Field
        name="username"
        type="text"
        class="form-control"
        v-model="userLocal.username"
      />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="userLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="address">Địa chỉ:</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="userLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại:</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="userLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <!-- <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="userLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div> -->
    <div class="form-group">
      <button class="btn btn-primary w-100">Lưu</button>
      <button
        v-if="userLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteUser"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user", "delete:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .required("Email không được rỗng")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup
        .string()
        .max(100, "Địa chỉ tối đa 100 ký tự.")
        .required("Vui lòng nhập địa chỉ"),
      phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // userLocal để liên kết với các input trên form
      userLocal: this.user,
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    deleteUser() {
      this.$emit("delete:user", this.userLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
