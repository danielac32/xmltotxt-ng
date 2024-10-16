
export  interface File {
	id?:number;
    name?: string;
    size?: number;
}
 
// Interfaz que representa la respuesta completa con la lista de archivos
export interface ListResponse {
    list: File[];  // Un array de archivos
}

export interface ResponseData {
  error: boolean;          // Indica si hubo un error (True/False)
  msg: string;             // Mensaje de error o información
  count: number;           // Contador de archivos procesados
  counterfailxml: number;  // Contador de archivos XML fallidos
  total: number;           // Total de archivos encontrados
  minutes: number;         // Minutos de procesamiento
  seconds: number;         // Segundos de procesamiento
  FileSizeTotal?:number;
}
