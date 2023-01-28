export class UsuarioResponseDTO {
    constructor(
        public usuarioId?: number,
        public usuarioNomeCompleto?: string,
        public usuarioPassword?: string,
        public usuarioUserName?: string,
    ){}   
}
