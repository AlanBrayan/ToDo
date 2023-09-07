<template>
  <div class="container">
    <h1>Lista de Estudiantes</h1>
    <div class="card" id="lista">
      <div class="card-header">
        <h4 class="mb-0">Estudiantes</h4>
      </div>
      <div class="card-body">
        <StudentList :students="students" @deleteStudent="deleteStudent" />
      </div>
      <div class="card-footer text-muted">
        <CreateStudentButton />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StudentList from './StudentList.vue';
import CreateStudentButton from './CreateStudentButton.vue';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    fetchStudents() {
      axios
        .get('https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/students?select=*,tasks(*,status(*))', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U', // Reemplaza con tu token de autenticación.
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U', // Reemplaza con tu clave de API.
          },
        })
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error('Error al obtener estudiantes:', error);
        });
    },
    deleteStudent(studentId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al estudiante permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then(result => {
        if (result.isConfirmed) {
          axios
            .delete(`https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/students?id=eq.${studentId}`, {
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U', // Reemplaza con tu token de autenticación.
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U', // Reemplaza con tu clave de API.
              },
            })
                    
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Estudiante eliminado',
                text: 'El estudiante ha sido eliminado exitosamente.',
              });
              this.fetchStudents();
            })
            .catch(error => {
              console.error('Error al eliminar estudiante:', error);
            });
        }
      });
    },
  },
  components: {
    StudentList,
    CreateStudentButton,
  },
};
</script>

<style>
@import url('../styles/style.css');
</style>
