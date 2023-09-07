<template>
  <div class="container mt-4">
    <h1>
      Detalles del Estudiante
      <router-link to="/">
        <button class="btn btn-danger">Regresar</button>
      </router-link>
    </h1>
    <div class="card" id="lista">
      <div class="card-header">
        <h4 class="mb-0">{{ student.name }}</h4>
        <p>Edad: {{ student.age }}</p>
      </div>
      <div class="card-body">
        <h2>Tareas</h2>
        <ul class="list-group">
          <li
            v-for="task in student.tasks"
            :key="task.id"
            class="list-group-item"
          >
            <p class="mb-1">Descripción: {{ task.description }}</p>

            <p class="mb-0">Calificación: {{ task.qualification }}</p>

            <input
              type="checkbox"
              v-model="task.isActive"
              @change="cambiarEstadoTarea(task)"
            />
            <span v-if="task.isActive">Activa</span>
            <span v-else>Cancelada</span>

            <button @click="editarTarea(task)" class="btn btn-primary">
              Editar
            </button>
            <button @click="eliminarTarea(task)" class="btn btn-danger">
              Eliminar Tarea
            </button>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="newTaskDescription"
            placeholder="Descripción de la nueva tarea"
          />
          <div class="input-group-append">
            <button @click="crearNuevaTarea" class="btn btn-primary">
              Crear Nueva Tarea
            </button>
          </div>
        </div>
      </div>
    </div>

    <br /><br />
  </div>

  <div class="container">
    <div class="card">
      <div class="card-header">
        <h2>Editar Tarea</h2>
      </div>
      <div class="card-body">
        <div v-if="editingTask">
          Nombre:<input
            type="text"
            v-model="editingTask.description"
            placeholder="Nueva descripción"
          />
          <select v-model="editingTask.statusCopy.id">
            <option
              v-for="status in statuses"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }}
            </option>
          </select>

          Calificacion:
          <input
            v-if="editingTask.statusCopy.id !== 4"
            type="number"
            v-model="editingTask.qualification"
            placeholder="Calificación"
            @input="validateQualification"
          />

          <button class="btn btn-warning" @click="guardarTareaEditada">
            Guardar
          </button>
          &nbsp;
          <button class="btn btn-danger" @click="cancelarEdicionTarea">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>

  <br /><br /><br /><br /><br />
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      student: {},
      newTaskDescription: "",
      statuses: [],
      editingTask: null,
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U",
      auth: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U",
    };
  },
  methods: {
    async cargarDetallesEstudiante() {
      const studentId = this.$route.params.id;

      try {
        const response = await fetch(
          `https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/students?id=eq.${studentId}&select=*,tasks(*,status(*))`,
          {
            headers: {
              Authorization: this.auth,
              apikey: this.apiKey,
            },
          }
        );

        if (response.ok) {
          const studentData = await response.json();
          this.student = studentData[0];
        } else {
          console.error(
            "Error al obtener detalles del estudiante:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener detalles del estudiante:", error);
      }
    },
    async crearNuevaTarea() {
      const studentId = this.$route.params.id;
      const nuevaTarea = {
        description: this.newTaskDescription,
        student_id: studentId,
        status_id: 1, // Cambia esto al estado deseado
        qualification: null,
      };

      try {
        const response = await fetch(
          "https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.auth,
              apikey: this.apiKey,
            },
            body: JSON.stringify(nuevaTarea),
          }
        );

        if (response.ok) {
          console.log("Tarea creada exitosamente");
          this.cargarDetallesEstudiante();
          this.newTaskDescription = "";
        } else {
          console.error("Error al crear una nueva tarea:", response.statusText);
        }
      } catch (error) {
        console.error("Error al crear una nueva tarea:", error);
      }
    },
    editarTarea(task) {
      this.editingTask = {
        ...task,
        statusCopy: { ...task.status },
      };
    },
    cancelarEdicionTarea() {
      this.editingTask = null;
    },
    
  validateQualification() {
    if (this.editingTask.qualification < 0) {
      // Si la calificación es negativa, establecerla en 0
      this.editingTask.qualification = 0;
    }
  },
    async cambiarEstadoTarea(task) {
      const taskId = task.id;

      try {
        const response = await fetch(
          `https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/tasks?id=eq.${taskId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.auth,
              apikey: this.apiKey,
            },
            body: JSON.stringify({
              status_id: task.isActive ? 1 : 4, // 1 para activo, 4 para cancelado
            }),
          }
        );

        if (response.ok) {
          console.log("Estado de la tarea actualizado exitosamente");
          // Mostrar SweetAlert de éxito
          Swal.fire({
            title: "Estado de la Tarea Actualizado",
            text: `La tarea se ha ${
              task.isActive ? "activado" : "cancelado"
            } correctamente.`,
            icon: "success",
          });
        } else {
          console.error(
            "Error al actualizar el estado de la tarea:",
            response.statusText
          );
          // Mostrar SweetAlert de error
          Swal.fire({
            title: "Error",
            text: "Hubo un error al actualizar el estado de la tarea.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al actualizar el estado de la tarea:", error);
        // Mostrar SweetAlert de error
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el estado de la tarea.",
          icon: "error",
        });
      }
    },

    async guardarTareaEditada() {
      const task = this.editingTask;
      const { id, description, statusCopy, qualification } = task;

      try {
        const response = await fetch(
          `https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/tasks?id=eq.${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.auth,
              apikey: this.apiKey,
            },
            body: JSON.stringify({
              description,
              status_id: statusCopy.id,
              qualification:
                statusCopy.id === 1 || statusCopy.id === 2
                  ? qualification
                  : null,
            }),
          }
        );

        if (response.ok) {
          console.log("Tarea actualizada exitosamente");
          this.cargarDetallesEstudiante();
          this.editingTask = null;

          // Mostrar SweetAlert de éxito
          Swal.fire({
            title: "Tarea Actualizada",
            text: "La tarea se ha actualizado correctamente.",
            icon: "success",
          });
        } else {
          console.error("Error al actualizar la tarea:", response.statusText);

          // Mostrar SweetAlert de error
          Swal.fire({
            title: "Error",
            text: "Hubo un error al actualizar la tarea.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al actualizar la tarea:", error);

        // Mostrar SweetAlert de error
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar la tarea.",
          icon: "error",
        });
      }
    },
    eliminarTarea(task) {
      const taskId = task.id;

      Swal.fire({
        title: "¿Seguro que deseas eliminar esta tarea?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(
            `https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/tasks?id=eq.${taskId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: this.auth,
                apikey: this.apiKey,
              },
            }
          )
            .then((response) => {
              if (response.ok) {
                this.cargarDetallesEstudiante();
                Swal.fire({
                  title: "Tarea eliminada",
                  text: "La tarea se ha eliminado correctamente.",
                  icon: "success",
                });
              } else {
                console.error(
                  "Error al eliminar la tarea:",
                  response.statusText
                );
              }
            })
            .catch((error) => {
              console.error("Error al eliminar la tarea:", error);
            });
        }
      });
    },
    validateAge() {
      if (this.newStudent.age < 0) {
        // Si la edad es negativa, establecerla en 0
        this.newStudent.age = 0;
      }
    },
  },
  mounted() {
    this.cargarDetallesEstudiante();
  },
};
</script>
