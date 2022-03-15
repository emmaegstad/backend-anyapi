const pool = require('../utils/pool');

module.exports = class Neopet {
  id;
  name;
  type;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.age = row.age;
    this.color = row.color;
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        neopets
        `
    );

    return rows.map((row) => new Neopet(row));
  }

  static async insert({ name, type, age, color }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            neopets (name, type, age, color)
        VALUES
            ($1, $2, $3, $4)
        RETURNING
            *
        `,
      [name, type, age, color]
    );

    return new Neopet(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            neopets
          WHERE
            id=$1
          `,
      [id]
    );
    return new Neopet(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingNeopet = await Neopet.findById(id);
    const updatedAttributes = { ...existingNeopet, ...attributes };
    const { name, type, age, color } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            neopets
        SET
            name=$1,
            type=$2,
            age=$3,
            color=$4
        WHERE
            id=$5
        RETURNING
            *
        `,
      [name, type, age, color, id]
    );
    return new Neopet(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            neopets
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    );

    return new Neopet(rows[0]);
  }
};
