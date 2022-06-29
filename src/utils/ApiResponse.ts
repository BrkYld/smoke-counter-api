
class ApiResponse{
    error: boolean;
    data: unknown;
    message:string;

    constructor(data :unknown, message = 'success', error = false ) {
      this.error = error
      this.message = message;
      this.data = data;
    }
  }
  
export default ApiResponse;
  