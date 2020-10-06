import { getRepository, Repository, Raw, getManager } from 'typeorm';

import IHitsRepository from '@modules/hits/repositories/IHitsRepository';
import IFindAllByCPFDTO from '@modules/hits/dtos/IFindAllByCPFDTO';

import Log from '../entities/Log';

class HitsRepository implements IHitsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async findAllByCPFAndPeriod({ cpf, period }: IFindAllByCPFDTO) {
    const entityManager = getManager();
    const connection = entityManager.connection;
    const queryRunner = entityManager.queryRunner;
    // console.log('connection', connection);
    // console.log('queryRunner', queryRunner);
    const rawData = await entityManager.query(
      "select distinct aluno.cpf CPF, aluno.id RA_ALUNO, aluno.nome  NOME_ALUNO, to_char(log.data , 'dd/MM/rrrr HH24:mi:ss') DATA_ACESSO from aluno join matricula on matricula.aluno_id = aluno.id join oferta on oferta.id = matricula.oferta_id join projeto on projeto.id = oferta.projeto_id join usuario on usuario.pessoa_id = aluno.pessoa_id join log on log.usuario_id = usuario.id where aluno.cpf = :cpf and projeto.ano||LPAD(projeto.semestre,2, 0) = :period order by to_char(log.data , 'dd/MM/rrrr HH24:mi:ss')",
      [cpf, period],
    );
    // console.log('rawData', rawData);
    return rawData;
  }
}

export default HitsRepository;
