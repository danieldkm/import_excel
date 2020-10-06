export interface IField {
  width: number;
  [key: string]: any;
}
export default class TransformRelScheduler {
  execute(property: string, type: string) {
    const field: IField = {
      width: 0,
    };
    const nameLabel = type === 'excel' ? 'header' : 'label';
    const nameValue = type === 'excel' ? 'key' : 'value';
    if (type === 'excel') {
      field.width = 30;
    }

    field[nameLabel] = property;
    field[nameValue] = property;

    // switch (property) {
    //   case 'locator':
    //     field[nameLabel] = 'Código Localizador';
    //     field[nameValue] = property;
    //     break;
    //   case 'username':
    //     field[nameLabel] = 'RA do aluno';
    //     field[nameValue] = property;
    //     break;
    //   case 'active':
    //     field[nameLabel] = 'Ativo';
    //     field[nameValue] = property;
    //     break;
    //   case 'initialHour':
    //     field[nameLabel] = 'Hora início da prova';
    //     field[nameValue] = property;
    //     break;
    //   case 'endHour':
    //     field[nameLabel] = 'Hora fim da prova';
    //     field[nameValue] = property;
    //     break;
    //   case 'dateExam':
    //     field[nameLabel] = 'Data da prova';
    //     field[nameValue] = property;
    //     break;
    //   case 'unityId':
    //     field[nameLabel] = 'ID da unidade';
    //     field[nameValue] = property;
    //     break;
    //   case 'unityName':
    //     field[nameLabel] = 'Nome da Unidade';
    //     field[nameValue] = property;
    //     break;
    //   case 'dateRequested':
    //     field[nameLabel] = 'Data da solicitação';
    //     field[nameValue] = property;
    //     break;
    //   case 'roomName':
    //     field[nameLabel] = 'Nome da sala';
    //     field[nameValue] = property;
    //     break;
    //   case 'roomLocation':
    //     field[nameLabel] = 'Localidade';
    //     field[nameValue] = property;
    //     break;
    //   default:
    //     field[nameLabel] = property;
    //     field[nameValue] = property;
    //     break;
    // }
    return field;
  }
}
