// eslint-disable-next-line import/extensions
import conn from './conn.js';

/**
 * Obtiene todos los posts de la tabla GuatemalaDepot.
 * @returns {Promise<Array>} Array de posts.
 */
export async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM GuatemalaDepot');
  return rows;
}

/**
 * Crea un nuevo post en la tabla GuatemalaDepot.
 * @param {Object} postData Datos del post a crear.
 * @returns {Promise<Object>} Resultado de la operación.
 */
export async function createPost(postData) {
  const {
    Pearson,
    Fewdescription,
    History,
    Crucialevents,
    Curiosities,
    AlternativeText,
    AlternativeDescription,
    Textreferences,
    images,
  } = postData;

  const [result] = await conn.query(
    'INSERT INTO GuatemalaDepot (Pearson, Few_Description, History, Crucial_Events, Curiosities, AlternativeText, AlternativeDescription, Text_References, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      Pearson,
      Fewdescription,
      History,
      Crucialevents,
      Curiosities,
      AlternativeText,
      AlternativeDescription,
      Textreferences,
      images,
    ],
  );

  return result;
}

/**
 * Obtiene un post específico de la tabla GuatemalaDepot por su ID.
 * @param {number} postId ID del post a buscar.
 * @returns {Promise<Object>} Post encontrado.
 */
export async function getOnePost(postId) {
  const postIdnumb = Number(postId);
  const [result] = await conn.query('SELECT * FROM GuatemalaDepot WHERE id = ?', [postIdnumb]);
  return result;
}

/**
 * Edita un post específico en la tabla GuatemalaDepot.
 * @param {number} postId ID del post a editar.
 * @param {string} columna Nombre de la columna a actualizar.
 * @param {any} valor Valor nuevo para la columna.
 * @returns {Promise<Object>} Resultado de la operación.
 */
export async function editOnePost(postId, columna, valor) {
  const postIdnumb = Number(postId);
  const sql = `UPDATE GuatemalaDepot SET ${columna} = ? WHERE id = ?`;
  const [result] = await conn.query(sql, [valor, postIdnumb]);
  return result;
}

/**
 * Elimina un post específico de la tabla GuatemalaDepot.
 * @param {number} postId ID del post a eliminar.
 * @returns {Promise<Object>} Resultado de la operación.
 */
export async function deletePost(postId) {
  const postIdnumb = Number(postId);
  const [result] = await conn.query('DELETE FROM GuatemalaDepot WHERE id = ?', [postIdnumb]);
  return result;
}
