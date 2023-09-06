<template>
  <h1 class="mb-4">
    Crear Nuevo Estudiante
    <router-link to="/">
      <button class="btn btn-danger">Regresar</button>
    </router-link>
  </h1>
  <div class="container" id="lista">
    <div class="card">
      <div class="card-header">
        <h4 class="mb-0">Ingresa tus datos</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="createStudent">
          <div class="form-group">
            <label for="name" class="custom-label">Nombre:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="newStudent.name"
              
            />
          </div>
          <div class="form-group">
            <label for="age" class="custom-label">Edad:</label>
            <input
              type="number"
              class="form-control"
              id="age"
              v-model="newStudent.age"
              
            />
          </div>
          <br />
          <button type="submit" class="btn btn-success">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.custom-label {
  text-align: left !important;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      newStudent: {
        name: "",
        age: null,
      },
    };
  },
  methods: {
    createStudent() {
      // Validar si los campos están vacíos
      if (!this.newStudent.name || !this.newStudent.age) {
        Swal.fire({
          icon: "error",
          title: "Campos vacíos",
          text: "Por favor, complete todos los campos antes de enviar.",
        });
        return; // No continuar con la solicitud si hay campos vacíos
      }

      axios
        .post(
          "https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/students",
          this.newStudent,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U",
            },
          }
        )
        .then((response) => {
          console.log("Estudiante creado:", response.data);

          Swal.fire({
            icon: "success",
            title: "Estudiante creado",
            text: "El estudiante se ha creado exitosamente.",
          }).then(() => {
            this.$router.push("/");
          });
        })
        .catch((error) => {
          console.error("Error al crear estudiante:", error);
        });
    },
  },
};
</script>
