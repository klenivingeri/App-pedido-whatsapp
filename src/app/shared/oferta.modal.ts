class Oferta{
    constructor(
        public key: string,
        public url_imagem:  object,
        public titulo: string,
        public descricao: string,
        public valor: number,
        public quantidade: number,
        public modelo: string


    ){}
}

export { Oferta }