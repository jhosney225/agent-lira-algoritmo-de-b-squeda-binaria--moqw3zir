```javascript
// Algoritmo de Búsqueda Binaria con Visualización
// Archivo: index.js

const readline = require('readline');

// Clase para manejar la búsqueda binaria
class BusquedaBinaria {
  constructor(arreglo) {
    this.arreglo = arreglo.sort((a, b) => a - b);
    this.pasos = [];
    this.encontrado = false;
    this.indiceEncontrado = -1;
  }

  buscar(objetivo) {
    this.pasos = [];
    this.encontrado = false;
    this.indiceEncontrado = -1;

    let izquierda = 0;
    let derecha = this.arreglo.length - 1;
    let iteracion = 0;

    while (izquierda <= derecha) {
      iteracion++;
      const medio = Math.floor((izquierda + derecha) / 2);
      const valorMedio = this.arreglo[medio];

      // Registrar el paso
      this.pasos.push({
        iteracion,
        izquierda,
        derecha,
        medio,
        valorMedio,
        objetivo,
        arregloActual: [...this.arreglo],
        descripcion: `Comparando ${valorMedio} con ${objetivo} (posición ${medio})`
      });

      if (valorMedio === objetivo) {
        this.encontrado = true;
        this.indiceEncontrado = medio;
        return medio;
      } else if (valorMedio < objetivo) {
        izquierda = medio + 1;
      } else {
        derecha = medio - 1;
      }
    }

    return -1;
  }

  visualizar() {
    console.log('\n' + '='.repeat(80));
    console.log('VISUALIZACIÓN DE BÚSQUEDA BINARIA');
    console.log('='.repeat(80));
    console.log(`Arreglo ordenado: [${this.arreglo.join(', ')}]\n`);

    this.pasos.forEach((paso) => {
      console.log(`\n--- Iteración ${paso.iteracion} ---`);
      console.log(`${paso.descripcion}`);
      console.log(`Rango de búsqueda: izquierda=${paso.izquierda}, derecha=${paso.derecha}, medio=${paso.medio}`);
      
      // Visualización gráfica
      let visualizacion = '';
      for (let i = 0; i < this.arreglo.length; i++) {
        if (i === paso.medio) {
          visualizacion += `[${this.arreglo[i]}*] `;
        } else if (i >= paso.izquierda && i <= paso.derecha) {
          visualizacion += `[${this.arreglo[i]}] `;
        } else {
          visualizacion += ` ${this.arreglo[i]}  `;
        }
      }
      console.log(`Posiciones: ${visualizacion}`);
      console.log(`             ${'    '.repeat(paso.medio)}  ↑ (medio)`);
    });

    console.log('\n' + '-'.repeat(80));
    if (this.encontrado) {
      console.log(`✓ ¡ENCONTRADO! El número ${this.arreglo[this.indiceEncontrado]} está en la posición ${this.indiceEncontrado}`);
      console.log(`Total de iteraciones: ${this.pasos.length}`);
    } else {
      console.log(`✗ No encontrado en el arreglo`);
      console.log(`Total de iteraciones: ${this.pasos.length}`);
    }
    console.log('='.repeat(80));
  }

  obtenerEstadisticas() {
    return {
      arregloLongitud: this.arreglo.length,
      iteracionesRealizadas: this.pasos.length,
      encontrado: this.encontrado,
      indice: this.indiceEncontrado,
      complejidadTeórica: Math.ceil(Math.log2(this.arreglo.length))
    };
  }
}

// Función para ejecutar demostraciones
async function ejecutarDemostraciones() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║    ALGORITMO DE BÚSQUEDA BINARIA CON VISUALIZACIÓN            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Demo 1: Búsqueda exitosa
  console.log('📌 DEMOSTRACIÓN 1: Búsqueda exitosa');
  const arreglo1 = [3, 7, 12, 18, 25, 31, 44, 56, 67, 89, 95];
  const busqueda1 = new BusquedaBinaria(arreglo1);
  busqueda1.buscar(44);
  busqueda1.visualizar();
  
  const stats1 = busqueda1.obtenerEstadisticas();
  console.log('\n📊 Estadísticas:');
  console.log(`   • Longitud del arreglo: ${stats1.arregloLongitud}`);
  console.log(`   • Iteraciones realizadas: ${stats1.iteracionesRealizadas}`);
  console.log(`   • Complejidad teórica O(log n): máximo ${stats1.complejidadTeórica} iteraciones`);
  console.log(`   • Elemento encontrado: ${stats1.encontrado ? 'Sí' : 'No'} (índice: ${stats1.indice})\n`);

  // Demo 2: Búsqueda fallida
  console.log('\n📌 DEMOSTRACIÓN