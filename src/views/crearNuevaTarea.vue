<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: {},
    };
  },
  methods: {
    crearNuevaTarea() {
      const studentId = this.$route.params.id;
      const nuevaTarea = {
        description: "Nueva tarea de prueba",
        student_id: studentId,
        status_id: 1
      };

      axios.post('https://tlqrendsvrgefxmmguml.supabase.co/rest/v1/tasks', nuevaTarea, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscXJlbmRzdnJnZWZ4bW1ndW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NjExODksImV4cCI6MjAwOTUzNzE4OX0.Jx6GrKpsNmjXNurY9ZGUJCNKBZYuPA61dehq8wCy2-U', 
        },
      })
      .then(response => {
        console.log('Tarea creada:', response.data);
        this.student.tasks.push(response.data);
      })
      .catch(error => {
        console.error('Error al crear una nueva tarea:', error);
      });
    },
  },
  mounted() {
    
  },
};
</script>
