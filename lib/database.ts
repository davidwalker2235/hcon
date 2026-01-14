import { mockCompetitors, Competitor } from './mockData';

/**
 * Configuración del tipo de base de datos a usar
 * Cambiar a 'real' cuando se implemente la conexión real
 */
const DB_MODE: 'mock' | 'real' = 'mock';

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
 * Implementación para base de datos real
 * TODO: Implementar cuando se decida qué base de datos usar
 * Ejemplos:
 * - PostgreSQL: usar pg o postgres.js
 * - MongoDB: usar mongodb o mongoose
 * - MySQL: usar mysql2
 * - Supabase: usar @supabase/supabase-js
 * - Firebase: usar firebase-admin
 */
class RealDatabaseAdapter implements DatabaseAdapter {
  async getCompetitors(): Promise<Competitor[]> {
    // TODO: Implementar conexión real a la base de datos
    // Ejemplo para PostgreSQL:
    // const client = new Client({ connectionString: process.env.DATABASE_URL });
    // await client.connect();
    // const result = await client.query('SELECT * FROM competitors');
    // return result.rows;
    
    throw new Error('Base de datos real no implementada aún');
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
