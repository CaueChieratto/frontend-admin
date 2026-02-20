export class CodigoExistenteError extends Error {
  public readonly codigo: string;

  constructor(codigo: string) {
    super("CODIGO_JA_EXISTENTE");
    this.name = "CodigoExistenteError";
    this.codigo = codigo;
  }
}
