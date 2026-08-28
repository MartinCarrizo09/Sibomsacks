/**
 * Migración — apellido, correo e id_provincia pasan a ser opcionales.
 *
 * El formulario de la web pide sólo lo mínimo para poder responder: nombre,
 * una vía de contacto (correo O teléfono), sector y mensaje. La tabla, en
 * cambio, se creó con NOT NULL en apellido, correo e id_provincia, así que
 * rechazaba esos envíos.
 *
 * SQLite no permite quitar un NOT NULL con ALTER TABLE: hay que recrear la
 * tabla y copiar las filas. Eso es lo que hace este script, dentro de una
 * transacción y dejando primero una copia del archivo.
 *
 * Uso:  node migraciones/2026-08-contacto-campos-opcionales.js
 * Es idempotente: si la tabla ya está migrada, no hace nada.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3pkg from "sqlite3";

const sqlite3 = sqlite3pkg.verbose();
const aquí = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(aquí, "..", "data", "contacto.sqlite");

const NUEVA_TABLA = `
CREATE TABLE contactos_nueva (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  empresa TEXT,
  nombre TEXT NOT NULL,
  apellido TEXT,
  correo TEXT,
  telefono TEXT,
  id_sector INTEGER NOT NULL,
  id_provincia INTEGER,
  mensaje TEXT NOT NULL,
  FOREIGN KEY (id_sector) REFERENCES sectores(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_provincia) REFERENCES provincias(id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

function correr(db, sql) {
  return new Promise((ok, mal) =>
    db.run(sql, (e) => (e ? mal(e) : ok()))
  );
}

function leer(db, sql) {
  return new Promise((ok, mal) =>
    db.all(sql, (e, filas) => (e ? mal(e) : ok(filas)))
  );
}

async function main() {
  if (!fs.existsSync(BASE)) {
    console.error("No se encontró la base:", BASE);
    process.exit(1);
  }

  const db = new sqlite3.Database(BASE);

  const [{ sql }] = await leer(
    db,
    "SELECT sql FROM sqlite_master WHERE name='contactos'"
  );

  /* Si correo ya es opcional, la migración corrió antes. */
  if (!/correo TEXT NOT NULL/.test(sql)) {
    console.log("La tabla ya estaba migrada. No se hizo nada.");
    db.close();
    return;
  }

  const [{ c: antes }] = await leer(db, "SELECT COUNT(*) c FROM contactos");

  /* Copia de seguridad antes de tocar nada. */
  const copia = BASE.replace(/\.sqlite$/, `.backup-${Date.now()}.sqlite`);
  fs.copyFileSync(BASE, copia);
  console.log(`Respaldo: ${path.basename(copia)}`);

  await correr(db, "PRAGMA foreign_keys=OFF");
  await correr(db, "BEGIN TRANSACTION");
  try {
    await correr(db, NUEVA_TABLA);
    await correr(
      db,
      `INSERT INTO contactos_nueva
         (id, empresa, nombre, apellido, correo, telefono, id_sector, id_provincia, mensaje)
       SELECT id, empresa, nombre, apellido, correo, telefono, id_sector, id_provincia, mensaje
       FROM contactos`
    );
    await correr(db, "DROP TABLE contactos");
    await correr(db, "ALTER TABLE contactos_nueva RENAME TO contactos");
    await correr(db, "COMMIT");
  } catch (e) {
    await correr(db, "ROLLBACK");
    console.error("Falló la migración, no se cambió nada:", e.message);
    db.close();
    process.exit(1);
  }
  await correr(db, "PRAGMA foreign_keys=ON");

  const [{ c: despues }] = await leer(db, "SELECT COUNT(*) c FROM contactos");
  console.log(`Contactos: ${antes} antes / ${despues} después`);
  if (antes !== despues) {
    console.error("¡Se perdieron filas! Restaurá desde el respaldo.");
    process.exit(1);
  }
  console.log("Migración lista: apellido, correo e id_provincia son opcionales.");
  db.close();
}

main();
