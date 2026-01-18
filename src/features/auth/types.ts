export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignUpDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  user: {
    id: string;
    email: string;
  };
}
