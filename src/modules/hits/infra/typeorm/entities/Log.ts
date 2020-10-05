import { Entity, Column, PrimaryColumn } from 'typeorm';

// Nome       Nulo?    Tipo
// ---------- -------- --------------
// ID         NOT NULL VARCHAR2(100)
// USUARIO_ID          NUMBER(10)
// DATA                DATE
// BROWSER             VARCHAR2(4000)
// IP                  VARCHAR2(50)

/**
 * eager: sempre irá trazer o usuário
 * lazy: carrega o usuario quando utiliza por exemplo "const user = await appointment.user"
 * eager loading: 10 (user_id, user_id) mantem uma query para trazer os usuarios
 */
@Entity('LOG')
class Log {
  @PrimaryColumn()
  ID: string;

  @Column()
  USUARIO_ID: string;

  @Column()
  DATA: Date;

  @Column()
  BROWSER: string;

  @Column()
  IP: string;
}

export default Log;
