<template>
  <Form
    class="container w-50 form-group"
    @submit="submitService"
    :validation-schema="serviceFormSchema"
  >
    <div>
      <label for="service_name">Tên dịch vụ:</label>
      <Field
        name="service_name"
        type="text"
        class="form-control"
        v-model="serviceLocal.service_name"
      />
      <ErrorMessage name="service_name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="service_categories">Thuốc đính kèm:</label>
      <Field
        name="service_categories"
        type="service_categories"
        class="form-control"
        v-model="serviceLocal.service_categories"
      />
      <ErrorMessage name="service_categories" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Đơn giá:</label>
      <Field
        min="1000"
        name="price"
        type="number"
        class="form-control"
        v-model="serviceLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="image">Hình ảnh:</label>
      <Field
        name="image"
        type="file"
        class="form-control"
        v-model="serviceLocal.image"
      />
      <ErrorMessage name="image" class="error-feedback" />
    </div>

    <div class="form-group">
      <button
        v-if="serviceLocal._id"
        type="button"
        class="ml-2 btn btn-danger w-25 float-right"
        @click="deleteService"
      >
        Xóa
      </button>
      <button class="btn btn-primary float-right w-25">Lưu</button>
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
  emits: ["submit:service", "delete:service"],
  props: {
    service: { type: Object, required: true },
  },
  data() {
    const serviceFormSchema = yup.object().shape({
      service_name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      service_categories: yup
        .string()
        .required("Tên thuốc đính kèm không được rỗng"),

      price: yup.string().required("Vui lòng nhập đơn giá"),
      image: yup.string().required("Vui lòng thêm ảnh"),
    });
    return {
      serviceLocal: this.service,
      serviceFormSchema,
    };
  },
  methods: {
    submitService() {
      const formData = new FormData();
      formData.append("service_name", this.serviceLocal.service_name);
      formData.append(
        "service_categories",
        this.serviceLocal.service_categories
      );
      formData.append("price", this.serviceLocal.price);
      formData.append("image", this.serviceLocal.image);
      this.$emit("submit:service", formData);
    },
    deleteService() {
      this.$emit("delete:service", this.serviceLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
