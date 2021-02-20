class ItemCarrinho{
    constructor(
        public key: string,
        public url_imagem:  object,
        public titulo: string,
        public descricao_item: string,
        public valor: number,
        public quantidade: number,
        public modelo: string,
        public ofert: number

    ){}
}

export { ItemCarrinho }