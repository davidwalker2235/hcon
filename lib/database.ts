import { mockCompetitors, Competitor } from './mockData';
import { database as firebaseDatabase } from './firebase';
import { ref, get } from 'firebase/database';

/**
 * Configuración del tipo de base de datos a usar
 * Cambiar a 'mock' para usar datos de prueba o 'real' para Firebase
 */
const DB_MODE: 'mock' | 'real' = 'real';

/**
 * Interfaz para el módulo de base de datos
 * Esta interfaz permite cambiar fácilmente entre diferentes tipos de BD
 */
export interface DatabaseAdapter {
  getCompetitors(): Promise<Competitor[]>;
}

/**
 * Implementación con datos mock
 * Usado mientras se decide qué base de datos usar
 */
class MockDatabaseAdapter implements DatabaseAdapter {
  async getCompetitors(): Promise<Competitor[]> {
    // Simular un pequeño delay como si fuera una petición real
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockCompetitors];
  }
}

/**
 * Implementación para Firebase Realtime Database
 */
class RealDatabaseAdapter implements DatabaseAdapter {
  async getCompetitors(): Promise<Competitor[]> {
    try {
      // Referencia a la colección de competidores en Firebase
      // Ajusta la ruta según la estructura de tu base de datos
      const competitorsRef = ref(firebaseDatabase, 'competitors');
      const snapshot = await get(competitorsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convertir el objeto de Firebase a un array
        if (Array.isArray(data)) {
          return data.filter((item: any) => item !== null);
        } else if (typeof data === 'object') {
          // Si Firebase devuelve un objeto con keys, convertirlo a array
          return Object.values(data).filter((item: any) => item !== null) as Competitor[];
        }
        return [];
      } else {
        // Si no hay datos en Firebase, devolver array vacío
        return [];
      }
    } catch (error) {
      console.error('Error fetching competitors from Firebase:', error);
      throw new Error('Error al obtener los competidores de Firebase');
    }
  }
}

/**
 * Factory para obtener el adaptador de base de datos correcto
 */
function getDatabaseAdapter(): DatabaseAdapter {
  switch (DB_MODE) {
    case 'mock':
      return new MockDatabaseAdapter();
    case 'real':
      return new RealDatabaseAdapter();
    default:
      return new MockDatabaseAdapter();
  }
}

/**
 * Módulo de base de datos
 * Proporciona una interfaz unificada para acceder a los datos
 * Fácil de cambiar entre mock y base de datos real
 */
export const database = {
  /**
   * Obtiene todos los competidores
   * @returns Promise con el array de competidores
   */
  async getCompetitors(): Promise<Competitor[]> {
    const adapter = getDatabaseAdapter();
    return adapter.getCompetitors();
  }
};

// Exportar el tipo Competitor para uso en otros módulos
export type { Competitor };
