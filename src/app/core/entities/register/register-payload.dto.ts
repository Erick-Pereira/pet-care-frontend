// DTO para o payload de registro de pet e tutor

export interface RegisterPayloadDTO {
  name: string;
  specieId: number | string;
  breedId: number | string;
  gender: string | number;
  approximateBirthDate: string;
  color: string;
  acquisition?: string;
  isCastrated: boolean;
  isChipped: boolean;
  chipNumber?: string;
  owner: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    cpf: string;
    address: {
      street: string;
      complement?: string;
      number: string;
      zipCode: string;
      neighborhood: {
        name: string;
        city: {
          name: string;
          state: {
            abbreviation: string;
          };
        };
      };
    };
  };
}
