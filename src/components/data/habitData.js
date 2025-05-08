export const initialHabits = [
    { 
      id: 1, 
      title: "Beber 2L de agua", 
      category: "salud",
      streak: 5,
      days: [true, true, true, true, true, false, false],
      color: "#3182ce",
      completedDays: {
        "2025-04": [1, 3, 5, 7, 8, 10, 12, 15, 17, 20, 22, 25, 27, 29, 31] // Días del mes completados
      }
    },
    { 
      id: 2, 
      title: "Meditar 10 minutos", 
      category: "bienestar-mental",
      streak: 7,
      days: [true, true, true, true, true, true, true],
      color: "#805ad5",
      completedDays: {
        "2025-05": [2, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 22, 23, 25, 27, 29, 30]
      }
    },
    { 
      id: 3, 
      title: "Leer 20 páginas", 
      category: "desarrollo-personal",
      streak: 3,
      days: [true, true, true, false, false, false, false],
      color: "#dd6b20",
      completedDays: {
        "2025-04": [1, 2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 24, 29, 30, 31]
      }
    },
    { 
      id: 4, 
      title: "Ejercicio 30 minutos", 
      category: "fitness",
      streak: 4,
      days: [true, true, false, true, true, false, false],
      color: "#38a169",
      completedDays: {
        "2025-04": [1, 2, 4, 5, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 25, 26, 29, 30]
      }
    }
  ];
  