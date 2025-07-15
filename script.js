const cursos = {
  "Introducción a las Ciencias Veterinarias": [],
  "Fundamentos de la Química": [],
  "Biología Celular y Molecular": [],
  "Matemática": [],
  "Zoología": [],
  "Fundamentos de la Física": [],

  "Anatomía Animal I": ["Zoología"],
  "Praderas y Especies Forrajeras": ["Biología Celular y Molecular"],
  "Fundamentos de Bioquímica": ["Fundamentos de la Química"],
  "Histoembriología Veterinaria": ["Biología Celular y Molecular"],
  "Ecología": ["Matemática", "Zoología"],
  "Electivo 1": [],

  "Anatomía Animal II": ["Anatomía Animal I"],
  "Nutrición y Alimentación Animal": ["Praderas y Especies Forrajeras", "Fundamentos de Bioquímica"],
  "Fisiología Veterinaria": ["Fundamentos de Bioquímica", "Histoembriología Veterinaria"],
  "Práctica Inicial": ["Anatomía Animal I", "Ecología"],
  "Inmunología General": ["Biología Celular y Molecular","Fundamentos de Bioquímica"],
  "Bioestadística": ["Matemática"],
  "Electivo 2": [],

  "Etología y Bienestar Animal": ["Fisiología Veterinaria"],
  "Histopatología": ["Fisiología Veterinaria"],
  "Microbiología Veterinaria": ["Inmunología General"],
  "Conservación de Fauna Silvestre": ["Ecología"],
  "Métodos de Investigación en Salud": ["Bioestadística"],
  "Electivo 3": [],

  "Genética en Ciencias Veterinarias": ["Bioestadística"],
  "Epidemiología Veterinaria": ["Métodos de Investigación en Salud"],
  "Fisiopatología Veterinaria": ["Anatomía Animal II", "Histopatología"],
  "Gestión Ambiental y Desarrollo Sustentable": ["Conservación de Fauna Silvestre"],
  "Gestión Contable y Financiera": ["Bioestadística"],
  "Electivo 4": [],

  "Semiología veterinaria": ["Etología y Bienestar Animal", "Fisiopatología Veterinaria"],
  "Reproducción animal": ["Fisiopatología Veterinaria"],
  "Anatomía Patológica": ["Fisiopatología Veterinaria"],
  "Microbiología de los Alimentos": ["Microbiología Veterinaria", "Métodos de Investigación en Salud"],
  "Práctica Intermedia": ["Práctica Inicial", "Etología y Bienestar Animal"],
  "Electivo 5": [],

  "Sistemas de Producción Animal": ["Nutrición y Alimentación Animal", "Genética en Ciencias Veterinarias"],
  "Farmacología Veterinaria": ["Fisiopatología Veterinaria"],
  "Enfermedades producidas por agentes biológicos I": ["Epidemiología Veterinaria", "Microbiología de los Alimentos"],
  "Procedimientos clínicos": ["Semiología veterinaria"],
  "Imagenología": ["Anatomía Patológica"],
  "Inteligencia artificial aplicada a la salud": ["Bioestadística"],

  "Laboratorio clínico y biotecnología": ["Anatomía Patológica", "Enfermedades producidas por agentes biológicos I"],
  "Investigación en Ciencias Veterinarias": ["Farmacología Veterinaria", "Métodos de Investigación en Salud"],
  "Enfermedades producidas por agentes biológicos II": ["Enfermedades producidas por agentes biológicos I"],
  "Principios de cirugía y anestesiología": ["Farmacología Veterinaria", "Procedimientos clínicos"],
  "Medicina interna": ["Semiología veterinaria", "Imagenología"],
  "Bioética": [],

  "Salud Pública Veterinaria": ["Enfermedades producidas por agentes biológicos II"],
  "Unidad de Investigación I": ["Investigación en Ciencias Veterinarias", "Bioética"],
  "Internado de Pequeños Animales I": ["Principios de cirugía y anestesiología", "Medicina interna", "Laboratorio clínico y biotecnología"],
  "Internado de Animales Mayores I": ["Principios de cirugía y anestesiología", "Medicina interna", "Laboratorio clínico y biotecnología"],
  "Formulación y Evaluación de Proyectos Veterinarios": ["Gestión Contable y Financiera", "Sistemas de Producción Animal"],
  "Gestión Veterinaria": ["Gestión Contable y Financiera", "Sistemas de Producción Animal"],
  "Práctica Profesional": [],
  "Obtención de licenciatura": [],

  "Una Salud": ["Formulación y Evaluación de Proyectos Veterinarios", "Salud Pública Veterinaria"],
  "Unidad de Investigación II": ["Unidad de Investigación I"],
  "Internado Electivo: Pequeños Animales II": [],
  "Internado Electivo: Animales Mayores II": [],
  "Internado Electivo: Conservación, Biodiversidad y Medio Ambiente": [],
  "Internado Electivo: Producción y Sistemas de Aseguramiento de la Calidad": [],
  "Orientación Laboral y Responsabilidad Ética en Medicina Veterinaria": ["Práctica Intermedia"]
};

const estado = {};
const contenedor = document.getElementById("malla");

function crearBotones() {
  for (const curso in cursos) {
    const div = document.createElement("div");
    div.className = "curso locked";
    div.textContent = curso;
    div.dataset.nombre = curso;
    estado[curso] = { aprobado: false, nodo: div };
    contenedor.appendChild(div);
  }
}

function actualizarEstado() {
  for (const curso in cursos) {
    const requisitos = cursos[curso];
    const todosAprobados = requisitos.every(req => estado[req]?.aprobado);
    const cursoEstado = estado[curso];
    if (!cursoEstado.aprobado && todosAprobados) {
      cursoEstado.nodo.classList.remove("locked");
    }
  }
}

function manejarClick(e) {
  const curso = e.target.dataset.nombre;
  if (!curso || estado[curso].aprobado) return;
  const requisitos = cursos[curso];
  const cumplidos = requisitos.every(r => estado[r]?.aprobado);
  if (!cumplidos) return;

  estado[curso].aprobado = true;
  estado[curso].nodo.classList.add("aprobado");
  estado[curso].nodo.classList.remove("locked");
  actualizarEstado();
}

crearBotones();
actualizarEstado();
contenedor.addEventListener("click", manejarClick);

